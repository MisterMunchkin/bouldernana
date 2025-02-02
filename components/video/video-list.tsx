import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import PressableOpacity from "../core/pressable-opacity";
import VideoThumbnailView from "./video-thumbnail-view";
import {
    ComponentProps,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import React from "react";
import { createVideoPlayer, useVideoPlayer, VideoView } from "expo-video";

type Props = {
    videoUris: string[];
    /**Render within the thumbnail view. ideally absolute renders */
    thumbnailChildrenRender?: (uri: string) => ReactNode;
    /**set a height for each thumbnail in the list */
    thumbnailHeight?: number;
} & Pick<
    ComponentProps<typeof FlashList>,
    | "ListFooterComponent"
    | "ListFooterComponentStyle"
    | "ListHeaderComponent"
    | "ListHeaderComponentStyle"
>;

const DEFAULT_THUMBNAIL_HEIGHT = 300;

const VideoList = ({
    videoUris,
    thumbnailChildrenRender,
    thumbnailHeight,
    ...flashListProps
}: Props) => {
    const videoRef = useRef<VideoView>(null);
    const player = useVideoPlayer("");

    const loadVideo = async (videoUri: string) => {
        await videoRef.current?.enterFullscreen();
        player.replace(videoUri);
    };

    return (
        <>
            <FlashList
                data={videoUris}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                    <PressableOpacity
                        twClassName="p-0"
                        onPress={() => loadVideo(item)}
                    >
                        <VideoThumbnailView
                            height={thumbnailHeight ?? DEFAULT_THUMBNAIL_HEIGHT}
                            videoSource={item}
                        >
                            {thumbnailChildrenRender &&
                                thumbnailChildrenRender(item)}
                        </VideoThumbnailView>
                    </PressableOpacity>
                )}
                ItemSeparatorComponent={() => <View className="w-4" />}
                horizontal
                showsHorizontalScrollIndicator={false}
                estimatedItemSize={thumbnailHeight ?? DEFAULT_THUMBNAIL_HEIGHT}
                {...flashListProps}
            />
            <VideoView
                className="absolute"
                player={player}
                ref={videoRef}
                onFullscreenExit={() => player.pause()}
                onFullscreenEnter={() => player.play()}
            />
        </>
    );
};

export default VideoList;
