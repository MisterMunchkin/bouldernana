import { ClassValues, cn } from "@/utils/cn.util";
import { DropDownItem } from "./dropdown-field";
import SelectableBottomSheet from "./selectable-bottom-sheet";
import { useRef, useState } from "react";
import PressableOpacity from "./pressable-opacity";
import AppText from "./app-text";
import React from "react";
import ScrollableBottomSheet from "./scrollable-bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type Props<TItemValue extends string> = {
    onChange: (value: TItemValue[]) => void;
    value: TItemValue[];
    items: DropDownItem<TItemValue>[];
    classNames?: ClassValues<"selected" | "item" | "text">;
};
const MultiSelectableBottomSheet = <TItemValue extends string>({
    items,
    onChange,
    value: valuesProp,
    classNames,
}: Props<TItemValue>) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    // const [values, setValues] = useState<TItemValue[]>(value);
    const {
        item: itemClassname,
        selected: selectedClassname,
        text: textClassname,
    } = classNames ?? {};

    const onSingleChange = (value: TItemValue) => {
        if (isItemSelected(value)) {
            onChange(valuesProp.filter((v) => v !== value));
        } else {
            onChange([...valuesProp, value]);
        }
    };

    const isItemSelected = (value: TItemValue) => valuesProp.includes(value);

    return (
        <>
            <PressableOpacity
                onPress={() => bottomSheetRef.current?.present()}
                border={"gray"}
                rounded={"lg"}
                haptics={false}
            >
                <AppText size={"xs"}>{valuesProp.join(", ")}</AppText>
            </PressableOpacity>
            <ScrollableBottomSheet ref={bottomSheetRef}>
                {items.map((item, index) => (
                    <PressableOpacity
                        key={index}
                        onPress={() => onSingleChange(item.value)}
                        twClassName={cn(
                            "px-2 py-4 rounded-lg items-center",
                            itemClassname,
                            isItemSelected(item.value) ? selectedClassname : ""
                        )}
                    >
                        <AppText twClassName={textClassname}>
                            {item.label}
                        </AppText>
                    </PressableOpacity>
                ))}
            </ScrollableBottomSheet>
        </>
    );
};

export default MultiSelectableBottomSheet;
