import { cn } from "@/utils/cn.util";
import { HapticsUtil } from "@/utils/expo-haptics.util";
import { cva, VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { ComponentProps, ReactNode, useState } from "react";
import { GestureResponderEvent, Pressable } from "react-native";

export const pressableVariants = cva("px-2 py-4 items-center", {
    variants: {
        color: {
            transparent: "bg-transparent",
            white: "bg-white",
            black: "bg-black",
            red: "bg-core-imperial-red",
            blue: "bg-core-caribbean-current bg-core",
        },
        border: {
            none: "",
            gray: "border-gray-400 border-[1px]",
        },
        rounded: {
            lg: "rounded-lg",
            full: "rounded-full",
        },
        defaultVariants: {
            color: "red",
            rounded: "lg",
            border: "none",
        },
    },
});

type Props = {
    twClassName?: ClassValue;
    children: ReactNode;
} & Omit<ComponentProps<typeof Pressable>, "className"> &
    VariantProps<typeof pressableVariants>;

const PressableOpacity = ({
    rounded,
    color,
    border,
    children,
    twClassName,
    onPress,
    ...props
}: Props) => {
    const [isPressedIn, setIsPressedIn] = useState<boolean>(false);
    const handleOnPress = async (event: GestureResponderEvent) => {
        // HapticsUtil
        // .mediumImpactAsync();
        onPress && onPress(event);
    };

    return (
        <Pressable
            {...props}
            onPressIn={() => {
                setIsPressedIn(true);
                HapticsUtil.mediumImpactAsync();
            }}
            onPressOut={() => {
                setIsPressedIn(false);
                HapticsUtil.rigidImpactAsync();
            }}
            onPress={handleOnPress}
            className={cn(
                pressableVariants({ rounded, color, border }),
                twClassName,
                isPressedIn ? "opacity-50" : ""
            )}
        >
            {children}
        </Pressable>
    );
};

export default PressableOpacity;
