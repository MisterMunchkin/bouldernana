import { FontAwesome } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Pressable, StyleSheet, View } from "react-native";
import PressableOpacity from "@/components/core/pressable-opacity";
import { COLORS } from "@/constants/colors.const";
import PressableIcon from "@/components/ui/pressable-icon";

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
                headerTintColor: COLORS.core.nyanza.DEFAULT,
                tabBarActiveTintColor: COLORS.core.nyanza.DEFAULT,
                tabBarInactiveTintColor: COLORS.core.vanilla.DEFAULT,
                tabBarStyle: {
                    position: "absolute",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                tabBarBackground: () => renderBlurView(),
                tabBarButton: ({ ...props }) => (
                    <PressableOpacity
                        twClassName="items-center pt-2"
                        {...props}
                    />
                ),
            }}
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
                            size={26}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
