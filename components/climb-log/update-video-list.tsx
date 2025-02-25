import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import VideoField from "../video/video-field";
import { z } from "zod";
import { videoSourceSchema } from "@/constants/zod-schema.const";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

type Props = {
    videoSources: string[];
    id: string;
};

const schema = z.object({
    ...videoSourceSchema,
});

type UpdateVideoSchema = z.infer<typeof schema>;

const UpdateVideoList = ({ videoSources, id }: Props) => {
    const updateVideos = useUserClimbRecordStore((store) => store.setVideos);
    const defaultValues: UpdateVideoSchema = {
        videoSources,
    };

    const { control } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const videoSourcesChanges = useWatch({
        control,
        name: "videoSources",
    });

    useEffect(() => {
        updateVideos({ id, videoSources: videoSourcesChanges });
    }, [videoSourcesChanges]);

    return <VideoField control={control} name="videoSources" />;
};

export default UpdateVideoList;
