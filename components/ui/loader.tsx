import { ReactNode } from "react";
import { ViewStyle, StyleProp, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

type LoaderProps = {
    children?: ReactNode;
} & ViewStyle;

type LoaderItemProps<T extends string> = {
    children?: ReactNode;
    pulseColors?: {
        start: T;
        end: T;
    };
    duration?: number;
} & ViewStyle;

const DEFAULT = {
    easing: Easing.bezier(0.64, 0.14, 0.62, 0.87),
    duration: 1000,
    pulseColors: {
        start: "#ececec",
        end: "#d6d6d6",
    },
};

export default function Loader({ children, ...props }: LoaderProps) {
    return <View style={props}>{children}</View>;
}

Loader.Item = <T extends string>({
    children,
    pulseColors,
    duration,
    height,
    width,
    ...props
}: LoaderItemProps<T>) => {
    const { end, start } = pulseColors ?? DEFAULT.pulseColors;
    const color = useSharedValue(start);
    color.value = withRepeat(
        withTiming(end, {
            duration: duration ?? DEFAULT.duration,
            easing: DEFAULT.easing,
        }),
        0,
        true
    );

    const animatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: color.value,
        };
    });

    return (
        <Animated.View
            style={[
                props,
                animatedStyles,
                {
                    height: height ?? "100%",
                    width: width ?? "100%",
                    backgroundColor: "red",
                },
            ]}
        >
            {children}
        </Animated.View>
    );
};

export type { LoaderProps, LoaderItemProps };
export { Loader };
