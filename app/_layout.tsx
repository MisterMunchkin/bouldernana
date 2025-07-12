import "../global.css";
import "expo-dev-client";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "sonner-native";
import { Media } from "@/classes/media.class";
import { TailwindUtil } from "@/utils/tailwind.util";
import { useFonts } from "@expo-google-fonts/dm-mono";
import { DMMono_300Light } from "@expo-google-fonts/dm-mono/300Light";
import { DMMono_300Light_Italic } from "@expo-google-fonts/dm-mono/300Light_Italic";
import { DMMono_400Regular } from "@expo-google-fonts/dm-mono/400Regular";
import { DMMono_400Regular_Italic } from "@expo-google-fonts/dm-mono/400Regular_Italic";
import { DMMono_500Medium } from "@expo-google-fonts/dm-mono/500Medium";
import { DMMono_500Medium_Italic } from "@expo-google-fonts/dm-mono/500Medium_Italic";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

if (__DEV__) {
	require("../ReactotronConfig");
}

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

enableReactTracking({
	auto: true,
});

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		DMMono_300Light,
		DMMono_300Light_Italic,
		DMMono_400Regular,
		DMMono_400Regular_Italic,
		DMMono_500Medium,
		DMMono_500Medium_Italic,
	});

	//NOTE: We proably don't need to unmount the root since the file folder is used on user actions. But wanted to follow expo docs
	const [isAppReady, setIsAppReady] = useState<boolean>(false);

	useEffect(() => {
		/**
		 * Just in case we have async functions to init the app
		 */
		const initApp = async () => {
			Media.ensurePermissions();

			// ClimbsClass.climbs$.onChange((params) => {
			// 	//Add supabase storage sync here.
			// 	console.log("Store changed:", JSON.stringify(params));
			// });

			setIsAppReady(true);
		};

		initApp();
	}, []);

	const onLayoutRootView = useCallback(() => {
		if (isAppReady && fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [isAppReady, fontsLoaded]);

	if (!isAppReady || !fontsLoaded) {
		return null;
	}

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
		<GestureHandlerRootView onLayout={onLayoutRootView}>
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
							headerTintColor:
								TailwindUtil.getCoreColor("amethyst-smoke.100"),
							presentation: "card",
							title: "Log Climb",
						}}
					/>
				</Stack>
				<Toaster />
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
}
