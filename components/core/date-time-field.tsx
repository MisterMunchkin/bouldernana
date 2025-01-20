import { FieldValues } from "react-hook-form";
import { Field, FieldProps } from "./field";
import React, { ComponentProps, useCallback, useRef, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ClassValues, cn } from "@/utils/cn.util";
import dayjs from "dayjs";
import Modal from "./modal";
import { Text, TouchableOpacity } from "react-native";
import { day, DayJsUtils } from "@/utils/day-js.util";

type Props = {
    classNames?: ClassValues<"field" | "text">;
};
const DateTimeField = <TFieldValues extends FieldValues>({
    classNames,
    ...fieldProps
}: Omit<FieldProps<TFieldValues>, "render" | "className"> & Props) => {
    const { field: fieldClassName, text: textClassName } = classNames ?? {};
    const [show, setShow] = useState<boolean>(false);

    return (
        <Field
            render={({ field: { onChange, value } }) => (
                <>
                    <TouchableOpacity
                        className={cn(
                            "border-[1px]  border-gray-400  px-2 py-4 rounded-lg items-center",
                            fieldClassName
                        )}
                        onPress={() => setShow(true)}
                    >
                        <Text className={cn("text-black", textClassName)}>
                            {day(value).format(DayJsUtils.DEFAULT_FORMAT)}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={show}
                        date={day(value).toDate()}
                        mode="datetime"
                        pickerStyleIOS={{ marginHorizontal: "auto" }}
                        onConfirm={(date) => {
                            onChange(day(date).toISOString());
                            setShow(false);
                        }}
                        onCancel={() => setShow(false)}
                    />
                </>
            )}
            {...fieldProps}
        />
    );
};

export default DateTimeField;
