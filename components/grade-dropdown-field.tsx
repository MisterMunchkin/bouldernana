import { FieldValues } from "react-hook-form";
import { Field, FieldProps } from "./core/field";
import {
    ComponentProps,
    ReactNode,
    useCallback,
    useRef,
    useState,
} from "react";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlashList,
    BottomSheetModal,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React from "react";
import PressableOpacity from "./core/pressable-opacity";
import AppText from "./core/app-text";
import { cn } from "@/utils/cn.util";

export type DropDownItem<TItemValues extends string> = {
    label: string;
    value: TItemValues;
};

export type DropDownFieldProps<
    TFieldValues extends FieldValues,
    TItemValues extends string
> = {
    items: DropDownItem<TItemValues>[];
} & Omit<FieldProps<TFieldValues>, "render">;
/**
 * DropDown using Field
 */
const GradeDropdownField = <
    TFieldValues extends FieldValues,
    TItemValues extends string
>({
    items,
    ...fieldProps
}: DropDownFieldProps<TFieldValues, TItemValues>) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const renderBackdrop = useCallback(
        (props: ComponentProps<typeof BottomSheetBackdrop>) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                pressBehavior={"close"}
            />
        ),
        []
    );

    return (
        <Field
            render={({ field: { onChange, value, ref } }) => (
                <>
                    <PressableOpacity
                        onPress={() => {
                            bottomSheetRef.current?.present();
                        }}
                        twClassName="px-4 py-2 border-[1px] border-gray-400 rounded-lg"
                    >
                        <AppText size={"xs"}>{value}</AppText>
                    </PressableOpacity>
                    <BottomSheetModal
                        ref={bottomSheetRef}
                        snapPoints={["50%"]}
                        backdropComponent={renderBackdrop}
                        // index={1}
                        enablePanDownToClose
                        enableDynamicSizing={false}
                    >
                        <BottomSheetScrollView
                            contentContainerClassName={cn("px-4 py-6")}
                        >
                            {items.map((item, index) => (
                                <PressableOpacity
                                    key={index}
                                    onPress={() => onChange(item.value)}
                                    twClassName={cn(
                                        "px-2 py-4 rounded-lg items-center",
                                        item.value === value ? "bg-red-500" : ""
                                    )}
                                >
                                    <AppText>{item.label}</AppText>
                                </PressableOpacity>
                            ))}
                        </BottomSheetScrollView>
                    </BottomSheetModal>
                </>
            )}
            {...fieldProps}
        />
    );
};

export default GradeDropdownField;
