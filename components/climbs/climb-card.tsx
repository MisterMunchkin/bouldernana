import { LoggedClimb } from "@/stores/user-climb-record.store";
import { View } from "react-native";
import { Image } from "expo-image";
import AppText from "../core/app-text";
import { day, DayJsUtils } from "@/utils/day-js.util";
import PressableOpacity from "../core/pressable-opacity";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { MediaLibraryUtil } from "@/utils/media-library.util";

type Props = {
    displayedGrade: string;
} & Pick<LoggedClimb, "date" | "videoAssetIds" | "id">;

const ClimbCard = ({ date, displayedGrade, videoAssetIds, id }: Props) => {
    const [thumbnail, setThumbnail] = useState<string>("");

    useEffect(() => {
        const generate = async () => {
            const video = videoAssetIds?.at(0);
            if (!video) return;

            const thumbnailResult = await MediaLibraryUtil.getThumbnail(video);
            setThumbnail(
                thumbnailResult?.uri ??
                    require("@/assets/images/default-thumbnail.jpg")
            );
        };

        generate();
    }, []);

    return (
        <PressableOpacity
            twClassName="flex-col flex-1"
            onPress={() => router.push(`/climb-log/${id}`)}
        >
            <Image
                source={thumbnail}
                contentFit="cover"
                style={{
                    width: "100%",
                    height: 250,
                    zIndex: -50,
                    borderRadius: 12,
                }}
            />
            <View className="w-full py-2 flex-col items-start gap-2 px-4">
                <AppText size={"xs"}>{displayedGrade}</AppText>
                <AppText size={"xxs"}>
                    {day(date).format(DayJsUtils.DEFAULT_FORMAT)}
                </AppText>
            </View>
        </PressableOpacity>
    );
};

export default ClimbCard;
