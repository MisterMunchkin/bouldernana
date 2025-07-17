import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import PressableOpacity from "../core/pressable-opacity";
import { BottomTabDescriptor } from "@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types";
import { cn } from "@/utils/cn.util";
import { TailwindUtil } from "@/utils/tailwind.util";
import { BlurView } from "expo-blur";

const TabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => {
	return (
		<BlurView
			tint="systemThickMaterialDark"
			className={cn(
				"bg-black absolute left-[50%] -translate-x-[50%]",
				"bottom-safe-offset-0 flex flex-row",
				"gap-8 px-3 rounded-full items-center py-3 overflow-hidden"
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
		</BlurView>
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

	const focusedColor = TailwindUtil.getCoreColor("white-rock.DEFAULT");
	const unfocusedColor = TailwindUtil.getCoreColor("amethyst-smoke.DEFAULT");

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
					color: focused ? focusedColor : unfocusedColor,
					focused: focused ?? false, //NOTE: This is useless, but it's required by the type
					size: 30, //NOTE: This is useless, but it's required by the type
				})}
		</PressableOpacity>
	);
};

export default TabBar;
