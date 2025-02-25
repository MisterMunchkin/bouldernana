import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";

export const useImagePicker = () => {
    const [, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const pickVideo = async (): Promise<string | undefined> => {
        const status = await requestPermission();
        if (!status.granted) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["videos"],
            allowsEditing: true,
            quality: 1,
        });

        //NOTE: If the user cancels the picker, return
        if (result.canceled) return;

        return result.assets[0].uri;
    };

    return {
        pickVideo,
    };
};
