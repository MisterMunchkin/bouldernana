import { useState } from "react";
import { Dimensions, View } from "react-native";
import SideSwipe from "react-native-sideswipe";

import { Media } from "@/classes/media.class";
import VideoView from "../video-view";
import CarouselIndicator from "./carousel-indicator";

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
		<View className="relative">
			<SideSwipe
				index={index}
				itemWidth={itemWidth}
				style={{ width: "100%" }}
				data={assetIds}
				onIndexChange={(index: number) => setIndex(index)}
				renderItem={({
					itemIndex,
					currentIndex,
					item,
					animatedValue,
				}) => {
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
			<CarouselIndicator
				className="absolute bottom-5 left-[50%] -translate-x-[50%]"
				totalItems={assetIds.length}
				currentIndex={index}
			/>
		</View>
	);
};

export default AssetCarousel;
