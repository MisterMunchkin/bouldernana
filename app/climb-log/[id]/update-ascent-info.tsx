import { addClimbSchema } from "@/constants/zod-schema.const";
import { router, useLocalSearchParams } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { ClimbLogLocalParams } from ".";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AscentField } from "@/components/log-new-climb/ascent-field";
import PressableOpacity from "@/components/core/pressable-opacity";
import { z } from "zod";
import AppText from "@/components/core/app-text";
import { ScrollView, View } from "react-native";
import { cn } from "@/utils/cn.util";

const schema = addClimbSchema.pick({
    ascentType: true,
    attempts: true,
    hasBeenSent: true,
});
type Props = {};

const UpdateAscentInfo = ({}: Props) => {
    const { id } = useLocalSearchParams<ClimbLogLocalParams>();
    const climbLog = useUserClimbRecordStore((store) => store.getLog(id));
    const updateLog = useUserClimbRecordStore((store) => store.updateClimb);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: schema.parse(climbLog),
    });
    const { handleSubmit } = form;

    const updateRecord = (update: z.infer<typeof schema>) => {
        updateLog(id, update);
        router.back();
    };

    return (
        <ScrollView className={cn("flex-1")}>
            <View className="pt-safe-offset-4 gap-6 px-4">
                <FormProvider {...form}>
                    <AscentField />

                    <PressableOpacity
                        onPress={handleSubmit(updateRecord)}
                        color={"submit"}
                        rounded={"lg"}
                    >
                        <AppText size={"xs"}>Submit</AppText>
                    </PressableOpacity>
                </FormProvider>
            </View>
        </ScrollView>
    );
};

export default UpdateAscentInfo;
