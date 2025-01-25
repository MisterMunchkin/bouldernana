import { cn } from "@/utils/cn.util";
import { HapticsUtil } from "@/utils/expo-haptics.util";
import { ClassValue } from "clsx";
import { ComponentProps, ReactNode } from "react";
import {
    GestureResponderEvent,
    Pressable,
    TouchableOpacity,
} from "react-native";

type Props = {
    twClassName?: ClassValue;
    children: ReactNode;
} & Omit<ComponentProps<typeof TouchableOpacity>, "className">;

const PressableOpacity = ({
    children,
    twClassName,
    onPress,
    ...props
}: Props) => {
    const handleOnPress = async (event: GestureResponderEvent) => {
        HapticsUtil.mediumImpactAsync();
        onPress && onPress(event);
    };

    return (
        <Pressable
            {...props}
            onPress={handleOnPress}
            className={cn(twClassName)}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
        >
            {children}
        </Pressable>
    );
};

export default PressableOpacity;
