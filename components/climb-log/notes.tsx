import { LoggedClimb } from "@/types/core.type";
import AppText from "../core/app-text";
import { View } from "react-native";

type Props = Pick<LoggedClimb, "notes">;

const Notes = ({ notes }: Props) => {
	return (
		<View className="px-4 py-2 items-start">
			<AppText size={"base"}>Notes</AppText>
			<AppText size={"xl"}>{notes}</AppText>
		</View>
	);
};
export default Notes;
