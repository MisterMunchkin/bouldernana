import { Text, View } from "react-native";

/**
 * An app that allows climbers to track there progress by grades.
 *
 * inputs:
 * grade - options
 * description - string
 * date - prefilled to current date
 * notes - string
 * video - blob
 *
 *
 */
export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Edit app/index.tsx to edit this screen.</Text>
        </View>
    );
}
