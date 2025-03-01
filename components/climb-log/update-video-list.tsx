import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { addClimbSchema } from "@/constants/zod-schema.const";
import VideoField from "../video/video-field";

type Props = {
    videoAssetIds: string[];
    id: string;
};

const schema = addClimbSchema.pick({ videoAssetIds: true });

type UpdateVideoSchema = z.infer<typeof schema>;

const UpdateVideoList = ({ videoAssetIds, id }: Props) => {
    const setVideos = useUserClimbRecordStore((store) => store.setVideos);
    const defaultValues: UpdateVideoSchema = {
        videoAssetIds,
    };

    const { control } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    const videoSourcesChanges = useWatch({
        control,
        name: "videoAssetIds",
    });

    useEffect(() => {
        setVideos({ id, videoAssetIds: videoSourcesChanges });
    }, [videoSourcesChanges, id, setVideos]);

    return <VideoField control={control} name="videoAssetIds" />;
};

export default UpdateVideoList;
