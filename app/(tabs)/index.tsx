import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { use$ } from "@legendapp/state/react";
import { ClimbsClass } from "@/classes/climbs.class";
import { View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { LegendList, LegendListRenderItemProps } from "@legendapp/list";
import { useCallback } from "react";
import { LoggedClimb } from "@/types/core.type";
import ClimbCard from "@/components/climbs/climb-card";

type Props = {};

const Tab = ({}: Props) => {
	const headerHeight = useHeaderHeight();
	const bottomTabBarHeight = useBottomTabBarHeight();
	const { bottom } = useSafeAreaInsets();
	const { getUserGrade } = useUserGradeOptions();

	const sortedClimbs$ = use$(ClimbsClass.sortedClimbs$);

	const renderItem = useCallback(
		({ item }: LegendListRenderItemProps<LoggedClimb>) => {
			return (
				<ClimbCard
					displayedGrade={getUserGrade({ grade: item.grade })}
					{...item}
				/>
			);
		},
		[]
	);

	return (
		<View className="px-2 bg-core-cod-gray flex-1">
			<LegendList
				data={sortedClimbs$}
				renderItem={renderItem}
				contentContainerStyle={{
					paddingBottom: bottom + bottomTabBarHeight + 20,
					paddingTop: headerHeight,
				}}
				ItemSeparatorComponent={() => <View className="h-2" />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default Tab;
