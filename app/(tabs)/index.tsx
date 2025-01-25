import AppText from "@/components/core/app-text";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlashList } from "@shopify/flash-list";
import { useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

const Tab = ({}: Props) => {
    const climbs = useUserClimbRecordStore((store) => store.climbs);
    const bottomTabBarHeight = useBottomTabBarHeight();
    const { top, bottom } = useSafeAreaInsets();

    return (
        <View className="flex-1 px-4">
            <FlashList
                data={climbs}
                contentContainerClassName="pt-safe-offset-20"
                contentContainerStyle={{
                    paddingBottom: bottom + bottomTabBarHeight,
                }}
                renderItem={({ item }) => (
                    <View className="bg-red-500">
                        <AppText color={"black"}>{item.description}</AppText>
                    </View>
                )}
                estimatedItemSize={200}
            />
        </View>
    );
};

export default Tab;
