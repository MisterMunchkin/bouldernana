import { View } from "react-native";
import AppText from "../core/app-text";
import { day, DayJsUtils } from "@/utils/day-js.util";
import PressableOpacity from "../core/pressable-opacity";
import { router } from "expo-router";
import { LoggedClimb } from "@/types/core.type";

type Props = {
	displayedGrade: string;
} & Pick<
	LoggedClimb,
	| "date"
	| "videoAssetIds"
	| "id"
	| "skill"
	| "typeOfClimb"
	| "steepness"
	| "whereDidYouClimb"
>;

const ClimbCard = ({
	date,
	displayedGrade,
	id,
	typeOfClimb,
	skill,
	steepness,
	whereDidYouClimb,
}: Props) => {
	return (
		<PressableOpacity
			twClassName="flex-col flex-1 px-0 py-2"
			onPress={() => router.push(`/climb-log/${id}`)}
		>
			<View className="w-full  flex-col items-start gap-2">
				<AppText size={"xs"}>{`${typeOfClimb} - ${
					displayedGrade || "No Grade"
				} - ${steepness || "No Steepness"}`}</AppText>
				<AppText twClassName="text-lg text-core-caribbean-current-200">
					{`${whereDidYouClimb} • ${day(date).format(
						DayJsUtils.DEFAULT_FORMAT
					)}`}
				</AppText>
				<View className="flex-row gap-2">
					{skill?.slice(0, 4).map((s, index) => (
						<View
							key={index}
							className="border-[1px] border-gray-400 rounded-full px-4 py-1"
						>
							<AppText twClassName="text-base">{s}</AppText>
						</View>
					))}
				</View>
			</View>
		</PressableOpacity>
	);
};

export default ClimbCard;
