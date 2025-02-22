import { ClimbSchema, LoggedClimb } from "@/stores/user-climb-record.store";
import { View } from "react-native";
import { useCreateThumbnail } from "@/hooks/create-thumbnail.hook";
import { Image } from "expo-image";
import AppText from "../core/app-text";
import { day, DayJsUtils } from "@/utils/day-js.util";
import PressableOpacity from "../core/pressable-opacity";
import { router } from "expo-router";

type Props = {
    displayedGrade: string;
} & Pick<LoggedClimb, "date" | "videoSources" | "id">;

const ClimbCard = ({ date, displayedGrade, videoSources, id }: Props) => {
    const { thumbnail } = useCreateThumbnail({
        videoSource: videoSources?.at(0) ?? "",
    });

    return (
        <PressableOpacity
            twClassName="flex-col flex-1"
            onPress={() => router.push(`/climb-log/${id}`)}
        >
            <Image
                source={
                    thumbnail?.uri ??
                    require("@/assets/images/default-thumbnail.jpg")
                }
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
