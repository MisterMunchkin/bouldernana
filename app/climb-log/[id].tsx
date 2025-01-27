import AppText from "@/components/core/app-text";
import VideoPreview from "@/components/video-preview";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { cn } from "@/utils/cn.util";
import { day, DayJsUtils } from "@/utils/day-js.util";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";

type Props = {};

type LocalParams = {
    id: string;
};
const index = ({}: Props) => {
    const { id } = useLocalSearchParams<LocalParams>();
    const {
        videoSource,
        date,
        grade,
        typeOfClimb,
        whereDidYouClimb,
        ascentType,
        attempts,
        skill,
        steepness,
        howDidItFeel,
        notes,
        link,
    } = useUserClimbRecordStore((store) => store.getLog(id)) ?? {};

    return (
        <ScrollView className={cn("flex-1")}>
            <View className="pt-safe-offset-4 pb-safe-offset-4 gap-4">
                <View className="px-4 gap-2">
                    <AppText size={"xxs"} color={"black-50"}>
                        {day(date).format(DayJsUtils.DEFAULT_FORMAT)}
                    </AppText>
                    <AppText
                        twClassName="font-semibold text-core-caribbean-current-300"
                        size={"sm"}
                    >{`${grade} ${whereDidYouClimb} ${typeOfClimb}`}</AppText>
                </View>
                <VideoPreview
                    videoSource={videoSource ?? ""}
                    width={Dimensions.get("screen").width - 16}
                    style={{ borderRadius: 12, alignSelf: "center" }}
                />
                <View className="flex-row px-4 gap-2 flex-wrap flex-1">
                    <View className="rounded-lg bg-core-vanilla-600 px-4 py-2 ">
                        <AppText size={"xxs"} twClassName="pb-4">
                            Ascent Type
                        </AppText>
                        <AppText color={"black-50"}>{ascentType} </AppText>

                        <AppText size={"xxs"} twClassName="pb-4">
                            Attemps
                        </AppText>
                        <AppText color={"black-50"}>{attempts}</AppText>
                    </View>
                    <View className="rounded-lg bg-core-nyanza-400 px-4 py-2 flex-1 ">
                        <AppText size={"xxs"} twClassName="pb-4">
                            Steepness
                        </AppText>
                        <AppText color={"black-50"}>{steepness}</AppText>
                        <AppText size={"xxs"} twClassName="pb-4">
                            How did it feel?
                        </AppText>
                        <AppText color={"black-50"}>{howDidItFeel}</AppText>
                    </View>
                </View>
                <View className="flex-col px-4 gap-4">
                    <View className="rounded-lg bg-core-imperial-red-800 px-4 py-2">
                        <AppText size={"xxs"} twClassName={"pb-4"}>
                            Skills Needed
                        </AppText>
                        <AppText color={"black-50"}>
                            {skill?.join(", ")}
                        </AppText>
                    </View>
                    <View className="rounded-lg bg-gray-200 px-4 py-2">
                        <AppText size={"xxs"} twClassName="pb-4">
                            Notes
                        </AppText>
                        <AppText size={"xs"}>{notes ?? "no notes"}</AppText>
                    </View>
                    <View className="rounded-lg bg-gray-200 px-4 py-2">
                        <AppText size={"xxs"} twClassName="pb-4">
                            Link
                        </AppText>
                        <AppText size={"xs"}>{link ?? "no link"}</AppText>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default index;
