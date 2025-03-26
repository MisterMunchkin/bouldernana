import { AppError } from "@/utils/app-error.util";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";

export const useImagePicker = () => {
	const [, requestPermission] = ImagePicker.useMediaLibraryPermissions();

	const pickVideo = async (): Promise<ImagePickerAsset | undefined> => {
		const status = await requestPermission();
		if (!status.granted) return;

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["videos"],
			allowsEditing: false,
			quality: 0.6,
		});

		//NOTE: If the user cancels the picker, return
		if (result.canceled)
			return Promise.reject(new AppError("User canceled", result));

		return result.assets[0];
	};

	return {
		pickVideo,
	};
};
