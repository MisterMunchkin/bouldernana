import { LoggedClimb } from "@/types/core.type";
import AppText from "../core/app-text";
import { View } from "react-native";

type Props = Pick<LoggedClimb, "skill">;

const SkillsNeeded = ({ skill }: Props) => {
	return (
		<View className="px-4 py-2 items-start">
			<AppText size={"base"}>Skills needed</AppText>
			<AppText size={"xl"}>{skill?.join(" - ")}</AppText>
		</View>
	);
};

export default SkillsNeeded;
