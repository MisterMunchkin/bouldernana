import { Platform } from "react-native";

export namespace PlatformUtil {
	export const isAndroid = Platform.OS === "android";

	export const isIOS = Platform.OS === "ios";

	export const isWeb = Platform.OS === "web";

	export const isMacOS = Platform.OS === "macos";

	export const isWindows = Platform.OS === "windows";
}
