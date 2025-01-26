import { cn } from "@/utils/cn.util";
import { ErrorMessage } from "@hookform/error-message";
import { ClassValue } from "clsx";
import React, { ComponentProps, useCallback, useRef, useState } from "react";
import { Controller, ControllerProps, FieldValues } from "react-hook-form";
import { View, Text, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AppText from "./app-text";

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
                            "w-full border-[1px] px-4 py-2 rounded-lg border-gray-400 text-2xl leading-tight",
                            className
                        )}
                        onChangeText={onChange}
                        value={value}
                        ref={ref}
                        {...inputProps}
                    />
                    <ErrorMessage
                        errors={error}
                        name={name}
                        render={({ message }) => (
                            <AppText size={"xxs"} color={"red"}>
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
