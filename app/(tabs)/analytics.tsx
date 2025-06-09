import { Analytics } from "@/classes/climb-analytic.class";
import AppText from "@/components/core/app-text";
import { ScrollView, View } from "react-native";

import { PieChart } from "react-native-chart-kit";
import { COLORS } from "../../constants/colors.const";
import ClimbsPerWeek from "@/components/analytics/climbs-per-week";
import { ClimbsClass } from "@/classes/climbs.class";
import { observer } from "@legendapp/state/react";

type Props = {};

export const SCREEN_WIDTH = 400;
export const CHART_HEIGHT = 250;
export const CHART_CONFIG = {
	// color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
	color: (opacity = 1) => COLORS.core["caribbean-current"].DEFAULT,
	strokeWidth: 2, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false, // optional
};

const analytics = observer(({}: Props) => {
	const climbs = ClimbsClass.climbs$.get();
	const climbAnalytic = new Analytics({
		data: climbs,
	});

	return (
		<ScrollView className="flex-1">
			<View className="py-safe-offset-20 items-center gap-6">
				<AppText>Coming Soon!</AppText>
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
				<PieChart
					accessor="value"
					data={climbAnalytic.toPieChartData("typeOfClimb")}
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
