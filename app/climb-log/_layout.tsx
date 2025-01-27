import { cn } from "@/utils/cn.util";
import { BlurView } from "expo-blur";
import { Slot, Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {};

const Layout = ({}: Props) => {
    const insets = useSafeAreaInsets();

    return (
        <>
            {Platform.OS === "ios" && (
                <BlurView
                    tint="systemThinMaterialDark"
                    className={cn("absolute w-full z-50")}
                    style={{ height: insets.top }}
                />
            )}
            <Slot />
        </>
    );
};

export default Layout;
