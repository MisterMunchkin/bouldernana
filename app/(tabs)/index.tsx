import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { observer } from "@legendapp/state/react";
import { ClimbsClass } from "@/classes/climbs.class";
import { LoggedClimb } from "@/types/core.type";
import { FlatList, ListRenderItem, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useCallback } from "react";
import ClimbCard from "@/components/climbs/climb-card";
import { day } from "@/utils/day-js.util";

type Props = {};

const Tab = observer(({}: Props) => {
	const headerHeight = useHeaderHeight();
	const bottomTabBarHeight = useBottomTabBarHeight();
	const { bottom } = useSafeAreaInsets();
	const { getUserGrade } = useUserGradeOptions();

	const renderItem: ListRenderItem<LoggedClimb> = useCallback(
		({ index, item }) => (
			<ClimbCard
				displayedGrade={getUserGrade({ grade: item.grade })}
				{...item}
			/>
		),
		[getUserGrade]
	);

	return (
		<View className="px-2 bg-core-cod-gray flex-1">
			<FlatList
				data={ClimbsClass.climbs$
					.get()
					.sort((a, b) => day(b.date).diff(day(a.date)))}
				contentContainerStyle={{
					paddingBottom: bottom + bottomTabBarHeight + 20,
					paddingTop: headerHeight,
				}}
				ItemSeparatorComponent={() => <View className="h-2" />}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
});

export default Tab;
