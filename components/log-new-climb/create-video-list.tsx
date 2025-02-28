import { FieldPath, FieldValues, PathValue } from "react-hook-form";
import { useImagePicker } from "@/hooks/image-picker.hook";
import { View } from "react-native";
import { Field, FieldProps } from "../core/field";
import { ImagePickerAsset } from "expo-image-picker";
import VideoList from "../video/video-list";
import PressableIcon from "@/components/ui/pressable-icon";
import PressableOpacity from "@/components/core/pressable-opacity";
import AppText from "@/components/core/app-text";
import { cn } from "@/utils/cn.util";

export type VideoFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<FieldProps<TFieldValues, TName>, "render">;

const CreateVideoList = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    className,
    ...fieldProps
}: VideoFieldProps<TFieldValues, TName>) => {
    const { pickVideo } = useImagePicker();

    return (
        <View className="w-full gap-2">
            <Field
                {...fieldProps}
                render={({ field: { onChange, value } }) => {
                    const videos = value as ImagePickerAsset[];

                    const removeVideo = (videoUri: string) =>
                        onChange(
                            videos.filter((video) => video.uri !== videoUri)
                        );
                    const addVideo = async () => {
                        const video = await pickVideo();
                        if (!video) return;

                        onChange([...videos, video]);
                    };

                    return (
                        <VideoList
                            videoUris={videos.map((video) => video.uri)}
                            thumbnailChildrenRender={(uri) => (
                                <PressableIcon
                                    name="remove"
                                    size={18}
                                    color={"white"}
                                    className="absolute top-1 right-1 px-2.5 py-2"
                                    onPress={() => removeVideo(uri)}
                                />
                            )}
                            thumbnailHeight={300}
                            ListHeaderComponent={() => (
                                <PressableOpacity
                                    onPress={addVideo}
                                    twClassName={cn(
                                        "border-[1px] border-dashed px-8 rounded-lg justify-center h-[300px] mr-4"
                                    )}
                                >
                                    <AppText size={"xs"}>
                                        {"Add a video"}
                                    </AppText>
                                </PressableOpacity>
                            )}
                        />
                    );
                }}
            />
        </View>
    );
};

export default CreateVideoList;
