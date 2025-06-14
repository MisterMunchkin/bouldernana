import PressableOpacity from "../core/pressable-opacity";
import { ComponentProps, ReactNode, useEffect, useRef } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { Media } from "@/classes/media.class";
import VideoThumbnailView from "./video-thumbnail-view";
import { LegendList, LegendListRenderItemProps } from "@legendapp/list";

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
	ComponentProps<typeof LegendList>,
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

	useEffect(() => {
		return () => {
			player.release();
		};
	}, []);

	const loadVideo = async (videoAssetId: string) => {
		const media = await new Media(videoAssetId).getAsset();
		const { useableUri } = media.assetInfo ?? {};
		if (!useableUri) {
			return;
		}

		await videoRef.current?.enterFullscreen();
		player.replace(useableUri); //TODO: Should ensure that player is released and unmounted
	};

	const renderItem = ({ item }: LegendListRenderItemProps<string>) => {
		return (
			<PressableOpacity twClassName="p-0" onPress={() => loadVideo(item)}>
				<VideoThumbnailView
					height={thumbnailHeight ?? DEFAULT_THUMBNAIL_HEIGHT}
					videoAssetId={item}
				>
					{thumbnailChildrenRender && thumbnailChildrenRender(item)}
				</VideoThumbnailView>
			</PressableOpacity>
		);
	};

	return (
		<>
			<LegendList
				data={videoAssetIds}
				renderItem={renderItem}
				keyExtractor={(item, index) => `${item}-${index}`}
				contentContainerStyle={{ paddingHorizontal: 16 }}
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
