import { cn } from "@/utils/cn.util";
import { MediaLibraryUtil } from "@/utils/media-library.util";
import { useVideoPlayer, VideoThumbnail, VideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
    videoSource: string;
    style?: StyleProp<ViewStyle>;
};

const VideoPreview = ({ videoSource, style }: Props) => {
    const [thumbnail, setThumbnail] = useState<VideoThumbnail | null>(null);
    const player = useVideoPlayer(videoSource);

    useEffect(() => {
        if (!videoSource || !player) return;
        const generateThumbnail = async () => {
            try {
                const thumbnails = await player.generateThumbnailsAsync(0);
                setThumbnail(thumbnails[0]);
            } catch (error) {
                console.error("Failed to generate video thumbnail:", error);
            }
        };

        generateThumbnail();
    }, [videoSource, player]);

    if (!thumbnail) return null;

    const resizedStyle = MediaLibraryUtil.resize({
        original: {
            width: thumbnail.width,
            height: thumbnail.height,
        },
        width: 200,
    });

    return (
        <VideoView
            className={cn("border-lg")}
            style={[resizedStyle, style]}
            player={player}
        />
    );
};

export default VideoPreview;
