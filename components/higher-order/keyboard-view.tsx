import { cn } from "@/utils/cn.util";
import { ClassValue } from "clsx";
import React, { FC, ReactNode } from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
    children: ReactNode;
    className?: ClassValue;
    contentContainerClassName?: ClassValue;
};
const KeyboardView = ({
    children,
    className,
    contentContainerClassName,
}: Props) => {
    return (
        <KeyboardAwareScrollView
            className={cn("flex-1", className)}
            contentContainerClassName={cn("flex-1", contentContainerClassName)}
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
                <>{children}</>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
    );
};

export default KeyboardView;
