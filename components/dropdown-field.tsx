import { FieldValues } from "react-hook-form";
import { Field, FieldProps } from "./core/field";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import PressableOpacity from "./core/pressable-opacity";
import AppText from "./core/app-text";
import { ClassValues, cn } from "@/utils/cn.util";
import { ClassValue } from "clsx";
import ScrollableBottomSheet from "./core/scrollable-bottom-sheet";

export type DropDownItem<TItemValues extends string> = {
    label: string;
    value: TItemValues;
};

export type DropDownFieldProps<
    TFieldValues extends FieldValues,
    TItemValues extends string
> = {
    items: DropDownItem<TItemValues>[];
    defaultValue?: TItemValues;
    classNames?: ClassValues<"selected" | "item" | "text">;
    multi?: boolean;
} & Omit<FieldProps<TFieldValues>, "render" | "defualtValue">;
/**
 * DropDown using Field
 */
const DropdownField = <
    TFieldValues extends FieldValues,
    TItemValues extends string
>({
    items,
    classNames,
    defaultValue,
    multi,
    ...fieldProps
}: DropDownFieldProps<TFieldValues, TItemValues>) => {
    // const { defaultValue } = fieldProps;
    const {
        item: itemClassname,
        selected: selectedClassname,
        text: textClassname,
    } = classNames ?? {};
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    return (
        <Field
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
                <>
                    {/* Wrap thisinto a component and create select and multi select */}
                    <PressableOpacity
                        onPress={() => {
                            bottomSheetRef.current?.present();
                        }}
                        twClassName="px-4 py-2 border-[1px] border-gray-400 rounded-lg"
                    >
                        <AppText size={"xs"}>{value}</AppText>
                    </PressableOpacity>
                    <ScrollableBottomSheet ref={bottomSheetRef}>
                        {items.map((item, index) => (
                            <PressableOpacity
                                key={index}
                                onPress={() => onChange(item.value)}
                                twClassName={cn(
                                    "px-2 py-4 rounded-lg items-center",
                                    itemClassname,
                                    item.value === value
                                        ? selectedClassname
                                        : ""
                                )}
                            >
                                <AppText twClassName={textClassname}>
                                    {item.label}
                                </AppText>
                            </PressableOpacity>
                        ))}
                    </ScrollableBottomSheet>
                </>
            )}
            {...fieldProps}
        />
    );
};

export default DropdownField;
