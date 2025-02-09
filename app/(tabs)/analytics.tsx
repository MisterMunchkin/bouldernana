import AppText from "@/components/core/app-text";
import { ScrollView, View } from "react-native";

type Props = {};

const analytics = ({}: Props) => {
    return (
        <ScrollView className="flex-1">
            <View className="py-safe-offset-20 items-center gap-6">
                <AppText>Coming Soon!</AppText>
                <AppText size={"xs"}>
                    Some features I'm thinking of including:
                </AppText>
                <View className="flex-col items-start gap-4 px-4">
                    <AppText size={"xs"}>
                        - Number of climbs logged this month
                    </AppText>
                    <AppText size={"xs"}>
                        - Average grade of the climbs logged this month
                    </AppText>
                    <AppText size={"xs"}>
                        - Radar charts of data like, steepness, skills, type of
                        ascents
                    </AppText>
                    <AppText size={"xs"}>
                        - Correlation between the grades you sent, how it felt,
                        if you project it or flash it
                    </AppText>
                </View>
            </View>
        </ScrollView>
    );
};

export default analytics;
