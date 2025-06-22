import { useState } from "react";
import { Dimensions } from "react-native";
import SideSwipe from "react-native-sideswipe";
import VideoThumbnailView from "./video-thumbnail-view";

type Props = {
	assetIds: string[];
	defaultIndex?: number;
	/**Width of a carousel item */
	itemWidth?: number;
};

const AssetCarousel = ({
	assetIds,
	defaultIndex = 0,
	itemWidth = Dimensions.get("screen").width,
}: Props) => {
	const [index, setIndex] = useState<number>(defaultIndex);

	return (
		<SideSwipe
			index={index}
			itemWidth={itemWidth}
			style={{ width: "100%" }}
			data={assetIds}
			onIndexChange={(index: number) => setIndex(index)}
			renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
				<VideoThumbnailView
					videoAssetId={item}
					height={itemWidth / (9 / 16)}
				/>
			)}
			extractKey={(item, index) => `${item}_${index}`}
		/>
	);
};

export default AssetCarousel;
