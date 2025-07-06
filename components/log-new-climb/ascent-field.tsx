import { useFormContext, useWatch } from "react-hook-form";
import DropdownField, { DropDownItem } from "../core/dropdown-field";
import { CoreTypesUtil } from "@/utils/core-types.util";
import { ASCENT_TYPE } from "@/constants/core.const";
import { Field, TextField } from "../core/field";
import { View } from "react-native";
import PressableOpacity from "../core/pressable-opacity";
import { cn } from "@/utils/cn.util";
import AppText from "../core/app-text";
import { ClimbSchema } from "@/components/forms/climb-log-form";

export const AscentField = () => {
	const { control } = useFormContext<ClimbSchema>();
	const ascentType = useWatch({
		control,
		name: "ascentType",
	});

	// useEffect(() => {
	//     ascentType !== "Project" &&
	//         setValue("attempts", 1)
	// }, [ascentType, setValue]);

	const getInferredDropdownItems = CoreTypesUtil.getInferredDropdownItems;

	const hasBeenSentItems: DropDownItem<0 | 1>[] = [
		{
			label: "Not yet...",
			value: 0,
		},
		{
			label: "Sent!",
			value: 1,
		},
	];

	return (
		<>
			<DropdownField
				control={control}
				name="ascentType"
				title="Did you send it?"
				items={getInferredDropdownItems(ASCENT_TYPE)}
				classNames={{
					selected: "bg-core-amethyst-smoke-600",
				}}
			/>
			{ascentType === "Project" && (
				<>
					<TextField
						control={control}
						title="Number of Attempts"
						name="attempts"
						inputProps={{
							keyboardType: "numeric",
						}}
					/>
					<Field
						control={control}
						title="Did you send the project?"
						name="hasBeenSent"
						render={({ field: { onChange, value: selected } }) => (
							//TODO: Componetize this
							<View className="flex-row items-center">
								{hasBeenSentItems.map(
									({ label, value }, index) => (
										<PressableOpacity
											key={index}
											onPress={() =>
												onChange(
													new Boolean(value).valueOf()
												)
											}
											twClassName={cn(
												"px-2 py-4 rounded-lg items-center flex-1",
												new Boolean(value).valueOf() ===
													selected
													? `${
															value === 1
																? "bg-green-300"
																: "bg-red-500"
													  }`
													: ""
											)}
										>
											<AppText size={"xs"}>
												{label}
											</AppText>
										</PressableOpacity>
									)
								)}
							</View>
						)}
					/>
				</>
			)}
		</>
	);
};
