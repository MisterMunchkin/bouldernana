import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import { observer, use$ } from "@legendapp/state/react";
import { ClimbSchema, Climbs } from "@/supa-legend/climbs.class";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import { FlashList } from "@shopify/flash-list";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ClimbCard from "./climb-card";

type Props = {
	data$: typeof Climbs.data$;
};

const ObservedClimbs = observer(({ data$ }: Props) => {
	const climbs = data$.get();
	const { getUserGrade } = useUserGradeOptions();
	const bottomTabBarHeight = useBottomTabBarHeight();
	const { bottom } = useSafeAreaInsets();

	const renderItem = useCallback(
		(climb: ClimbSchema) => (
			<ClimbCard
				{...climb}
				displayedGrade={getUserGrade({ grade: climb.grade })}
			/>
		),
		[getUserGrade]
	);

	return (
		<>
			{climbs !== undefined && (
				<FlashList
					data={Object.values(climbs)}
					contentContainerClassName="pt-safe-offset-20"
					contentContainerStyle={{
						paddingBottom: bottom + bottomTabBarHeight,
					}}
					ItemSeparatorComponent={() => <View className="h-2" />}
					renderItem={({ item }) => renderItem(item)}
					estimatedItemSize={200}
					extraData={{ getUserGrade }}
				/>
			)}
		</>
	);
});
export default ObservedClimbs;
