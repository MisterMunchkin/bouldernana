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
import { MediaLibraryUtil } from "@/utils/media-library.util";

type Props = {
    /**
     * Asset Ids coming from the ImagePickerAsset to be displayed
     */
    videoAssetIds: string[];
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
    videoAssetIds,
    thumbnailChildrenRender,
    thumbnailHeight,
    ...flashListProps
}: Props) => {
    const videoRef = useRef<VideoView>(null);
    const player = useVideoPlayer("");

    const loadVideo = async (videoAssetId: string) => {
        const uri = await MediaLibraryUtil.getPlayableVideoUri(videoAssetId);
        if (!uri) {
            return;
        }

        await videoRef.current?.enterFullscreen();
        player.replace(uri);
    };

    return (
        <>
            <FlashList
                data={videoAssetIds}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                    <PressableOpacity
                        twClassName="p-0"
                        onPress={() => loadVideo(item)}
                    >
                        <VideoThumbnailView
                            height={thumbnailHeight ?? DEFAULT_THUMBNAIL_HEIGHT}
                            videoAssetId={item}
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
