import AppText from "@/components/core/app-text";
import { ScrollView, View } from "react-native";

type Props = {};

const analytics = ({}: Props) => {
    return (
        <ScrollView className="flex-1">
            <View className="py-safe-offset-20">
                <AppText>Analytics</AppText>
            </View>
        </ScrollView>
    );
};

export default analytics;
