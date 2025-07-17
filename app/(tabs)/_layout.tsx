import { FontAwesome } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router, Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";
import PressableIcon from "@/components/ui/pressable-icon";
import TabBar from "@/components/ui/tab-bar";
import { TailwindUtil } from "@/utils/tailwind.util";
import PressableOpacity from "@/components/core/pressable-opacity";
import AppText from "@/components/core/app-text";

type Props = {};

const TabLayout = ({}: Props) => {
	const renderBlurView = () => (
		<BlurView
			intensity={30}
			tint="systemThickMaterialDark"
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
					title: "",
					tabBarIcon: ({ color }) => (
						<FontAwesome size={28} name="home" color={color} />
					),
					headerRight: ({ tintColor }) => (
						<View className="flex-row items-center gap-6">
							<PressableOpacity>
								<AppText
									color={"white"}
									// twClassName="text-xs"
									size={"base"}
								>
									Filter
								</AppText>
							</PressableOpacity>
							<PressableOpacity
								onPress={() =>
									router.push("/activities/time-on-off")
								}
							>
								<AppText color={"white"} size={"base"}>
									Time On/Off
								</AppText>
							</PressableOpacity>
							<PressableOpacity>
								<AppText color={"white"} size={"base"}>
									Help
								</AppText>
							</PressableOpacity>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="new-climb"
				options={{
					title: "New Climb",
					tabBarIcon: ({ color }) => (
						<PressableIcon
							name="plus-circle"
							size={28}
							color={color}
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
