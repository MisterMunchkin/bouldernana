import ClimbCard from "@/components/climbs/climb-card";
import {
    ClimbSchema,
    useUserClimbRecordStore,
} from "@/stores/user-climb-record.store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

const Tab = ({}: Props) => {
    const climbs = useUserClimbRecordStore((store) => store.climbs);
    const bottomTabBarHeight = useBottomTabBarHeight();
    const { top, bottom } = useSafeAreaInsets();

    const renderItem = useCallback(
        (item: ClimbSchema) => <ClimbCard {...item} />,
        [climbs]
    );

    return (
        <View className="flex-1 px-2">
            <FlashList
                data={climbs}
                contentContainerClassName="pt-safe-offset-20"
                contentContainerStyle={{
                    paddingBottom: bottom + bottomTabBarHeight,
                }}
                ItemSeparatorComponent={() => <View className="h-4" />}
                renderItem={({ item }) => renderItem(item)}
                estimatedItemSize={200}
            />
        </View>
    );
};

export default Tab;
