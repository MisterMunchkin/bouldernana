import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { z } from "zod";
import DropDownPicker from "react-native-dropdown-picker";
import React from "react";
import { DropDownField, TextField } from "@/components/core/field";
import DateTimeField from "@/components/core/date-time-field";
import dayjs from "dayjs";
import { day, DayJsUtils } from "@/utils/day-js.util";

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
            // notes: "",
        },
    });

    return (
        // <ScrollView>
        <KeyboardAvoidingView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            className="px-4"
        >
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
                inputProps={{ multiline: true }}
            />

            <DateTimeField control={control} name="date" />
        </KeyboardAvoidingView>
        // {/* </ScrollView> */}
    );
}
