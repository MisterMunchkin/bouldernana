import { AddClimbSchema } from "@/app/(tabs)/log-new-climb";
import React, { useEffect } from "react";
import { Control, useFormContext, useWatch } from "react-hook-form";
import DropdownField from "../dropdown-field";
import { CoreTypesUtil } from "@/utils/core-types.util";
import { ASCENT_TYPE } from "@/constants/core.const";
import { TextField } from "../core/field";

export const AscentField = () => {
    const { setValue, control } = useFormContext<AddClimbSchema>();
    const ascentType = useWatch({
        control,
        name: "ascentType",
    });

    useEffect(() => {
        ascentType !== "Project" && setValue("attempts", 1);
    }, [ascentType, setValue]);

    const getInferredDropdownItems = CoreTypesUtil.getInferredDropdownItems;
    return (
        <>
            <DropdownField
                control={control}
                name="ascentType"
                title="Did you send it?"
                items={getInferredDropdownItems(ASCENT_TYPE)}
                classNames={{
                    selected: "bg-red-500",
                }}
            />
            {ascentType === "Project" && (
                <TextField
                    control={control}
                    title="Number of Attempts"
                    name="attempts"
                    inputProps={{
                        keyboardType: "numeric",
                    }}
                />
            )}
        </>
    );
};
