import AppText from "@/components/core/app-text";
import DropdownField from "@/components/core/dropdown-field";
import {
    BoulderGradeSystemEnum,
    RouteGradeSystemEnum,
    settingsSchema,
} from "@/constants/zod-schema.const";
import { useUserSettingsStore } from "@/stores/user-settings.store";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {};

const profile = ({}: Props) => {
    //NOTE: Causing infinite looping
    // const { boulderSettings, routeSettings } = useUserSettingsStore(
    //     (store) => ({
    //         boulderSettings: store.boulderSettings,
    //         routeSettings: store.routeSettings,
    //     })
    // );
    const form = useForm({
        resolver: zodResolver(settingsSchema),
        defaultValues: settingsSchema.parse({
            // routeGradeSystem: routeSettings.gradeSystem,
            // boulderGradeSystem: boulderSettings.gradeSystem,
        }),
    });

    const { control } = form;

    const boulderGradeOptions = BoulderGradeSystemEnum.options;
    const routeGradeOptions = RouteGradeSystemEnum.options;
    return (
        <KeyboardAwareScrollView className="px-4">
            <View className="gap-8 flex-grow py-safe-offset-20">
                <FormProvider {...form}>
                    <DropdownField
                        control={control}
                        name="boulderGradeSystem"
                        title="Boulder Grading System"
                        items={boulderGradeOptions.map((value) => ({
                            label: value,
                            value,
                        }))}
                    />
                    <DropdownField
                        control={control}
                        name="routeGradeSystem"
                        title="Route Grading System"
                        items={routeGradeOptions.map((value) => ({
                            label: value,
                            value,
                        }))}
                    />
                </FormProvider>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default profile;
