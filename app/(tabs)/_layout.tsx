import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import BlurTabBarBackground from "../../app-example/components/ui/TabBarBackground.ios";
import { BlurView } from "expo-blur";
import { Pressable, StyleSheet } from "react-native";
import PressableOpacity from "@/components/core/pressable-opacity";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

const TabLayout = ({}: Props) => {
    const { top, bottom } = useSafeAreaInsets();
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "blue",
                tabBarStyle: {
                    position: "absolute",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
                tabBarBackground: () => (
                    <BlurView
                        intensity={40}
                        tint="default"
                        style={{
                            ...StyleSheet.absoluteFillObject,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            backgroundColor: "rgba(101, 92, 155, 0.4)",
                            overflow: "hidden",
                        }}
                    />
                ),
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
                }}
            />
            <Tabs.Screen
                name="log-new-climb"
                options={{
                    title: "Log Climb",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome
                            size={28}
                            name="plus-square-o"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
