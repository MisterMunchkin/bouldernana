import { climbSchema } from "@/constants/zod-schema.const";
import { router, useLocalSearchParams } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { ClimbLogLocalParams } from "./_index";
import { zodResolver } from "@hookform/resolvers/zod";
import { AscentField } from "@/components/log-new-climb/ascent-field";
import PressableOpacity from "@/components/core/pressable-opacity";
import { z } from "zod";
import AppText from "@/components/core/app-text";
import { ScrollView, View } from "react-native";
import { cn } from "@/utils/cn.util";
import { ClimbsClass } from "@/classes/climbs.class";

const schema = climbSchema.pick({
	ascentType: true,
	attempts: true,
	hasBeenSent: true,
});
type Props = {};

/**@deprecated */
const UpdateAscentInfo = ({}: Props) => {
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();
	const climbLog = ClimbsClass.peek(id);
	const updateLog = ClimbsClass.update;
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: schema.parse(climbLog),
	});
	const { handleSubmit } = form;

	const updateRecord = (update: z.infer<typeof schema>) => {
		updateLog({ id, update });
		router.back();
	};

	return (
		<ScrollView className={cn("flex-1")}>
			<View className="pt-safe-offset-4 gap-6 px-4">
				<FormProvider {...form}>
					<AscentField />

					<PressableOpacity
						onPress={handleSubmit(updateRecord)}
						color={"submit"}
						rounded={"lg"}
					>
						<AppText size={"xs"}>Submit</AppText>
					</PressableOpacity>
				</FormProvider>
			</View>
		</ScrollView>
	);
};

export default UpdateAscentInfo;
