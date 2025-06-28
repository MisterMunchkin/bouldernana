import { ComponentProps, useState } from "react";
import { View, Text } from "react-native";
import AppText from "../core/app-text";

type Props = {
	haptics?: boolean;
} & ComponentProps<typeof AppText>;

const PressableText = (props: Props) => {
	const [isPressedIn, setIsPressedIn] = useState<boolean>(false);
	return (
		<View>
			<Text>PressableText</Text>
		</View>
	);
};

export default PressableText;
