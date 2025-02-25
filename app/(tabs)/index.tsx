import ClimbCard from "@/components/climbs/climb-card";
import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import {
    LoggedClimb,
    useUserClimbRecordStore,
} from "@/stores/user-climb-record.store";
import { FileSystemUtil } from "@/utils/file-system.util";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

const Tab = ({}: Props) => {
    const climbs = useUserClimbRecordStore((store) => store.climbs);
    const bottomTabBarHeight = useBottomTabBarHeight();
    const { bottom } = useSafeAreaInsets();
    const { getUserGrade } = useUserGradeOptions();

    const renderItem = useCallback(
        (climb: LoggedClimb) => (
            <ClimbCard
                {...climb}
                displayedGrade={getUserGrade({ grade: climb.grade })}
            />
        ),
        [climbs, getUserGrade]
    );

    return (
        <View className="flex-1 px-2">
            <FlashList
                data={climbs.sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                )}
                contentContainerClassName="pt-safe-offset-20"
                contentContainerStyle={{
                    paddingBottom: bottom + bottomTabBarHeight,
                }}
                ItemSeparatorComponent={() => <View className="h-4" />}
                renderItem={({ item }) => renderItem(item)}
                ListFooterComponent={() => (
                    <PressableOpacity onPress={() => FileSystemUtil.test()}>
                        <AppText>Log video dir_</AppText>
                    </PressableOpacity>
                )}
                estimatedItemSize={200}
                extraData={{ getUserGrade }}
            />
        </View>
    );
};

export default Tab;
