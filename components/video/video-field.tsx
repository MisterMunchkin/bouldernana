import { FieldValues, FieldPath } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import { cn } from "@/utils/cn.util";
import PressableOpacity from "../core/pressable-opacity";
import { Field, FieldProps } from "../core/field";
import { useImagePicker } from "@/hooks/image-picker.hook";
import AppText from "../core/app-text";
import { useState } from "react";
import PressableIcon from "../ui/pressable-icon";
import VideoList from "./video-list";
import { AppError } from "@/utils/app-error.util";
import { Toast } from "@/classes/toast.class";

export type VideoFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<FieldProps<TFieldValues, TName>, "render">;

const VideoField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	className,
	...fieldProps
}: VideoFieldProps<TFieldValues, TName>) => {
	const { pickVideo } = useImagePicker();
	const [isLoading, setIsLoading] = useState(false);

	return (
		<View className="w-full gap-2">
			<Field
				{...fieldProps}
				render={({ field: { onChange, value } }) => {
					//TODO: VideoFieldProps already restricts parent
					// to only pass pathname if type is of string[].
					// this is just a workaround but try to get the value
					//to be inferred.
					const assetIds = value as string[];

					const removeVideo = (assetId: string) =>
						onChange(assetIds.filter((id) => id !== assetId));

					const addVideo = async () => {
						try {
							setIsLoading(true);
							const videoAssetId = await pickVideo();
							if (!videoAssetId) return;
							onChange([...videoAssetId, ...value]);
						} catch (err) {
							if (AppError.isAppError(err)) {
								console.warn(
									"Error while adding video: " +
										err.message +
										"\n" +
										JSON.stringify(err.cause)
								);
								Toast.error({
									description:
										"Retrieving video failed, please ensure that the video is not from a cloud storage and is playable on your phone.",
								});
							}
						} finally {
							setIsLoading(false);
						}
					};

					return (
						<VideoList
							videoAssetIds={assetIds}
							thumbnailChildrenRender={(uri) => (
								<PressableIcon
									name="remove"
									size={18}
									color={"white"}
									className="absolute top-1 right-1 px-2.5 py-2"
									onPress={() => removeVideo(uri)}
									disabled={isLoading}
								/>
							)}
							thumbnailHeight={300}
							ListHeaderComponent={() => (
								<PressableOpacity
									onPress={addVideo}
									twClassName={cn(
										"border-[1px] border-dashed aspect-portrait rounded-lg justify-center h-[300px] mr-4 relative"
									)}
									disabled={isLoading}
								>
									<AppText size={"xs"}>
										{"Add a video"}
									</AppText>
									<ActivityIndicator
										className="absolute left-[50%] top-[50%] -translate-x-[-50%] -translate-y-[-50%]"
										size={"large"}
										animating={isLoading}
									/>
								</PressableOpacity>
							)}
						/>
					);
				}}
			/>
		</View>
	);
};

export default VideoField;
