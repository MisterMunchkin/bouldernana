import {
    BoulderGradeSystemEnum,
    RouteGradeSystemEnum,
    settingsSchema,
} from "@/constants/zod-schema.const";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DropdownField from "@/components/core/dropdown-field";
import { ClassValue } from "clsx";

type Props = {
    defaultValues: z.infer<typeof settingsSchema>;
    onSubmit: (values: z.infer<typeof settingsSchema>) => void;
};

const GradeSystemPreferences = ({ defaultValues, onSubmit }: Props) => {
    const form = useForm({
        resolver: zodResolver(settingsSchema),
        defaultValues: { ...defaultValues },
    });

    const { control, watch, handleSubmit } = form;

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
