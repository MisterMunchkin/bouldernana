import { ClassValues, cn } from "@/utils/cn.util";
import React, { useRef } from "react";
import AppText from "./app-text";
import PressableOpacity from "./pressable-opacity";
import ScrollableBottomSheet from "./scrollable-bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { DropDownItem } from "./dropdown-field";

type Props<TItemValue extends string> = {
    onChange: (value: TItemValue) => void;
    value: TItemValue;
    items: DropDownItem<TItemValue>[];
    classNames?: ClassValues<"selected" | "item" | "text">;
};

const SelectableBottomSheet = <TItemValue extends string>({
    onChange,
    value,
    items,
    classNames,
}: Props<TItemValue>) => {
    const {
        item: itemClassname,
        selected: selectedClassname,
        text: textClassname,
    } = classNames ?? {};
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    return (
        <>
            <PressableOpacity
                onPress={() => {
                    bottomSheetRef.current?.present();
                }}
                twClassName="px-4 py-2 border-[1px] border-gray-400 rounded-lg"
                haptics={false}
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
                            item.value === value ? selectedClassname : ""
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

export default SelectableBottomSheet;
