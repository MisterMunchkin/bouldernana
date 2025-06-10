import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import PressableIcon from "@/components/ui/pressable-icon";
import TabBar from "@/components/ui/tab-bar";
import { TailwindUtil } from "@/utils/tailwind.util";

type Props = {};

const TabLayout = ({}: Props) => {
	const renderBlurView = () => (
		<BlurView
			intensity={60}
			tint="systemThinMaterialDark"
			style={{
				...StyleSheet.absoluteFillObject,
				overflow: "hidden",
			}}
		/>
	);

	return (
		<Tabs
			screenOptions={{
				headerTransparent: true,
				headerBackground: () => renderBlurView(),
				headerTintColor:
					TailwindUtil.getCoreColor("amethyst-smoke.100"),
			}}
			tabBar={(props) => <TabBar {...props} />}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Climbs",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="home" color={color} />
					),
					headerRight: ({ tintColor }) => (
						<PressableIcon
							name="plus-square-o"
							size={28}
							color={tintColor}
							className="pr-4"
							onPress={() => router.push("/new-climb")}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="analytics"
				options={{
					title: "Analytics",
					tabBarIcon: ({ color }) => (
						<PressableIcon
							name="pie-chart"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => (
						<FontAwesome6
							name="mountain-sun"
							size={20}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
