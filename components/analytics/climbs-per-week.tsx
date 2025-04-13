import { Analytics } from "@/classes/climb-analytic.class";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import AppText from "../core/app-text";
import { COLORS } from "@/constants/colors.const";
import {
	CHART_CONFIG,
	CHART_HEIGHT,
	SCREEN_WIDTH,
} from "@/app/(tabs)/analytics";
import { LineChart } from "react-native-chart-kit";
import { useMemo, useState } from "react";
import { day, DayJsUtils } from "@/utils/day-js.util";
import { HapticsUtil } from "@/utils/expo-haptics.util";
import { Dimensions } from "react-native";

type Props = {};

const ClimbsPerWeek = ({}: Props) => {
	const [selectedIndex, setSelectedIndex] = useState<number>();
	const climbs = useUserClimbRecordStore((store) => store.climbs);

	const { monthLabels, climbsPerWeekDataSet, climbsPerWeekRecordMap } =
		useMemo(() => {
			const threeMMonthsAgo = day().subtract(3, "month");

			const filteredClimbs = climbs.filter((climb) =>
				day(climb.date).isAfter(threeMMonthsAgo)
			);

			const acc: Record<string, number> = {};
			const result = filteredClimbs.reduce((acc, climb) => {
				const date = day(climb["date"]);
				const dateRange = DayJsUtils.getWeekRange(date);

				if (!acc[dateRange]) {
					acc[dateRange] = 1;
				} else {
					acc[dateRange] += 1;
				}

				return acc;
			}, acc);

			const climbsPerWeekDataSet = Object.values(result);
			const climbsPerWeekRecordMap = Object.entries(result);
			const monthLabels = DayJsUtils.getMonthLabelsFrom(3).toReversed();

			return {
				climbsPerWeekDataSet,
				climbsPerWeekRecordMap,
				monthLabels,
			};
		}, [climbs]);

	return (
		<>
			{selectedIndex !== undefined ? (
				<AppText
					size={"xs"}
				>{`${climbsPerWeekRecordMap[selectedIndex][1]} climbs on ${climbsPerWeekRecordMap[selectedIndex][0]}`}</AppText>
			) : (
				<AppText size={"xs"}>
					{climbs.length} Total logged climbs
				</AppText>
			)}
			<LineChart
				data={{
					labels: monthLabels,
					datasets: [
						{
							data: climbsPerWeekDataSet,
							color: () =>
								COLORS.core["caribbean-current"].DEFAULT,
						},
					],
				}}
				onDataPointClick={({ dataset, index, x, y }) => {
					// setPerWeekLabel(climbsPerWeekRecordMap[index]);
					HapticsUtil.selectionAsync();
					setSelectedIndex(index);
				}}
				getDotColor={(__, index) => {
					return index === selectedIndex
						? COLORS.core["vanilla"][300]
						: COLORS.core["caribbean-current"].DEFAULT;
				}}
				verticalLabelRotation={10}
				fromZero
				withInnerLines={false}
				width={Dimensions.get("screen").width}
				height={CHART_HEIGHT}
				chartConfig={{ ...CHART_CONFIG, decimalPlaces: 0 }}
				transparent
				bezier
			/>
		</>
	);
};

export default ClimbsPerWeek;
