import { Analytics } from "@/classes/climb-analytic.class";
import AppText from "@/components/core/app-text";
import { ScrollView, View } from "react-native";

import { PieChart } from "react-native-chart-kit";
import ClimbsPerWeek from "@/components/analytics/climbs-per-week";
import { ClimbsClass } from "@/classes/climbs.class";
import { TailwindUtil } from "@/utils/tailwind.util";
import { computed } from "@legendapp/state";
import { observer } from "@legendapp/state/react";

type Props = {};

export const SCREEN_WIDTH = 400;
export const CHART_HEIGHT = 250;
export const CHART_CONFIG = {
	// color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
	color: (opacity = 1) => TailwindUtil.getCoreColor("cod-gray.800"),
	strokeWidth: 2, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false, // optional
};

const analytics = observer(({}: Props) => {
	const climbAnalytic$ = computed(
		() =>
			new Analytics({
				data: ClimbsClass.climbs$.get().slice(),
			})
	);

	return (
		<ScrollView className="flex-1">
			<View className="py-safe-offset-20 items-center gap-6">
				<AppText>
					Coming Soon! currently only have line graphs and pie charts
					but would be nice to also include radar charts, dot charts,
					etc.
				</AppText>
				{/* <AppText size={"xs"}>
					Some features I'm thinking of including:
				</AppText> */}
				{/* <View className="flex-col items-start gap-4 px-4">
					<AppText size={"xs"}>
						- Number of climbs logged this month
					</AppText>
					<AppText size={"xs"}>
						- Average grade of the climbs logged this month
					</AppText>
					<AppText size={"xs"}>
						- Radar charts of data like, steepness, skills, type of
						ascents
					</AppText>
					<AppText size={"xs"}>
						- Correlation between the grades you sent, how it felt,
						if you project it or flash it
					</AppText>
				</View> */}
				<ClimbsPerWeek />
				<AppText size={"base"}>Climbs by grade</AppText>
				<PieChart
					accessor="value"
					data={climbAnalytic$.toPieChartData("grade")}
					width={SCREEN_WIDTH}
					height={CHART_HEIGHT}
					backgroundColor="transparent"
					paddingLeft="15"
					chartConfig={CHART_CONFIG}
				/>
				<AppText size={"base"}>Climbs by ascent</AppText>
				<PieChart
					accessor="value"
					data={climbAnalytic$.toPieChartData("ascentType")}
					width={SCREEN_WIDTH}
					height={CHART_HEIGHT}
					backgroundColor="transparent"
					paddingLeft="15"
					chartConfig={CHART_CONFIG}
				/>
				<AppText size={"base"}>Climbs by steepness</AppText>
				<PieChart
					accessor="value"
					data={climbAnalytic$.toPieChartData("steepness")}
					width={SCREEN_WIDTH}
					height={CHART_HEIGHT}
					backgroundColor="transparent"
					paddingLeft="15"
					chartConfig={CHART_CONFIG}
				/>
				<AppText size={"base"}>Climbs by where(?)</AppText>
				<PieChart
					accessor="value"
					data={climbAnalytic$.toPieChartData("whereDidYouClimb")}
					width={SCREEN_WIDTH}
					height={CHART_HEIGHT}
					backgroundColor="transparent"
					paddingLeft="15"
					chartConfig={CHART_CONFIG}
				/>
			</View>
		</ScrollView>
	);
});

export default analytics;
