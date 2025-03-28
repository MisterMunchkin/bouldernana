import { ReactNode, useEffect, useState } from "react";
import * as VideoThumbnails from "expo-video-thumbnails";
import React from "react";
import { Image } from "expo-image";
import { View } from "react-native";
import { Media } from "@/classes/media.class";

type Props = {
	videoAssetId: string;
	//new width that will respect the aspectRatio of the original height.
	height?: number;
	children?: ReactNode;
};

const VideoThumbnailView = ({
	videoAssetId,
	children,
	height: heightProp,
}: // width: widthProp,
Props) => {
	const [thumbnail, setThumbnail] =
		useState<VideoThumbnails.NativeVideoThumbnail>();
	const [showDefault, setShowDefault] = useState<boolean>(false);

	useEffect(() => {
		const generate = async (videoAssetId: string) => {
			const media = await new Media(videoAssetId).getThumbnailRef();
			const { thumbnailRef } = media;

			if (!thumbnailRef) {
				setShowDefault(true);
				return;
			}
			setThumbnail(thumbnailRef);
		};

		videoAssetId && generate(videoAssetId);

		return () => {
			thumbnail?.release();
		};
	}, [videoAssetId]);

	return (
		<View className="relative" style={{ height: heightProp }}>
			{showDefault ? (
				<Image
					source={require("@/assets/images/default-thumbnail.jpg")}
					style={{
						height: heightProp,
						aspectRatio: 9 / 16,
						borderRadius: 12,
					}}
				/>
			) : (
				<Image
					source={thumbnail}
					style={{
						height: heightProp,
						aspectRatio: 9 / 16,
						borderRadius: 12,
					}}
				/>
			)}

			{children}
		</View>
	);
};

export default VideoThumbnailView;
