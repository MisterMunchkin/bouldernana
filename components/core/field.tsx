import { cn } from "@/utils/cn.util";
import { ErrorMessage } from "@hookform/error-message";
import { ClassValue } from "clsx";
import { ComponentProps } from "react";
import {
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
} from "react-hook-form";
import { View, TextInput } from "react-native";
import AppText from "./app-text";

export type FieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	title?: string;
	titleOptions?: Omit<ComponentProps<typeof AppText>, "children">;
	className?: ClassValue;
} & ControllerProps<TFieldValues, TName>;

/**
 * Base component for creating fields
 */
const Field = <
	TFieldValues extends FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	title,
	className,
	titleOptions,
	...controllerProps
}: FieldProps<TFieldValues, TName>) => {
	return (
		//NOTE: Type of value in field gets fucked up. shows value as type of all types in the schema instead of the type from the name
		<View className={cn("flex-col  w-full gap-4", className)}>
			<AppText size={"sm"} {...titleOptions}>
				{title}
			</AppText>
			<Controller {...controllerProps} />
		</View>
	);
};
Field.displayName = "Field";

/**
 * Text field using Field
 */
const TextField = <TFieldValues extends FieldValues>({
	className,
	inputProps,
	...fieldProps
}: Omit<FieldProps<TFieldValues>, "render"> & {
	inputProps?: ComponentProps<typeof TextInput>;
}) => {
	const { name } = fieldProps;
	return (
		<Field
			render={({
				field: { onChange, value, ref },
				fieldState: { error },
			}) => (
				<>
					<TextInput
						className={cn(
							"font-kosugi w-full border-[1px] px-4 py-2 rounded-lg border-gray-400 text-2xl leading-none",
							className
						)}
						onChangeText={onChange}
						value={`${value ? value : ""}`} //NOTE: Quick way to coerce non string values to string
						ref={ref}
						{...inputProps}
					/>
					<ErrorMessage
						errors={error}
						name={name}
						render={({ message }) => (
							<AppText size={"xs"} color={"red"}>
								{message}
							</AppText>
						)}
					/>
				</>
			)}
			{...fieldProps}
		/>
	);
};
TextField.displayname = "TextField";

export { Field, TextField };
