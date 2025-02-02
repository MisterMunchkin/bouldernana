import { useEffect, useState } from "react";
import * as VideoThumbnails from "expo-video-thumbnails";

type Args = {
    videoSource: string;
    timeMs?: number;
};

export const useCreateThumbnail = ({ videoSource, timeMs }: Args) => {
    const [thumbnail, setThumbnail] =
        useState<VideoThumbnails.VideoThumbnailsResult>();

    useEffect(() => {
        const generate = async (videoSource: string) => {
            try {
                const result = await VideoThumbnails.getThumbnailAsync(
                    videoSource,
                    { time: timeMs ?? 0 }
                );

                setThumbnail(result);
            } catch (e) {
                console.error(e);
            }
        };

        videoSource && generate(videoSource);
    }, [videoSource]);

    if (!videoSource) return { thumbnail: undefined };
    return { thumbnail };
};
