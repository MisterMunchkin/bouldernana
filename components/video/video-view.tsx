import { Media } from "@/classes/media.class";
import { useVideoPlayer, VideoView as ExpoVideoView } from "expo-video";
import { useEffect, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

type BaseProps = {
	height: number;
	width: number;
	style?: StyleProp<ViewStyle>;
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

	console.log(
		"video view data",
		JSON.stringify({ source, height, width, style })
	);
	const player = useVideoPlayer(source ?? "");

	return <ExpoVideoView player={player} style={[{ height, width }, style]} />;
};

export default VideoView;
