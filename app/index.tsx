import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { z } from "zod";
import React from "react";
import { DropDownField, TextField } from "@/components/core/field";
import DateTimeField from "@/components/core/date-time-field";
import { day, DayJsUtils } from "@/utils/day-js.util";
import KeyboardView from "@/components/higher-order/keyboard-view";

/**
 * An app that allows climbers to track there progress by grades.
 *
 * inputs:
 * grade - options
 * description - string
 * date - prefilled to current date
 * notes - string
 * video - blob
 *
 */

const addClimbSchema = z.object({
    grade: z.string(),
    description: z.string(),
    date: z.date(),
    notes: z.string(),
});
export default function Index() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addClimbSchema),
        defaultValues: {
            grade: "V0",
            description: "",
            date: day().toISOString(),
            notes: "",
        },
    });

    return (
        <KeyboardView className="px-4" contentContainerClassName="gap-8">
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

            <TouchableOpacity className="px-2 py-4 border-[1px] rounded-lg w-full items-center">
                <Text>Submit</Text>
            </TouchableOpacity>
        </KeyboardView>
    );
}
