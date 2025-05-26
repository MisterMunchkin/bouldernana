import "../global.css";
import "expo-dev-client";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors.const";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { Toaster } from "sonner-native";
import { Media } from "@/classes/media.class";
import { SupaLegend } from "@/supa-legend/base.class";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

export default function RootLayout() {
	//NOTE: We proably don't need to unmount the root since the file folder is used on user actions. But wanted to follow expo docs
	const [isAppReady, setIsAppReady] = useState<boolean>(false);

	useEffect(() => {
		/**
		 * Just in case we have async functions to init the app
		 */
		const initApp = async () => {
			Media.ensurePermissions();
			SupaLegend.supabase.auth.onAuthStateChange((event, session) => {
				console.log(
					JSON.stringify({ event, user: session?.user }, null, 2)
				);
				SupaLegend.userAuth$.set({
					isAuthenticated:
						event === "SIGNED_IN" || event === "TOKEN_REFRESHED",
					user: session?.user ?? null,
				});
			});

			setIsAppReady(true);
		};

		initApp();
	}, []);

	const onLayoutRootView = useCallback(() => {
		if (isAppReady) {
			SplashScreen.hideAsync();
		}
	}, [isAppReady]);

	if (!isAppReady) {
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
							headerTintColor: COLORS.core.nyanza.DEFAULT,
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
