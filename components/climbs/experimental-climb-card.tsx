import type React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolate,
	Extrapolation,
} from "react-native-reanimated";
import AppText from "../core/app-text";
import { day } from "@/utils/day-js.util";

interface FolderCardProps {
	title: string;
	date: string;
	color: string;
	index: number;
	isActive?: boolean;
	onPress?: () => void;
	totalCards: number;
}

export const FolderCard: React.FC<FolderCardProps> = ({
	title,
	date,
	color,
	index,
	isActive = false,
	onPress,
	totalCards,
}) => {
	const pressed = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => {
		const translateY = interpolate(
			pressed.value,
			[0, 1],
			[0, -8],
			Extrapolation.CLAMP
		);

		return {
			transform: [{ translateY }],
			zIndex: totalCards - index,
		};
	});

	const handlePressIn = () => {
		pressed.value = withTiming(1, { duration: 150 });
	};

	const handlePressOut = () => {
		pressed.value = withTiming(0, { duration: 150 });
	};

	return (
		<Animated.View
			style={[
				styles.container,
				{
					backgroundColor: color,
					top: index * 40, // Stagger the cards
				},
				animatedStyle,
			]}
		>
			<Pressable
				style={styles.pressable}
				onPress={onPress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
			>
				<View style={styles.contentContainer}>
					<AppText>{title}</AppText>
					<AppText style={styles.date}>
						{day(date).strictFormat("DD MMM, YYYY")}
					</AppText>
				</View>
				<View style={styles.tabCutout} />
			</Pressable>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: "100%",
		height: 60,
		borderRadius: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 3,
	},
	pressable: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000",
		textTransform: "uppercase",
	},
	date: {
		fontSize: 14,
		color: "#000",
	},
	tabCutout: {
		position: "absolute",
		top: 0,
		right: 0,
		width: 20,
		height: "100%",
		backgroundColor: "transparent",
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		overflow: "hidden",
	},
});
