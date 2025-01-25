import { useEffect, useState } from "react";
import * as VideoThumbnails from "expo-video-thumbnails";
import React from "react";
import { Image } from "expo-image";

type Props = {
    videoSource: string;
};

const VideoThumbnailView = ({ videoSource }: Props) => {
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

        const width = 200;
        const height = width / aspectRatio;

        return (
            <Image
                source={uri}
                style={{ width, height, aspectRatio, borderRadius: 12 }}
            />
        );
    };

    return <>{thumbnail && renderThumbnail(thumbnail)}</>;
};

export default VideoThumbnailView;
