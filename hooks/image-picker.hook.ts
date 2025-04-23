import { Media } from "@/classes/media.class";
import { AppError } from "@/utils/app-error.util";
import * as ImagePicker from "expo-image-picker";

export const useImagePicker = () => {
	const [, requestPermission] = ImagePicker.useMediaLibraryPermissions();

	/**
	 * Shows a video picker and returns the asset id of the video picked
	 * @returns AssetId of the video picked
	 */
	const pickVideo = async (): Promise<string | undefined> => {
		const status = await requestPermission();
		if (!status.granted) return;

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["videos"],
			allowsEditing: false,
			quality: 0.6,
			videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
		});

		//NOTE: If the user cancels the picker, return
		if (result.canceled) return;

		/**
		 * ImagePicker creates new files in the cache when a user picks something
		 * from the library, We need to clean the cache when this is done.
		 */
		await Media.cleanCache();
		return result.assets[0].assetId ?? undefined;
	};

	return {
		pickVideo,
	};
};
