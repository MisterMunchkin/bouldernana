import { FieldValues } from "react-hook-form";
import { Field, FieldProps } from "./field";
import { Text, View } from "react-native";
import { cn } from "@/utils/cn.util";
import { useImagePicker } from "@/hooks/image-picker.hook";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { ComponentProps, FC } from "react";
import PressableOpacity from "./pressable-opacity";

type Props<TFieldValues extends FieldValues> = {
    text?: string;
} & Omit<FieldProps<TFieldValues>, "render">;

const FileField = <TFieldValues extends FieldValues>({
    text,
    className,
    ...fieldProps
}: Props<TFieldValues>) => {
    const { pickVideo } = useImagePicker();

    const onPress = async (onChange: (...event: any[]) => void) => {
        const video = await pickVideo();
        if (!video) return;

        onChange(video);
    };

    return (
        <Field
            render={({ field: { onChange } }) => (
                <PressableOpacity
                    twClassName={cn(
                        "border-[1px] border-gray-400 px-2 py-4 rounded-lg items-center",
                        className
                    )}
                    onPress={() => onPress(onChange)}
                >
                    <Text>{text ?? "Add a video"}</Text>
                </PressableOpacity>
            )}
            {...fieldProps}
        />
    );
};

export default FileField;
