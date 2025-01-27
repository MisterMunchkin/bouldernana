import AppText from "@/components/core/app-text";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
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
    const loggedClimb = useUserClimbRecordStore((store) => store.getLog(id));

    return (
        <ScrollView className={cn("flex-1")}>
            <View className="pt-safe-offset-8 pb-safe-offset-4">
                <AppText>{JSON.stringify(loggedClimb)}</AppText>
            </View>
        </ScrollView>
    );
};

export default index;
