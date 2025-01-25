import { FieldValues, useFormContext, useWatch } from "react-hook-form";
import { View } from "react-native";
import FileField from "./file-field";
import { cn } from "@/utils/cn.util";
import PressableOpacity from "./pressable-opacity";
import VideoThumbnailView from "../video-thumbnail-view";
import VideoPreview from "../video-preview";
import { useEffect } from "react";

const VideoField = () => {
    const { control } = useFormContext<{ videoSource: string }>();
    const videoSourceWatch = useWatch({
        control,
        name: "videoSource",
    });

    return (
        <View className="w-full gap-2">
            <FileField
                className={cn("border-dashed")}
                control={control}
                name="videoSource"
            />
            {videoSourceWatch && (
                <VideoPreview
                    videoSource={videoSourceWatch}
                    style={{ borderRadius: 12 }}
                />
            )}
        </View>
    );
};

export default VideoField;
