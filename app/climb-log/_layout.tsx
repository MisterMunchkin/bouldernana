import { cn } from "@/utils/cn.util";
import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

export const unstable_settings = {
	initialRouteName: "[id]/update-header",
};
const Layout = ({}: Props) => {
	const insets = useSafeAreaInsets();

	return (
		<Stack
			screenOptions={{
				header: () => (
					<>
						{Platform.OS === "ios" && (
							<BlurView
								tint="systemThinMaterialDark"
								className={cn("absolute w-full z-50")}
								style={{ height: insets.top }}
							/>
						)}
					</>
				),
			}}
		>
			<Stack.Screen name="[id]/index" />
			<Stack.Screen name="[id]/update-header" />
		</Stack>
	);
};

export default Layout;
