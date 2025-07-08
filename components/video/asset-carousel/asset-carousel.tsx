import { useState } from "react";
import { Dimensions, View } from "react-native";
import SideSwipe from "react-native-sideswipe";

import { Media } from "@/classes/media.class";
import VideoView from "../video-view";
import CarouselIndicator from "./carousel-indicator";
import AppText from "@/components/core/app-text";
import { ClassValue } from "clsx";
import { ClassValues, cn } from "@/utils/cn.util";

type Props = {
	assetIds: string[];
	defaultIndex?: number;
	/**Width of a carousel item */
	itemWidth?: number;
	className?: ClassValue;
	classNames?: ClassValues<"indicator">;
};

const AssetCarousel = ({
	assetIds,
	defaultIndex = 0,
	itemWidth = Dimensions.get("screen").width,
	className,
	classNames,
}: Props) => {
	const [index, setIndex] = useState<number>(defaultIndex);
	const { height } = Media.getDimensions({
		aspectRatio: 9 / 16,
		width: itemWidth,
	});

	return (
		<View className={cn("relative", className)}>
			{assetIds.length === 0 ? (
				<AppText twClassName="text-core-amethyst-smoke-400 z-50 pt-safe-offset-10 text-center">
					{"No media to display :("}
				</AppText>
			) : (
				<>
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
						className={cn(
							"absolute top-safe-offset-5 left-[50%] -translate-x-[50%]",
							classNames?.indicator
						)}
						totalItems={assetIds.length}
						currentIndex={index}
					/>
				</>
			)}
		</View>
	);
};

export default AssetCarousel;
