import { router, useLocalSearchParams } from "expo-router";
import { ClimbLogLocalParams } from "./_index";
import AppText from "@/components/core/app-text";
import { ScrollView, View } from "react-native";
import { cn } from "@/utils/cn.util";
import { climbSchema } from "@/constants/zod-schema.const";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DropdownField from "@/components/core/dropdown-field";
import DateTimeField from "@/components/core/date-time-field";
import { WHERE } from "@/constants/core.const";
import { ClassValue } from "clsx";
import { CoreTypesUtil } from "@/utils/core-types.util";
import PressableOpacity from "@/components/core/pressable-opacity";
import { z } from "zod";
import ClimbTypeGrade from "@/components/log-new-climb/climb-type-grade";
import { ClimbsClass } from "@/classes/climbs.class";

const schema = climbSchema.pick({
	date: true,
	grade: true,
	typeOfClimb: true,
	whereDidYouClimb: true,
});

type Props = {};

/**@deprecated */
const UpdateHeader = ({}: Props) => {
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();

	const climbLog = ClimbsClass.peek(id);
	const updateLog = ClimbsClass.update;

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: schema.parse(climbLog),
	});

	const { control, handleSubmit } = form;
	const updateRecord = (update: z.infer<typeof schema>) => {
		updateLog({ id, update });
		router.back();
	};

	const selected: ClassValue = "bg-red-500";
	return (
		<ScrollView className={cn("flex-1")}>
			<View className="pt-safe-offset-4 gap-6 px-4">
				<FormProvider {...form}>
					<DateTimeField control={control} name="date" title="Date" />
					<ClimbTypeGrade />
					<DropdownField
						control={control}
						name="whereDidYouClimb"
						title="Where did you climb?"
						items={CoreTypesUtil.getInferredDropdownItems(WHERE)}
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
				</FormProvider>
			</View>
		</ScrollView>
	);
};

export default UpdateHeader;
