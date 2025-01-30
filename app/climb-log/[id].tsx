import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import Dividers from "@/components/ui/dividers";
import VideoPreview from "@/components/video-preview";
import { COLORS } from "@/constants/colors.const";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { cn } from "@/utils/cn.util";
import { day, DayJsUtils } from "@/utils/day-js.util";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Dimensions, ScrollView, View } from "react-native";

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
        hasBeenSent,
    } = useUserClimbRecordStore((store) => store.getLog(id)) ?? {};
    const destroyLog = useUserClimbRecordStore((store) => store.destroy);

    const confirmDeleteLog = () =>
        Alert.alert(
            "This action cannot be undone",
            `Are you sure you want to delete this climb? \n\nBrother... please reconsider.`,
            [
                {
                    text: "Nevermind",
                    style: "cancel",
                },
                {
                    text: "Delete Climb",
                    style: "destructive",
                    onPress: () => {
                        router.back();
                        destroyLog(id);
                    },
                },
            ]
        );

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
                {/* TODO: Should componetize this, or make it dynamic somehow */}
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
                        <AppText size={"xxs"} twClassName="pb-4">
                            Has this been sent?
                        </AppText>
                        <AppText color={"black-50"}>
                            {hasBeenSent ? "Sent!" : "Not yet..."}
                        </AppText>
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
                            {skill?.join(", ") || (
                                <AppText
                                    size={"xs"}
                                    color={"black-50"}
                                    twClassName="italic"
                                >
                                    no skill needed
                                </AppText>
                            )}
                        </AppText>
                    </View>
                    <View className="rounded-lg bg-gray-200 px-4 py-2">
                        <AppText size={"xxs"} twClassName="pb-4">
                            Notes
                        </AppText>
                        <AppText size={"xs"}>
                            {notes || (
                                <AppText
                                    size={"xs"}
                                    twClassName="italic"
                                    color={"gray"}
                                >
                                    no notes
                                </AppText>
                            )}
                        </AppText>
                    </View>
                    <View className="rounded-lg bg-gray-200 px-4 py-2">
                        <AppText size={"xxs"} twClassName="pb-4">
                            Link
                        </AppText>
                        <AppText size={"xs"}>
                            {link || (
                                <AppText
                                    size={"xs"}
                                    twClassName="italic"
                                    color={"gray"}
                                >
                                    no link
                                </AppText>
                            )}
                        </AppText>
                    </View>
                    <Dividers text="Danger Zone" color={"danger"} />
                    <PressableOpacity
                        color={"red"}
                        rounded={"lg"}
                        onPress={confirmDeleteLog}
                    >
                        <FontAwesome
                            name="trash"
                            size={30}
                            color={COLORS.core.vanilla[900]}
                        />
                    </PressableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default index;
