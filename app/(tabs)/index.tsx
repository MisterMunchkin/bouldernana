import ClimbCard from "@/components/climbs/climb-card";
import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import {
    LoggedClimb,
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
    const reset = useUserClimbRecordStore((store) => store.reset);
    const bottomTabBarHeight = useBottomTabBarHeight();
    const { top, bottom } = useSafeAreaInsets();

    const renderItem = useCallback(
        (item: LoggedClimb) => <ClimbCard {...item} />,
        [climbs]
    );

    return (
        <View className="flex-1 px-2">
            <FlashList
                data={climbs.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                )}
                contentContainerClassName="pt-safe-offset-20"
                ListHeaderComponent={() => (
                    <PressableOpacity onPress={() => reset()}>
                        <AppText>Reset</AppText>
                    </PressableOpacity>
                )}
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
