import { ReactNode, useEffect, useState } from "react";
import * as VideoThumbnails from "expo-video-thumbnails";
import React from "react";
import { Image } from "expo-image";
import { View } from "react-native";
import {} from "@expo/vector-icons";

type Props = {
    videoSource: string;
    //new width that will respect the aspectRatio of the original height.
    height?: number;
    children?: ReactNode;
};

const VideoThumbnailView = ({
    videoSource,
    children,
    height: heightProp,
}: // width: widthProp,
Props) => {
    const [thumbnail, setThumbnail] =
        useState<VideoThumbnails.VideoThumbnailsResult>();

    useEffect(() => {
        const generate = async (videoSource: string) => {
            try {
                const result = await VideoThumbnails.getThumbnailAsync(
                    videoSource
                );

                setThumbnail(result);
            } catch (e) {
                console.error(e);
            }
        };

        videoSource && generate(videoSource);
    }, [videoSource]);

    const renderThumbnail = (
        thumbnail: VideoThumbnails.VideoThumbnailsResult
    ) => {
        const { height: originalHeight, uri, width: originalWidth } = thumbnail;
        const aspectRatio = originalWidth / originalHeight;

        // const width = widthProp ?? 200;
        const height = heightProp ?? 300;
        const width = height * aspectRatio;

        return (
            <View
                className="relative"
                style={{ width, height, aspectRatio, borderRadius: 12 }}
            >
                <Image
                    source={uri}
                    style={{ width, height, aspectRatio, borderRadius: 12 }}
                />
                {children}
            </View>
        );
    };

    return <>{thumbnail && renderThumbnail(thumbnail)}</>;
};

export default VideoThumbnailView;
