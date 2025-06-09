import { addClimbSchema } from "@/constants/zod-schema.const";
import { cn } from "@/utils/cn.util";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { ClimbLogLocalParams } from ".";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DropdownField from "@/components/core/dropdown-field";
import { CoreTypesUtil } from "@/utils/core-types.util";
import { CLIMB_FEEL, STEEPNESS } from "@/constants/core.const";
import { ClassValue } from "clsx";
import PressableOpacity from "@/components/core/pressable-opacity";
import AppText from "@/components/core/app-text";
import { ClimbsClass } from "@/classes/climbs.class";

const schema = addClimbSchema.pick({
	howDidItFeel: true,
	steepness: true,
});
type Props = {};

const UpdateClimbFeel = ({}: Props) => {
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();
	const climbLog = ClimbsClass.peek(id);
	const updateLog = ClimbsClass.update;

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: schema.parse(climbLog),
	});
	const { handleSubmit, control } = form;

	const updateRecord = (update: z.infer<typeof schema>) => {
		updateLog({ id, update });
		router.back();
	};

	const selected: ClassValue = "bg-red-500";
	return (
		<ScrollView className={cn("flex-1")}>
			<View className="pt-safe-offset-4 gap-6 px-4">
				<DropdownField
					control={control}
					name="steepness"
					title="How steep was this climb?"
					items={CoreTypesUtil.getInferredDropdownItems(STEEPNESS)}
					classNames={{
						selected,
					}}
				/>
				<DropdownField
					control={control}
					name="howDidItFeel"
					title="How did the climb feel?"
					items={CoreTypesUtil.getInferredDropdownItems(CLIMB_FEEL)}
					classNames={{
						selected,
					}}
				/>
				<PressableOpacity
					onPress={handleSubmit(updateRecord)}
					color={"submit"}
					rounded={"lg"}
				>
					<AppText size={"xs"}>Submit</AppText>
				</PressableOpacity>
			</View>
		</ScrollView>
	);
};

export default UpdateClimbFeel;
