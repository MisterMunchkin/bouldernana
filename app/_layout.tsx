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
import { ClimbsClass } from "@/classes/climbs.class";
import { TailwindUtil } from "@/utils/tailwind.util";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

// type Store = {
// 	climbs: LoggedClimb[];
// 	addClimb: (climb: AddClimbSchema) => void;
// 	setAssets: (args: { id: string; assetIds: string[] }) => void;
// 	getClimb: (id: string) => LoggedClimb | undefined;
// };

// export const store$ = observable<Store>({
// 	climbs: [],
// 	addClimb: (climb: AddClimbSchema) => {
// 		const loggedClimb: LoggedClimb = {
// 			...climb,
// 			id: ExpoCrypto.randomUUID(),
// 		};
// 		console.log("Logging climb:", loggedClimb);
// 		store$.climbs.push(loggedClimb);
// 	},
// 	setAssets: ({ id, assetIds }) => {
// 		store$;
// 		store$.set;
// 	},
// 	getClimb: (id: string) => {
// 		const {climbs} = store$.peek();
// 		return climbs.
// 	},
// });

// syncObservable(store$, {
// 	persist: {
// 		name: "gettingStarted",
// 		plugin: ObservablePersistMMKV,
// 	},
// });

export default function RootLayout() {
	//NOTE: We proably don't need to unmount the root since the file folder is used on user actions. But wanted to follow expo docs
	const [isAppReady, setIsAppReady] = useState<boolean>(false);

	useEffect(() => {
		/**
		 * Just in case we have async functions to init the app
		 */
		const initApp = async () => {
			Media.ensurePermissions();

			ClimbsClass.climbs$.onChange((params) => {
				//Add supabase storage sync here.
				console.log("Store changed:", JSON.stringify(params));
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
