import { Stack } from "expo-router";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors.const";

export default function RootLayout() {
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
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                            title: "Climbs",
                        }}
                    />
                    <Stack.Screen
                        name="climb-log"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="new-climb/index"
                        options={{
                            headerTransparent: true,
                            headerBackground: () => renderBlurView(),
                            headerTintColor: COLORS.core.nyanza.DEFAULT,
                            presentation: "card",
                            title: "Log Climb",
                        }}
                    />
                </Stack>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
