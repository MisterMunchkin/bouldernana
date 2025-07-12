import { View } from "react-native";
import AppText from "../core/app-text";
import { ObservableBoolean, ObservablePrimitive } from "@legendapp/state";
import { LoggedClimb } from "../../types/core.type";
import { Computed } from "@legendapp/state/react";

type Props = {
	hasBeenSent: ObservableBoolean;
	ascentType: ObservablePrimitive<LoggedClimb["ascentType"]>;
	howDidItFeel: ObservablePrimitive<LoggedClimb["howDidItFeel"]>;
	attempts: ObservablePrimitive<LoggedClimb["attempts"]>;
	steepness: ObservablePrimitive<LoggedClimb["steepness"]>;
};

const ClimbDetails = ({
	hasBeenSent,
	ascentType,
	attempts,
	howDidItFeel,
	steepness,
}: Props) => {
	return (
		<Computed>
			{() => (
				<View className="flex-row  gap-4 flex-wrap flex-1 justify-between">
					<View className="px-4 py-2 items-start gap-4">
						<View>
							<AppText size={"base"}>Ascent Type</AppText>
							<AppText size={"xl"}>{ascentType.get()}</AppText>
						</View>
						<View>
							<AppText size={"base"}>Attemps</AppText>
							<AppText size={"xl"}>{attempts.get()}</AppText>
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
							<AppText size={"xl"}>{steepness.get()}</AppText>
						</View>
						<View>
							<AppText size={"base"}>How did it feel?</AppText>
							<AppText size={"xl"}>{howDidItFeel.get()}</AppText>
						</View>
					</View>
				</View>
			)}
		</Computed>
	);
};

export default ClimbDetails;
