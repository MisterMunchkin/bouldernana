import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import PressableOpacity from "../core/pressable-opacity";
import AppText from "../core/app-text";
import { BottomTabDescriptor } from "@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types";
import { COLORS } from "@/constants/colors.const";
import { cn } from "@/utils/cn.util";

const TabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => {
	return (
		<View
			className={cn(
				"bg-black absolute left-[50%] -translate-x-[50%]",
				"bottom-safe-offset-0 flex flex-row",
				"gap-8 px-3 rounded-full items-center"
			)}
		>
			{state.routes.map((route) => (
				<Tab
					key={route.key}
					navigation={navigation}
					focused={state.index === state.routes.indexOf(route)}
					descriptor={descriptors[route.key]}
				/>
			))}
		</View>
	);
};

const Tab = ({
	navigation,
	focused,
	descriptor,
}: {
	focused?: boolean;
	navigation: BottomTabBarProps["navigation"];
	descriptor: BottomTabDescriptor;
}) => {
	const {
		route: { name: routeName, key },
		options: { title, tabBarIcon },
	} = descriptor;
	return (
		<PressableOpacity
			key={key}
			onPress={() => {
				const event = navigation.emit({
					type: "tabPress",
					target: key,
					canPreventDefault: true,
				});

				if (!focused && !event.defaultPrevented)
					navigation.navigate(routeName);
			}}
			color={"transparent"}
		>
			{tabBarIcon &&
				tabBarIcon({
					color: focused
						? COLORS.core["imperial-red"][500]
						: COLORS.core["caribbean-current"][500],
					focused: focused ?? false, //NOTE: This is useless, but it's required by the type
					size: 30, //NOTE: This is useless, but it's required by the type
				})}
		</PressableOpacity>
	);
};

export default TabBar;
