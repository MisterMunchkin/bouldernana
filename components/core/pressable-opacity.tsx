import { cn } from "@/utils/cn.util";
import { ClassValue } from "clsx";
import { ComponentProps, ReactNode } from "react";
import { Pressable, TouchableOpacity } from "react-native";

type Props = {
    twClassName?: ClassValue;
    children: ReactNode;
} & Omit<ComponentProps<typeof TouchableOpacity>, "className">;

const PressableOpacity = ({ children, twClassName, ...props }: Props) => {
    return (
        <Pressable
            {...props}
            className={cn(twClassName)}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
        >
            {children}
        </Pressable>
    );
};

export default PressableOpacity;
