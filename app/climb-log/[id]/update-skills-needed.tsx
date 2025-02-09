import { addClimbSchema } from "@/constants/zod-schema.const";
import { router, useLocalSearchParams } from "expo-router";
import { ClimbLogLocalParams } from ".";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import { cn } from "@/utils/cn.util";
import { ScrollView, View } from "react-native";
import DropdownField from "@/components/core/dropdown-field";
import { CoreTypesUtil } from "@/utils/core-types.util";
import { SKILL_TYPE } from "@/constants/core.const";
import { ClassValue } from "clsx";

const schema = addClimbSchema.pick({
    skill: true,
});

type Props = {};

const UpdateSkillsNeeded = ({}: Props) => {
    const { id } = useLocalSearchParams<ClimbLogLocalParams>();
    const climbLog = useUserClimbRecordStore((store) => store.getLog(id));
    const updateLog = useUserClimbRecordStore((store) => store.updateClimb);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: schema.parse(climbLog),
    });
    const { handleSubmit, control } = form;

    const updateRecord = (update: z.infer<typeof schema>) => {
        updateLog(id, update);
        router.back();
    };

    const selected: ClassValue = "bg-red-500";
    return (
        <ScrollView className={cn("flex-1")}>
            <View className="pt-safe-offset-4 gap-6 px-4">
                <DropdownField
                    control={control}
                    name="skill"
                    title="What skill is needed for this climb?"
                    items={CoreTypesUtil.getInferredDropdownItems(SKILL_TYPE)}
                    classNames={{
                        selected,
                    }}
                    multi
                />
                <PressableOpacity
                    onPress={handleSubmit(updateRecord)}
                    color={"submit"}
                    rounded={"lg"}
                >
                    <AppText size={"xs"}>Submit</AppText>
                </PressableOpacity>
            </View>
        </ScrollView>
    );
};

export default UpdateSkillsNeeded;
