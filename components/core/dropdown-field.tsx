import { FieldValues } from "react-hook-form";
import { Field, FieldProps } from "./field";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";
import { ClassValues, cn } from "@/utils/cn.util";
import SelectableBottomSheet from "./selectable-bottom-sheet";
import MultiSelectableBottomSheet from "./multi-selectable-bottom-sheet";

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
    return (
        <Field
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => (
                <>
                    {multi ? (
                        <MultiSelectableBottomSheet
                            onChange={onChange}
                            value={value}
                            classNames={classNames}
                            items={items}
                        />
                    ) : (
                        <SelectableBottomSheet
                            onChange={onChange}
                            value={value}
                            classNames={classNames}
                            items={items}
                        />
                    )}
                </>
            )}
            {...fieldProps}
        />
    );
};

export default DropdownField;
