import { LoggedClimb } from "@/types/core.type";
import AppText from "../core/app-text";
import { View } from "react-native";
import { ObservablePrimitive } from "@legendapp/state";
import { Computed } from "@legendapp/state/react";

type Props = {
	skill: ObservablePrimitive<LoggedClimb["skill"]>;
};

const SkillsNeeded = ({ skill }: Props) => {
	return (
		<Computed>
			{() => (
				<View className="px-4 py-2 items-start">
					<AppText size={"base"}>Skills needed</AppText>
					<AppText size={"xl"}>{skill.get()?.join(" - ")}</AppText>
				</View>
			)}
		</Computed>
	);
};

export default SkillsNeeded;
