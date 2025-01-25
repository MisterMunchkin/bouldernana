import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, View } from "react-native";
import { z } from "zod";
import React from "react";
import { DropDownField, TextField } from "@/components/core/field";
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

export type AddClimbSchema = z.infer<typeof addClimbSchema>;

export default function Tab() {
    const bottomTabBarHeight = useBottomTabBarHeight();
    const form = useForm({
        resolver: zodResolver(addClimbSchema),
        defaultValues: {
            grade: "V0",
            description: "",
            date: day().toISOString(),
            notes: "",
            videoSource: "",
        },
    });
    const { control, handleSubmit } = form;
    const logClimb = useUserClimbRecordStore((store) => store.logClimb);

    const saveRecord = (climb: AddClimbSchema) => logClimb(climb);
    return (
        <KeyboardAwareScrollView className="px-4">
            <View
                className="gap-8 flex-grow pt-safe-offset-20 "
                style={{ paddingBottom: bottomTabBarHeight + 20 }}
            >
                <FormProvider {...form}>
                    {/* Need to stop using the drop down, find a better one */}
                    <DropDownField
                        control={control}
                        name="grade"
                        title="Grade"
                        items={[
                            {
                                label: "V0",
                                value: "V0",
                            },
                            {
                                label: "V1",
                                value: "V1",
                            },
                            {
                                label: "V2",
                                value: "V2",
                            },
                            {
                                label: "V3",
                                value: "V3",
                            },
                        ]}
                    />
                    <TextField
                        name="description"
                        title="Description"
                        control={control}
                        className="h-32"
                        inputProps={{ multiline: true, numberOfLines: 5 }}
                    />

                    <DateTimeField control={control} name="date" />
                    <TextField
                        control={control}
                        name="notes"
                        title="Notes"
                        className="h-32"
                        inputProps={{ multiline: true, numberOfLines: 5 }}
                    />
                    <VideoField />

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
