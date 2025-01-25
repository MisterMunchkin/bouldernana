import { cn } from "@/utils/cn.util";
import { ClassValue } from "clsx";
import React, { ComponentProps, useCallback, useRef, useState } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import { View, Text, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export type FieldProps<TFieldValues extends FieldValues> = {
    title?: string;
    className?: ClassValue;
} & ControllerProps<TFieldValues>;

/**
 * Base component for creating fields
 */
const Field = <TFieldValues extends FieldValues>({
    title,
    ...controllerProps
}: FieldProps<TFieldValues>) => {
    return (
        <View className="flex-col  w-full gap-4">
            <Text>{title}</Text>
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
    return (
        <Field
            render={({ field: { onChange, value, ref } }) => (
                <TextInput
                    className={cn(
                        "w-full border-[1px] px-2 py-4 rounded-lg border-gray-400",
                        className
                    )}
                    onChangeText={onChange}
                    value={value}
                    ref={ref}
                    {...inputProps}
                />
            )}
            {...fieldProps}
        />
    );
};
TextField.displayname = "TextField";

export { Field, TextField };
