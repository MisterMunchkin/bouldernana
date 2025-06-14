import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { observer } from "@legendapp/state/react";
import { ClimbsClass } from "@/classes/climbs.class";
import { LoggedClimb } from "@/types/core.type";
import { FolderCard } from "@/components/climbs/experimental-climb-card";
import { TailwindUtil } from "@/utils/tailwind.util";
import { LegendListRenderItemProps } from "@legendapp/list";
import { FlatList, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

type Props = {};

const Tab = observer(({}: Props) => {
	const headerHeight = useHeaderHeight();
	const bottomTabBarHeight = useBottomTabBarHeight();
	const { bottom } = useSafeAreaInsets();
	const { getUserGrade } = useUserGradeOptions();

	const renderItem = ({
		item: { typeOfClimb, date },
		index,
	}: LegendListRenderItemProps<LoggedClimb>) => (
		<FolderCard
			title={typeOfClimb}
			date={date}
			color={TailwindUtil.getCoreColor("amethyst-smoke.100")}
			index={index}
			totalCards={0}
			// {...climb}
			// displayedGrade={getUserGrade({ grade: climb.grade })}
		/>
	);
	// const renderItem = useCallback(
	// 	(climb: LoggedClimb, index: number) => (
	// 		<FolderCard
	// 			title={climb.typeOfClimb}
	// 			date={climb.date}
	// 			color={TailwindUtil.getCoreColor("amethyst-smoke.100")}
	// 			index={index}
	// 			totalCards={climbs.length}
	// 			// {...climb}
	// 			// displayedGrade={getUserGrade({ grade: climb.grade })}
	// 		/>
	// 	),
	// 	[getUserGrade]
	// );
	// console.log("Climbs:", JSON.stringify(climbs));

	return (
		<View className="px-2 bg-core-cod-gray flex-1">
			<FlatList
				data={ClimbsClass.climbs$.get()}
				contentContainerStyle={{
					paddingBottom: bottom + bottomTabBarHeight + 20,
					paddingTop: headerHeight,
				}}
				ItemSeparatorComponent={() => <View className="h-2" />}
				renderItem={({ index, item: { typeOfClimb, date } }) => (
					<FolderCard
						title={typeOfClimb}
						date={date}
						color={TailwindUtil.getCoreColor("amethyst-smoke.100")}
						index={index}
						totalCards={0}
						// {...climb}
						// displayedGrade={getUserGrade({ grade: climb.grade })}
					/>
				)}
				keyExtractor={(item) => item.id}
				// extraData={JSON.stringify(climbs)}
			/>
		</View>
	);
});

export default Tab;
