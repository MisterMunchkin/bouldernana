import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, View } from "react-native";
import { z } from "zod";
import React from "react";
import { TextField } from "@/components/core/field";
import DateTimeField from "@/components/core/date-time-field";
import { day } from "@/utils/day-js.util";
import VideoField from "@/components/core/video-field";
import {
    addClimbSchema,
    videoSourceSchema,
} from "@/constants/zod-schema.const";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PressableOpacity from "@/components/core/pressable-opacity";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import DropdownField from "@/components/dropdown-field";
import { VGRADES, WHERE } from "@/constants/core.const";
import { CoreTypesUtil } from "@/utils/core-types.util";

export type AddClimbSchema = z.infer<typeof addClimbSchema>;

const DEFAULT_VALUES: AddClimbSchema = {
    videoSource: "",
    typeOfClimb: "Boulder",
    whereDidYouClimb: "Indoor",
    grade: "V0",
    ascentType: "Flash",
    attempts: 0,
    howDidItFeel: "Solid",
    skill: "Athletic",
    steepness: "Overhang",
    // rating: "",
    date: day().toISOString(),
    notes: "",
    // relativeEffort: ""
};

export default function Tab() {
    const bottomTabBarHeight = useBottomTabBarHeight();
    const form = useForm({
        resolver: zodResolver(addClimbSchema),
        defaultValues: DEFAULT_VALUES,
    });
    const { control, handleSubmit, reset } = form;
    const logClimb = useUserClimbRecordStore((store) => store.logClimb);

    const saveRecord = (climb: AddClimbSchema) => {
        logClimb(climb);
        reset();
    };
    return (
        <KeyboardAwareScrollView className="px-4">
            <View
                className="gap-8 flex-grow pt-safe-offset-20 "
                style={{ paddingBottom: bottomTabBarHeight + 20 }}
            >
                <FormProvider {...form}>
                    <VideoField />

                    <DropdownField
                        control={control}
                        name="typeOfClimb"
                        title="Where did you climb?"
                        items={CoreTypesUtil.getInferredDropdownItems(WHERE)}
                    />
                    <DropdownField
                        control={control}
                        name="grade"
                        title="Grade"
                        items={CoreTypesUtil.getInferredDropdownItems(VGRADES)}
                    />

                    <DateTimeField title="Date" control={control} name="date" />

                    <TextField
                        control={control}
                        name="notes"
                        title="Private Notes"
                        className="h-32"
                        inputProps={{ multiline: true, numberOfLines: 5 }}
                    />

                    <PressableOpacity
                        onPress={handleSubmit(saveRecord)}
                        twClassName="px-2 py-4 border-[1px] rounded-lg w-full items-center"
                    >
                        <Text>Submit</Text>
                    </PressableOpacity>
                </FormProvider>
            </View>
        </KeyboardAwareScrollView>
    );
}
