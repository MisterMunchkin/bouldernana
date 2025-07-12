import { FieldValues } from "react-hook-form";
import { Field, FieldProps } from "./field";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ClassValues, cn } from "@/utils/cn.util";
import { day, DayJsUtils } from "@/utils/day-js.util";
import PressableOpacity from "./pressable-opacity";
import AppText from "./app-text";

type Props = {
	classNames?: ClassValues<"field" | "text">;
};
const DateTimeField = <TFieldValues extends FieldValues>({
	classNames,
	...fieldProps
}: Omit<FieldProps<TFieldValues>, "render" | "className"> & Props) => {
	const { field: fieldClassName, text: textClassName } = classNames ?? {};
	const [show, setShow] = useState<boolean>(false);

	return (
		<Field
			render={({ field: { onChange, value } }) => (
				<>
					<PressableOpacity
						twClassName={cn(
							"border-[1px]  border-gray-400  px-2 py-4 rounded-lg items-center",
							fieldClassName
						)}
						onPress={() => setShow(true)}
					>
						<AppText twClassName={cn("text-black", textClassName)}>
							{day(value).format(DayJsUtils.DEFAULT_FORMAT)}
						</AppText>
					</PressableOpacity>
					<DateTimePickerModal
						isVisible={show}
						date={value}
						mode="datetime"
						pickerStyleIOS={{ marginHorizontal: "auto" }}
						onConfirm={(date) => {
							onChange(date);
							setShow(false);
						}}
						onCancel={() => setShow(false)}
					/>
				</>
			)}
			{...fieldProps}
		/>
	);
};

export default DateTimeField;
