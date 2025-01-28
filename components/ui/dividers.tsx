import { cn } from "@/utils/cn.util";
import { View } from "react-native";
import AppText from "../core/app-text";
import { ClassValue } from "clsx";
import { cva, VariantProps } from "class-variance-authority";

export const dividersVariants = cva("", {
    variants: {
        lineWidth: {
            none: "",
            hairline: "border-b-[0.5px]",
            thin: "border-b-[1px]",
            thick: "border-b-2",
        },
        color: {
            none: "",
            danger: "border-b-core-imperial-red-500",
            info: "border-b-gray-400",
        },
        gap: {
            2: "gap-2",
            4: "gap-4",
        },
    },
    defaultVariants: {
        lineWidth: "thick",
        color: "info",
        gap: 2,
    },
});

type Props = {
    text: string;
    className?: ClassValue;
} & VariantProps<typeof dividersVariants>;

const Dividers = ({ text, className, color, gap, lineWidth }: Props) => {
    return (
        <View
            className={cn(
                dividersVariants({ gap, lineWidth: "none" }),
                "flex-row items-center",
                className
            )}
        >
            <View
                className={cn(
                    dividersVariants({ color, lineWidth }),
                    " flex-grow"
                )}
            />
            <AppText size={"xxs"} color={color === "danger" ? "red" : "gray"}>
                {text}
            </AppText>
            <View
                className={cn(
                    dividersVariants({ color, lineWidth }),
                    " flex-grow"
                )}
            />
        </View>
    );
};

export default Dividers;
