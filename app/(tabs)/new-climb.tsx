import { router } from "expo-router";
import { ClimbsClass } from "@/classes/climbs.class";
import ClimbLogForm, { ClimbSchema } from "@/components/forms/climb-log-form";

export default function Index() {
	const saveRecord = (climb: ClimbSchema) => {
		try {
			ClimbsClass.add(climb);
			router.back();
		} catch (error) {
			console.error("Error saving climb record:", error);
		}
	};

	return <ClimbLogForm onSubmit={saveRecord} />;
}
