import { ComponentProps, ReactNode } from "react";
import { Text } from "react-native";
import { cva, VariantProps } from "class-variance-authority";
import { ClassValue } from "clsx";
import { cn } from "@/utils/cn.util";

export const textVariants = cva("font-kosugi", {
	variants: {
		color: {
			white: "text-core-white-rock",
			black: "text-core-cod-gray",
			"black-50": "text-core-amethyst-smoke-400",
			"white-80": "text-white/80",
			gray: "text-gray-400",
			red: "text-core-imperial-red-500",
		},
		size: {
			xs: "text-xs",
			sm: "text-sm",
			base: "text-lg",
			lg: "text-xl",
			xl: "text-2xl",
		},
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
		},
		font: {
			regular: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
			light: "font-light",
			thin: "font-thin",
			extralight: "font-extralight",
			black: "font-black",
			italic: "italic",
		},
	},
	defaultVariants: {
		color: "black",
		size: "base",
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
	font,
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
			className={cn(
				textVariants({ size, align, color, font }),
				twClassName
			)}
		>
			{children}
		</Text>
	);
};

export default AppText;
