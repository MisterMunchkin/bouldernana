import { Media } from "@/classes/media.class";
import { useVideoPlayer, VideoView as ExpoVideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import AppText from "../core/app-text";

type BaseProps = {
	height: number;
	width: number;
	style?: StyleProp<ViewStyle>;
	noVideoSourceRender?: React.ReactNode;
};

type SourceProps = BaseProps & {
	source: string;
	assetId?: never;
};

type AssetIdProps = BaseProps & {
	assetId: string;
	source?: never;
};

type Props = SourceProps | AssetIdProps;

/**Exists because ExpoVideoView requires a player instance */
const VideoView = ({
	height,
	source: sourceProp,
	assetId,
	width,
	style,
	noVideoSourceRender,
}: Props) => {
	const [source, setSource] = useState<string | undefined>(sourceProp);

	useEffect(() => {
		if (!assetId) return;

		const getSource = async () => {
			const media = await new Media(assetId).getAsset();

			const { useableUri } = media.assetInfo ?? {};
			if (!useableUri) return;

			setSource(useableUri);
		};

		getSource();
	}, [assetId]);

	const player = useVideoPlayer(source ?? "");

	if (!source) {
		return (
			<View style={[{ height, width }, style]}>
				{noVideoSourceRender ?? (
					<AppText
						twClassName="mx-auto pt-safe-offset-24"
						color={"white"}
					>
						{`No video source :(`}
					</AppText>
				)}
			</View>
		);
	}

	return <ExpoVideoView player={player} style={[{ height, width }, style]} />;
};

export default VideoView;
