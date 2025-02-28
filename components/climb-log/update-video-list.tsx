import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import VideoField from "../video/video-field";
import { z } from "zod";
import { videoUrisSchema } from "@/constants/zod-schema.const";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import VideoList from "../video/video-list";
import PressableIcon from "@/components/ui/pressable-icon";
import PressableOpacity from "@/components/core/pressable-opacity";
import { cn } from "@/utils/cn.util";
import AppText from "@/components/core/app-text";
import { View } from "react-native";
import { Field } from "../core/field";
import { useImagePicker } from "@/hooks/image-picker.hook";

type Props = {
    videoSources: string[];
    id: string;
};

const schema = z.object({
    ...videoUrisSchema,
});

type UpdateVideoSchema = z.infer<typeof schema>;

const UpdateVideoList = ({ videoSources, id }: Props) => {
    const { pickVideo } = useImagePicker();
    const addVideo = useUserClimbRecordStore((store) => store.addVideo);
    const removeVideo = useUserClimbRecordStore((store) => store.deleteVideo);
    const defaultValues: UpdateVideoSchema = {
        videoUris: videoSources,
    };

    const { control } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    return (
        <View className="w-full gap-2">
            <Field
                control={control}
                name="videoUris"
                render={({ field }) => {
                    return (
                        <VideoList
                            videoUris={videoSources}
                            thumbnailChildrenRender={(uri) => (
                                <PressableIcon
                                    name="remove"
                                    size={18}
                                    color={"white"}
                                    className="absolute top-1 right-1 px-2.5 py-2"
                                    onPress={() =>
                                        removeVideo({ id, videoUri: uri })
                                    }
                                />
                            )}
                            thumbnailHeight={300}
                            ListHeaderComponent={() => (
                                <PressableOpacity
                                    onPress={async () => {
                                        const video = await pickVideo();
                                        if (!video) return;

                                        addVideo({ id, video });
                                    }}
                                    twClassName={cn(
                                        "border-[1px] border-dashed px-8 rounded-lg justify-center h-[300px] mr-4"
                                    )}
                                >
                                    <AppText size={"xs"}>
                                        {"Add a video"}
                                    </AppText>
                                </PressableOpacity>
                            )}
                        />
                    );
                }}
            />
        </View>
    );
};

export default UpdateVideoList;
