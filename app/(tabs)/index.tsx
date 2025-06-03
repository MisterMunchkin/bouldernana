import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import {
	LoggedClimb,
	useUserClimbRecordStore,
} from "@/stores/user-climb-record.store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";
import ObservedClimbs from "@/components/climbs/observed-climbs";
import { Climbs } from "@/supa-legend/climbs.class";
import { observer } from "@legendapp/state/react";
import { useCallback } from "react";
import ClimbCard from "@/components/climbs/climb-card";
import { FlashList } from "@shopify/flash-list";

type Props = {};

const Tab = observer(({}: Props) => {
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
		[getUserGrade]
	);
	const sortedClimbs = climbs
		.slice()
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);

	// const climbs$ = Climbs.data$;

	return (
		<View className="flex-1 px-2">
			{/* NOTE: Experimenting with real time observed climbs */}
			{/* <ObservedClimbs data$={climbs$} /> */}
			<FlashList
				data={sortedClimbs}
				contentContainerClassName="pt-safe-offset-20"
				contentContainerStyle={{
					paddingBottom: bottom + bottomTabBarHeight,
				}}
				ItemSeparatorComponent={() => <View className="h-2" />}
				renderItem={({ item }) => renderItem(item)}
				estimatedItemSize={200}
				extraData={{ getUserGrade }}
			/>
		</View>
	);
});

export default Tab;
