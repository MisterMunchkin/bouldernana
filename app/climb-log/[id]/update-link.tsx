import { climbSchema } from "@/constants/zod-schema.const";
import { router, useLocalSearchParams } from "expo-router";
import { ClimbLogLocalParams } from "./_index";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScrollView, View } from "react-native";
import { cn } from "@/utils/cn.util";
import { TextField } from "@/components/core/field";
import PressableOpacity from "@/components/core/pressable-opacity";
import AppText from "@/components/core/app-text";
import { ClimbsClass } from "@/classes/climbs.class";

const schema = climbSchema.pick({
	link: true,
});

type Props = {};

/**@deprecated */
const UpdateLink = ({}: Props) => {
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

	return (
		<ScrollView className={cn("flex-1")}>
			<View className="pt-safe-offset-4 gap-6 px-4">
				<FormProvider {...form}>
					<TextField
						control={control}
						name="link"
						title="Links or resources of the climb, like TheCrag links"
						inputProps={{ autoCapitalize: "none" }}
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

export default UpdateLink;
