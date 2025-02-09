import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { ClimbLogLocalParams } from "../[id]";
import AppText from "@/components/core/app-text";
import { ScrollView, View } from "react-native";
import { cn } from "@/utils/cn.util";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { addClimbSchema } from "@/constants/zod-schema.const";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { day } from "@/utils/day-js.util";
import DropdownField from "@/components/core/dropdown-field";
import DateTimeField from "@/components/core/date-time-field";
import { CLIMB_TYPE, VGRADES, WHERE } from "@/constants/core.const";
import { ClassValue } from "clsx";
import { CoreTypesUtil } from "@/utils/core-types.util";
import { useEffect } from "react";

const schema = addClimbSchema.pick({
    date: true,
    grade: true,
    typeOfClimb: true,
    whereDidYouClimb: true,
});

type Props = {};

const UpdateHeader = ({}: Props) => {
    const { id } = useLocalSearchParams<ClimbLogLocalParams>();
    const climbLog = useUserClimbRecordStore((store) => store.getLog(id));
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: schema.parse(climbLog),
    });

    const { control } = form;

    const selected: ClassValue = "bg-red-500";
    return (
        <ScrollView className={cn("flex-1")}>
            <View className="pt-safe-offset-4">
                <DateTimeField control={control} name="date" title="Date" />
                <DropdownField
                    control={control}
                    name="grade"
                    title="Grade"
                    items={CoreTypesUtil.getInferredDropdownItems(VGRADES)}
                    classNames={{
                        selected,
                    }}
                />
                <DropdownField
                    control={control}
                    name="whereDidYouClimb"
                    title="Where did you climb?"
                    items={CoreTypesUtil.getInferredDropdownItems(WHERE)}
                    classNames={{
                        selected,
                    }}
                />
                <DropdownField
                    control={control}
                    name="typeOfClimb"
                    title="What did you climb?"
                    items={CoreTypesUtil.getInferredDropdownItems(CLIMB_TYPE)}
                    classNames={{
                        selected,
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default UpdateHeader;
