import { Stack } from "expo-router";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <Stack />
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
