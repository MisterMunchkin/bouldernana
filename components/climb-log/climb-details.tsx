import { LoggedClimb } from "@/types/core.type";
import { View } from "react-native";
import AppText from "../core/app-text";

type Props = Pick<
	LoggedClimb,
	"hasBeenSent" | "ascentType" | "howDidItFeel" | "attempts" | "steepness"
>;

const ClimbDetails = ({
	hasBeenSent,
	ascentType,
	attempts,
	howDidItFeel,
	steepness,
}: Props) => {
	return (
		<View className="flex-row  gap-4 flex-wrap flex-1 justify-between">
			<View className="px-4 py-2 items-start gap-4">
				<View>
					<AppText size={"base"}>Ascent Type</AppText>
					<AppText size={"xl"}>{ascentType}</AppText>
				</View>
				<View>
					<AppText size={"base"}>Attemps</AppText>
					<AppText size={"xl"}>{attempts}</AppText>
				</View>
				<View>
					<AppText size={"base"}>Has this been sent?</AppText>
					<AppText size={"xl"}>
						{hasBeenSent ? "Sent!" : "Not yet..."}
					</AppText>
				</View>
			</View>
			<View className="px-4 py-2 flex-1 items-start gap-4">
				<View>
					<AppText size={"base"}>Steepness</AppText>
					<AppText size={"xl"}>{steepness}</AppText>
				</View>
				<View>
					<AppText size={"base"}>How did it feel?</AppText>
					<AppText size={"xl"}>{howDidItFeel}</AppText>
				</View>
			</View>
		</View>
	);
};

export default ClimbDetails;
