import * as ImagePicker from "expo-image-picker";

export const useImagePicker = () => {
    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["videos"],
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) return;

        return result.assets[0].uri;
    };

    return {
        pickVideo,
    };
};
