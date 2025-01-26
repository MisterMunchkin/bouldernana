import AppText from "@/components/core/app-text";
import { cn } from "@/utils/cn.util";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

type Props = {};

type LocalParams = {
    id: string;
};
const index = ({}: Props) => {
    const { id } = useLocalSearchParams<LocalParams>();

    return (
        <ScrollView className={cn("flex-1")}>
            <View className="pt-safe-offset-8 pb-safe-offset-4">
                <AppText>{id}</AppText>
            </View>
        </ScrollView>
    );
};

export default index;
