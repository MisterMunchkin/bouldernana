import AppText, { textVariants } from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import Dividers from "@/components/ui/dividers";
import VideoPreview from "@/components/video-preview";
import { COLORS } from "@/constants/colors.const";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { ClimbLogUtil } from "@/utils/climb-log.util";
import { cn } from "@/utils/cn.util";
import { day, DayJsUtils } from "@/utils/day-js.util";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { ComponentProps, Fragment, ReactNode } from "react";
import { Alert, Dimensions, ScrollView, View } from "react-native";

type Props = {};

type LocalParams = {
    id: string;
};
const index = ({}: Props) => {
    const { id } = useLocalSearchParams<LocalParams>();
    const climbLog = useUserClimbRecordStore((store) => store.getLog(id));
    const { date, grade, whereDidYouClimb, typeOfClimb, videoSource } =
        climbLog ?? {};
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

    const climbDetails = ClimbLogUtil.getClimbLogDataStructure(climbLog);

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
                    <FontAwesome name="pencil-square-o" size={32} />
                </View>
                <VideoPreview
                    videoSource={videoSource ?? ""}
                    width={Dimensions.get("screen").width - 16}
                    style={{ borderRadius: 12, alignSelf: "center" }}
                />
                {/* TODO: Should componetize this, or make it dynamic somehow */}
                <View className="flex-row px-4 gap-2 flex-wrap flex-1">
                    <View className="rounded-lg bg-core-vanilla-600 px-4 py-2 ">
                        {climbDetails["block-1"].map(
                            ({ label, value }, index) => (
                                <Fragment key={index}>
                                    <AppText size={"xxs"} twClassName="pb-4">
                                        {label}
                                    </AppText>
                                    <AppText color={"black-50"}>
                                        {value}
                                    </AppText>
                                </Fragment>
                            )
                        )}
                    </View>
                    <View className="rounded-lg bg-core-nyanza-400 px-4 py-2 flex-1 ">
                        {climbDetails["block-2"].map(
                            ({ label, value }, index) => (
                                <Fragment key={index}>
                                    <AppText size={"xxs"} twClassName="pb-4">
                                        {label}
                                    </AppText>
                                    <AppText color={"black-50"}>
                                        {value}
                                    </AppText>
                                </Fragment>
                            )
                        )}
                    </View>
                </View>
                <View className="flex-col px-4 gap-4">
                    {climbDetails["last-block"].map(
                        ({ bgColor, label, noData, value, size }, index) => (
                            <Fragment key={index}>
                                <View
                                    className={cn(
                                        "rounded-lg px-4 py-2",
                                        bgColor
                                    )}
                                >
                                    <AppText size={"xxs"} twClassName={"pb-4"}>
                                        {label}
                                    </AppText>
                                    <AppText
                                        color={"black-50"}
                                        {...(size && { size })}
                                    >
                                        {value || noData}
                                    </AppText>
                                </View>
                            </Fragment>
                        )
                    )}
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
