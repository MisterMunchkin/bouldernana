import { Stack } from "expo-router";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="climb-log"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="new-climb/index"
                        options={{
                            presentation: "modal",
                            title: "Log Climb",
                        }}
                    />
                </Stack>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
