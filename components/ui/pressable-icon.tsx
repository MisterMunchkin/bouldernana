import { cn } from "@/utils/cn.util";
import { HapticsUtil } from "@/utils/expo-haptics.util";
import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps, useState } from "react";

type Props = {
    haptics?: boolean;
} & ComponentProps<typeof FontAwesome>;

const PressableIcon = ({ haptics = true, className, ...props }: Props) => {
    const [isPressedIn, setIsPressedIn] = useState<boolean>(false);
    return (
        <FontAwesome
            {...props}
            onPressIn={() => {
                setIsPressedIn(true);
                haptics && HapticsUtil.mediumImpactAsync();
            }}
            onPressOut={() => {
                setIsPressedIn(false);
                haptics && HapticsUtil.rigidImpactAsync();
            }}
            className={cn(className, isPressedIn ? "opacity-50" : "")}
        />
    );
};

export default PressableIcon;
