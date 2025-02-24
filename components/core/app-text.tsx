import { ComponentProps, ReactNode } from "react";
import { Text } from "react-native";
import { cva, VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { cn } from "@/utils/cn.util";

export const textVariants = cva("", {
    variants: {
        color: {
            white: "text-white",
            black: "text-black",
            "black-50": "text-black/50",
            "white-80": "text-white/80",
            "white-60": "text-white/60",
            gray: "text-gray-400",
            red: "text-core-imperial-red-500",
            blue: "text-core-caribbean-current-400",
        },
        size: {
            xxs: "text-sm",
            xs: "text-2xl",
            sm: "text-4xl",
            md: "text-5xl",
            lg: "text-[72px]",
        },
        align: {
            left: "text-left",
            center: "text-center",
            right: "text-right",
        },
    },
    defaultVariants: {
        color: "black",
        size: "md",
        align: "left",
    },
});

type Props = {
    twClassName?: ClassValue;
    children?: ReactNode;
} & VariantProps<typeof textVariants> &
    Omit<ComponentProps<typeof Text>, "className">;

const AppText = ({
    twClassName,
    children,
    // font,
    size,
    align,
    color,
    ...props
}: Props) => {
    return (
        <Text
            {...props}
            textBreakStrategy="simple"
            lineBreakStrategyIOS="standard"
            className={cn(textVariants({ size, align, color }), twClassName)}
        >
            {children}
        </Text>
    );
};

export default AppText;
