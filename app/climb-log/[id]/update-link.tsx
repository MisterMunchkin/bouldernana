import { addClimbSchema } from "@/constants/zod-schema.const";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { router, useLocalSearchParams } from "expo-router";
import { ClimbLogLocalParams } from ".";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScrollView, View } from "react-native";
import { cn } from "@/utils/cn.util";
import { TextField } from "@/components/core/field";
import PressableOpacity from "@/components/core/pressable-opacity";
import AppText from "@/components/core/app-text";

const schema = addClimbSchema.pick({
    link: true,
});

type Props = {};

const UpdateLink = ({}: Props) => {
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

    return (
        <ScrollView className={cn("flex-1")}>
            <View className="pt-safe-offset-4 gap-6 px-4">
                <FormProvider {...form}>
                    <TextField
                        control={control}
                        name="link"
                        title="Links or resources of the climb, like TheCrag links"
                        inputProps={{ autoCapitalize: "none" }}
                    />

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

export default UpdateLink;
