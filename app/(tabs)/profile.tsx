import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import GradeSystemPreferences from "@/components/profile/grade-system-preferences";
import { settingsSchema } from "@/constants/zod-schema.const";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { useUserSettingsStore } from "@/stores/user-settings.store";
import { FileSystemUtil } from "@/utils/file-system.util";
import { useMemo } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {};

const profile = ({}: Props) => {
    const climbLogs = useUserClimbRecordStore((store) => store.climbs);
    const restoreClimbRecord = useUserClimbRecordStore(
        (store) => store.flashRecordFromJSON
    );

    const { boulderSettings, routeSettings, updateSettings } =
        useUserSettingsStore((store) => store);

    const handleImport = async () => {
        const result = await FileSystemUtil.importJSON();
        if (!result) return;
        const { boulderSettings, routeSettings, climbLogs } = result;

        restoreClimbRecord({ climbLogs });
        updateSettings({
            boulderSettings,
            routeSettings,
        });
    };

    const defaultGradePrefereces = useMemo(() => {
        return settingsSchema.parse({
            boulderSettings,
            routeSettings,
        });
    }, [boulderSettings, routeSettings]);

    return (
        <KeyboardAwareScrollView className="px-4">
            <View className="gap-8 flex-grow py-safe-offset-20">
                <GradeSystemPreferences
                    defaultValues={defaultGradePrefereces}
                />
                <View className="gap-4">
                    <PressableOpacity
                        color={"submit"}
                        rounded={"lg"}
                        onPress={() =>
                            FileSystemUtil.saveJSON({
                                data: JSON.stringify({
                                    climbLogs,
                                    boulderSettings,
                                    routeSettings,
                                }),
                            })
                        }
                    >
                        <AppText size={"xs"}>Export as JSON</AppText>
                    </PressableOpacity>
                    <PressableOpacity
                        twClassName="bg-core-caribbean-current-600"
                        rounded={"lg"}
                        onPress={handleImport}
                    >
                        <AppText size={"xs"}>Import as JSON</AppText>
                    </PressableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default profile;
