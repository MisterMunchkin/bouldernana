import { cn } from "@/utils/cn.util";
import { ClassValue } from "clsx";
import { View } from "react-native";

type Props = {
	className?: ClassValue;
	currentIndex: number;
	totalItems: number;
};

//TODO: Animate this
const CarouselIndicator = ({ className, currentIndex, totalItems }: Props) => {
	return (
		<View className={cn("flex flex-row gap-4 items-center", className)}>
			{Array.from({ length: totalItems }).map((_, index) => (
				<View
					key={index}
					className={cn(
						"w-2 h-2 rounded-full",
						index === currentIndex ? "bg-white" : "bg-white/50"
					)}
				/>
			))}
		</View>
	);
};

export default CarouselIndicator;
