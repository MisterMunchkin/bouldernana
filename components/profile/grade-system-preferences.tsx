import {
    BoulderGradeSystemEnum,
    RouteGradeSystemEnum,
    settingsSchema,
} from "@/constants/zod-schema.const";
import { useUserSettingsStore } from "@/stores/user-settings.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DropdownField from "@/components/core/dropdown-field";
import { ClassValue } from "clsx";

type Props = {
    defaultValues: z.infer<typeof settingsSchema>;
};

const GradeSystemPreferences = ({ defaultValues }: Props) => {
    const updateSettings = useUserSettingsStore(
        (store) => store.updateSettings
    );
    const form = useForm({
        resolver: zodResolver(settingsSchema),
        defaultValues,
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
    );
};

export default GradeSystemPreferences;
