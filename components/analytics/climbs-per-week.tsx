import AppText from "../core/app-text";
import { CHART_CONFIG, CHART_HEIGHT } from "@/app/(tabs)/analytics";
import { LineChart } from "react-native-chart-kit";
import { useMemo, useState } from "react";
import { day, DayJsUtils } from "@/utils/day-js.util";
import { HapticsUtil } from "@/utils/expo-haptics.util";
import { Dimensions } from "react-native";
import { ClimbsClass } from "@/classes/climbs.class";
import { observer } from "@legendapp/state/react";
import { TailwindUtil } from "@/utils/tailwind.util";

type Props = {};

const ClimbsPerWeek = observer(({}: Props) => {
	const [selectedIndex, setSelectedIndex] = useState<number>();
	const climbs = ClimbsClass.climbs$.get();

	const { monthLabels, climbsPerMonth } = useMemo(() => {
		const acc: Record<string, number> = {};

		const firstDayOfMonths = DayJsUtils.getFirstDayOfEachMonthFrom(3);
		firstDayOfMonths.reduce((acc, date) => {
			const monthLabel = day(date).format("MMMM");
			acc[monthLabel] = climbs.filter((climb) =>
				day(climb.date).isSame(date, "month")
			).length;

			return acc;
		}, acc);

		const monthLabels = Object.keys(acc);
		const climbsPerMonth = Object.values(acc);

		return {
			climbsPerMonth,
			monthLabels,
		};
	}, [climbs]);

	return (
		<>
			{selectedIndex !== undefined ? (
				<AppText
					size={"xs"}
				>{`${climbsPerMonth[selectedIndex]} climbs on ${monthLabels[selectedIndex]}`}</AppText>
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
							data: climbsPerMonth,
							color: () =>
								TailwindUtil.getCoreColor(
									"amethyst-smoke.DEFAULT"
								),
						},
					],
				}}
				onDataPointClick={({ dataset, index, x, y }) => {
					HapticsUtil.selectionAsync();
					setSelectedIndex(index);
				}}
				getDotColor={(__, index) => {
					return index === selectedIndex
						? TailwindUtil.getCoreColor("white-rock.DEFAULT")
						: TailwindUtil.getCoreColor("amethyst-smoke.DEFAULT");
				}}
				yAxisInterval={1}
				verticalLabelRotation={10}
				fromNumber={
					Math.max(...climbsPerMonth) > 4
						? Math.max(...climbsPerMonth)
						: 4
				}
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
});

export default ClimbsPerWeek;
