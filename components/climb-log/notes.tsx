import { LoggedClimb } from "@/types/core.type";
import AppText from "../core/app-text";
import { View } from "react-native";
import { ObservablePrimitive } from "@legendapp/state";
import { Computed } from "@legendapp/state/react";

type Props = {
	notes: ObservablePrimitive<LoggedClimb["notes"]>;
};

const Notes = ({ notes }: Props) => {
	return (
		<Computed>
			{() => (
				<View className="px-4 py-2 items-start">
					<AppText size={"base"}>Notes</AppText>
					<AppText size={"xl"}>{notes.get()}</AppText>
				</View>
			)}
		</Computed>
	);
};
export default Notes;
