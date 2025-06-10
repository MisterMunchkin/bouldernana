import ClimbCard from "@/components/climbs/climb-card";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useCallback } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { observer, use$ } from "@legendapp/state/react";
import { ClimbsClass } from "@/classes/climbs.class";
import { LoggedClimb } from "@/types/core.type";

type Props = {};

const Tab = observer(({}: Props) => {
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
		[getUserGrade]
	);

	const climbs = use$(ClimbsClass.climbs$).sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	console.log("Climbs:", JSON.stringify(climbs));

	return (
		<View className="flex-1 px-2 bg-core-cod-gray">
			<FlatList
				data={climbs}
				contentContainerClassName="pt-safe-offset-20"
				contentContainerStyle={{
					paddingBottom: bottom + bottomTabBarHeight,
				}}
				ItemSeparatorComponent={() => <View className="h-2" />}
				renderItem={({ item }) => renderItem(item)}
				keyExtractor={(item) => item.id}
				extraData={getUserGrade}
			/>
		</View>
	);
});

export default Tab;
