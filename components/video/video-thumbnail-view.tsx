import { ReactNode, useEffect, useState } from "react";
import * as VideoThumbnails from "expo-video-thumbnails";
import React from "react";
import { Image } from "expo-image";
import { View } from "react-native";
import {} from "@expo/vector-icons";
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
	const [thumbnail, setThumbnail] = useState<
		VideoThumbnails.NativeVideoThumbnail | false
	>();

	useEffect(() => {
		const generate = async (videoAssetId: string) => {
			const media = await new Media(videoAssetId).getThumbnailRef();
			const { thumbnailRef } = media;
			if (!thumbnailRef) {
				setThumbnail(false);
				return;
			}
			setThumbnail(thumbnailRef);
		};

		videoAssetId && generate(videoAssetId);
	}, [videoAssetId]);

	const renderThumbnail = (
		thumbnail: VideoThumbnails.NativeVideoThumbnail
	) => {
		const { height: originalHeight, width: originalWidth } = thumbnail;
		const aspectRatio = originalWidth / originalHeight;

		// const width = widthProp ?? 200;
		const height = heightProp ?? 300;
		const width = height * aspectRatio;

		return (
			<View
				className="relative"
				style={{ width, height, aspectRatio, borderRadius: 12 }}
			>
				<Image
					source={thumbnail}
					style={{ width, height, aspectRatio, borderRadius: 12 }}
				/>

				{children}
			</View>
		);
	};

	return <>{thumbnail && renderThumbnail(thumbnail)}</>;
};

export default VideoThumbnailView;
