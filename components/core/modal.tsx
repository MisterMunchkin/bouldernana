import React, { ReactNode, useCallback, useRef } from "react";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "react-native";
import { cn } from "@/utils/cn.util";
import { ClassValue } from "clsx";
import PressableOpacity from "./pressable-opacity";

type Props = {
    displayText: string;
    className?: ClassValue;
    children: ReactNode;
};

const Modal = ({ displayText, className, children }: Props) => {
    console.log(displayText);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log("handleSheetChanges", index);
    }, []);
    return (
        <>
            <PressableOpacity
                twClassName={cn(
                    "border-[1px]  border-gray-400  px-2 py-4 rounded-lg items-center",
                    className
                )}
                onPress={handlePresentModalPress}
            >
                <Text className="text-black">{displayText}</Text>
            </PressableOpacity>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
            >
                <BottomSheetView>{children}</BottomSheetView>
            </BottomSheetModal>
        </>
    );
};

export default Modal;
