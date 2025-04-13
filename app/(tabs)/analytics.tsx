import { Analytics } from "@/classes/climb-analytic.class";
import AppText from "@/components/core/app-text";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { Dimensions, ScrollView, View } from "react-native";

import { LineChart, PieChart } from "react-native-chart-kit";

type Props = {};

const screenWidth = 400;
const chartHeight = 250;
const chartConfig = {
	backgroundGradientFrom: "#1E2923",
	backgroundGradientFromOpacity: 0,
	backgroundGradientTo: "#08130D",
	backgroundGradientToOpacity: 0.5,
	color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
	strokeWidth: 2, // optional, default 3
	barPercentage: 0.5,
	useShadowColorFromDataset: false, // optional
};

const analytics = ({}: Props) => {
	const climbs = useUserClimbRecordStore((store) => store.climbs);
	// const totalTypesOfClimbs = new ClimbAnalytic(
	// 	climbs
	// ).getTotalTypesOfClimbs();
	const typeOfCLimbAnalytic = new Analytics({
		data: climbs,
	});

	return (
		<ScrollView className="flex-1">
			<View className="py-safe-offset-20 items-center gap-6">
				<AppText>Coming Soon!</AppText>
				<AppText size={"xs"}>
					Some features I'm thinking of including:
				</AppText>
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
				{/* <LineChart
					data={{
						labels: [],
						datasets: [
							{
								data: [],
							},
						],
					}}
					width={screenWidth}
					height={chartHeight}
					verticalLabelRotation={30}
					chartConfig={chartConfig}
					bezier
				/> */}
				<PieChart
					accessor="value"
					data={typeOfCLimbAnalytic.toPieChartData("typeOfClimb")}
					width={screenWidth}
					height={chartHeight}
					backgroundColor="transparent"
					paddingLeft="15"
					chartConfig={chartConfig}
				/>
			</View>
		</ScrollView>
	);
};

export default analytics;
