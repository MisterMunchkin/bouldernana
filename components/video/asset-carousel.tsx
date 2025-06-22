import { useState } from "react";
import { Dimensions } from "react-native";
import SideSwipe from "react-native-sideswipe";

import { Media } from "@/classes/media.class";
import VideoView from "./video-view";

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
	const { height } = Media.getDimensions({
		aspectRatio: 9 / 16,
		width: itemWidth,
	});

	return (
		<SideSwipe
			index={index}
			itemWidth={itemWidth}
			style={{ width: "100%" }}
			data={assetIds}
			onIndexChange={(index: number) => setIndex(index)}
			renderItem={({ itemIndex, currentIndex, item, animatedValue }) => {
				return (
					<VideoView
						assetId={item}
						width={itemWidth}
						height={height}
					/>
				);
			}}
			extractKey={(item, index) => `${item}_${index}`}
		/>
	);
};

export default AssetCarousel;
