import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View } from "react-native";
import { z } from "zod";
import React from "react";
import { TextField } from "@/components/core/field";
import DateTimeField from "@/components/core/date-time-field";
import { day } from "@/utils/day-js.util";
import { addClimbSchema } from "@/constants/zod-schema.const";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PressableOpacity from "@/components/core/pressable-opacity";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import DropdownField from "@/components/core/dropdown-field";
import {
    CLIMB_FEEL,
    SKILL_TYPE,
    STEEPNESS,
    WHERE,
} from "@/constants/core.const";
import { CoreTypesUtil } from "@/utils/core-types.util";
import { AscentField } from "@/components/log-new-climb/ascent-field";
import { ClassValue } from "clsx";
import AppText from "@/components/core/app-text";
import ClimbTypeGrade from "@/components/log-new-climb/climb-type-grade";
import { router } from "expo-router";
import VideoField from "@/components/video/video-field";

export type AddClimbSchema = z.infer<typeof addClimbSchema> & {
    videoAssetIds: string[];
};

const DEFAULT_VALUES: AddClimbSchema = {
    videoAssetIds: [],
    typeOfClimb: "Boulder",
    whereDidYouClimb: "Indoor",
    grade: "",
    ascentType: "Flash",
    hasBeenSent: true,
    attempts: 1,
    howDidItFeel: "Solid",
    skill: [],
    steepness: "Overhang",
    // rating: "",
    date: day().toISOString(),
    notes: "",
    // relativeEffort: ""
};

export default function Index() {
    const form = useForm({
        resolver: zodResolver(addClimbSchema),
        defaultValues: DEFAULT_VALUES,
    });
    const { control, handleSubmit, reset } = form;
    const logClimb = useUserClimbRecordStore((store) => store.logClimb);
    const getInferredDropdownItems = CoreTypesUtil.getInferredDropdownItems;

    const saveRecord = (climb: AddClimbSchema) => {
        logClimb(climb);
        reset();
        router.back();
    };

    const selected: ClassValue = "bg-red-500";
    return (
        <KeyboardAwareScrollView className="px-4">
            <View className="gap-8 flex-grow py-safe-offset-20">
                <FormProvider {...form}>
                    <VideoField control={control} name="videoAssetIds" />

                    <ClimbTypeGrade />
                    <DropdownField
                        control={control}
                        name="whereDidYouClimb"
                        title="Where did you climb?"
                        items={getInferredDropdownItems(WHERE)}
                        classNames={{
                            selected,
                        }}
                    />

                    <AscentField />

                    <DropdownField
                        control={control}
                        name="howDidItFeel"
                        title="How did the climb feel?"
                        items={getInferredDropdownItems(CLIMB_FEEL)}
                        classNames={{
                            selected,
                        }}
                    />

                    <DropdownField
                        control={control}
                        name="skill"
                        title="What skill is needed for this climb?"
                        items={getInferredDropdownItems(SKILL_TYPE)}
                        classNames={{
                            selected,
                        }}
                        multi
                    />
                    <DropdownField
                        control={control}
                        name="steepness"
                        title="How steep was this climb?"
                        items={getInferredDropdownItems(STEEPNESS)}
                        classNames={{
                            selected,
                        }}
                    />

                    <DateTimeField title="Date" control={control} name="date" />

                    <TextField
                        control={control}
                        name="notes"
                        title="Notes of the climb."
                        className="h-32"
                        inputProps={{ multiline: true, numberOfLines: 5 }}
                    />

                    <TextField
                        control={control}
                        name="link"
                        title="Links or resources of the climb, like TheCrag links"
                    />

                    <PressableOpacity
                        onPress={handleSubmit(saveRecord)}
                        color={"submit"}
                        rounded={"lg"}
                    >
                        <AppText size={"xs"}>Submit</AppText>
                    </PressableOpacity>
                </FormProvider>
            </View>
        </KeyboardAwareScrollView>
    );
}
