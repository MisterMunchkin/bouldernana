import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import GradeSystemPreferences from "@/components/profile/grade-system-preferences";
import ProfileLoader from "@/components/profile/profile-loader";
import Loader from "@/components/ui/loader";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { useUserSettingsStore } from "@/stores/user-settings.store";
import { FileSystemUtil } from "@/utils/file-system.util";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {};

const profile = ({}: Props) => {
    const [isImporting, setIsImporting] = useState<boolean>(false);

    const climbLogs = useUserClimbRecordStore((store) => store.climbs);
    const restoreClimbRecord = useUserClimbRecordStore(
        (store) => store.flashRecordFromJSON
    );

    const { boulderSettings, routeSettings, updateSettings } =
        useUserSettingsStore((store) => store);

    const handleImport = async () => {
        setIsImporting((prev) => !prev);
        const result = await FileSystemUtil.importJSON();
        if (!result) {
            setIsImporting((prev) => !prev);
            return;
        }
        const { boulderSettings, routeSettings, climbLogs } = result;

        restoreClimbRecord({ climbLogs });
        updateSettings({
            boulderSettings,
            routeSettings,
        });
        setIsImporting((prev) => !prev);
    };

    return (
        <KeyboardAwareScrollView className="px-4">
            <View className="gap-8 flex-grow py-safe-offset-20">
                {isImporting ? (
                    <ProfileLoader />
                ) : (
                    <>
                        <GradeSystemPreferences
                            defaultValues={{
                                boulderSettings,
                                routeSettings,
                            }}
                            onSubmit={updateSettings}
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
                    </>
                )}
            </View>
        </KeyboardAwareScrollView>
    );
};

export default profile;
