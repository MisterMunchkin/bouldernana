import DropdownField from "@/components/core/dropdown-field";
import {
    BoulderGradeSystemEnum,
    RouteGradeSystemEnum,
    settingsSchema,
} from "@/constants/zod-schema.const";
import { useUserSettingsStore } from "@/stores/user-settings.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClassValue } from "clsx";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { z } from "zod";

type Props = {};

const profile = ({}: Props) => {
    const boulderSettings = useUserSettingsStore(
        (store) => store.boulderSettings
    );
    const routeSettings = useUserSettingsStore((store) => store.routeSettings);
    const updateSettings = useUserSettingsStore(
        (store) => store.updateSettings
    );

    const form = useForm({
        resolver: zodResolver(settingsSchema),
        defaultValues: settingsSchema.parse({
            boulderSettings,
            routeSettings,
        }),
    });

    const { control, watch, handleSubmit } = form;

    const onSubmit = (values: z.infer<typeof settingsSchema>) =>
        updateSettings(values);

    useEffect(() => {
        const watchSubscribe = watch(() => handleSubmit(onSubmit)());
        return () => watchSubscribe.unsubscribe();
    }, [watch, handleSubmit]);

    const boulderGradeOptions = BoulderGradeSystemEnum.options;
    const routeGradeOptions = RouteGradeSystemEnum.options;
    const selected: ClassValue = "bg-red-500";
    return (
        <KeyboardAwareScrollView className="px-4">
            <View className="gap-8 flex-grow py-safe-offset-20">
                <FormProvider {...form}>
                    <DropdownField
                        control={control}
                        name="boulderSettings.gradeSystem"
                        title="Boulder Grading System"
                        items={boulderGradeOptions.map((value) => ({
                            label: value,
                            value,
                        }))}
                        classNames={{
                            selected,
                        }}
                    />
                    <DropdownField
                        control={control}
                        name="routeSettings.gradeSystem"
                        title="Route Grading System"
                        items={routeGradeOptions.map((value) => ({
                            label: value,
                            value,
                        }))}
                        classNames={{
                            selected,
                        }}
                    />
                </FormProvider>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default profile;
