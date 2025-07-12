import { ClimbsClass } from "@/classes/climbs.class";
import ClimbLogForm, { ClimbSchema } from "@/components/forms/climb-log-form";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ClimbLogLocalParams } from "..";
import { use$ } from "@legendapp/state/react";

export default function Index() {
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();
	const { climb: defaultValues } = use$(new ClimbsClass(id));
	const router = useRouter();

	const updateRecord = (climb: ClimbSchema) => {
		try {
			ClimbsClass.update({ id, update: climb });
			router.back();
		} catch (error) {
			console.error("Error updating climb record:", error);
		}
	};

	return (
		<ClimbLogForm
			onSubmit={updateRecord}
			onError={(err) => console.error(JSON.stringify(err))}
			defaultValues={defaultValues.get()}
		/>
	);
}
