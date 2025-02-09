import { FieldValues, FieldPath, PathValue } from "react-hook-form";
import { View } from "react-native";
import { cn } from "@/utils/cn.util";
import PressableOpacity from "../core/pressable-opacity";
import VideoThumbnailView from "./video-thumbnail-view";
import { Field, FieldProps } from "../core/field";
import { useImagePicker } from "@/hooks/image-picker.hook";
import AppText from "../core/app-text";
import React, { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import PressableIcon from "../ui/pressable-icon";
import { useVideoPlayer, VideoView } from "expo-video";
import VideoList from "./video-list";

type VideoFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = PathValue<TFieldValues, TName> extends string[]
    ? Omit<FieldProps<TFieldValues, TName>, "render">
    : never;

const VideoField = <
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
                    //TODO: VideoFieldProps already restricts parent
                    // to only pass pathname if type is of string[].
                    // this is just a workaround but try to get the value
                    //to be inferred.
                    const videoUris = value as string[];

                    const removeVideo = (videoUri: string) =>
                        onChange(videoUris.filter((uri) => uri !== videoUri));

                    const addVideo = async () => {
                        const video = await pickVideo();
                        if (!video) return;
                        onChange([...value, video]);
                    };

                    return (
                        <VideoList
                            videoUris={videoUris}
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

export default VideoField;
