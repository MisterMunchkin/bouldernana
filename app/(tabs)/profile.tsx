import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import GradeSystemPreferences from "@/components/profile/grade-system-preferences";
import ProfileLoader from "@/components/profile/profile-loader";
import Loader from "@/components/ui/loader";
import { useUserClimbRecordStore } from "@/stores/user-climb-record.store";
import { useUserSettingsStore } from "@/stores/user-settings.store";
import { FileSystemUtil } from "@/utils/file-system.util";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {};

const profile = ({}: Props) => {
    const [isFileActionStarted, setIsFileActionStarted] =
        useState<boolean>(false);

    const climbLogs = useUserClimbRecordStore((store) => store.climbs);
    const restoreClimbRecord = useUserClimbRecordStore(
        (store) => store.flashRecordFromJSON
    );

    const { boulderSettings, routeSettings, updateSettings } =
        useUserSettingsStore((store) => store);

    const handleImport = async () => {
        setIsFileActionStarted((prev) => !prev);
        const result = await FileSystemUtil.importJSON();
        if (!result) {
            setIsFileActionStarted((prev) => !prev);
            return;
        }
        const { boulderSettings, routeSettings, climbLogs } = result;

        restoreClimbRecord({ climbLogs });
        updateSettings({
            boulderSettings,
            routeSettings,
        });
        setIsFileActionStarted((prev) => !prev);
    };

    const handleExport = async () => {
        setIsFileActionStarted((prev) => !prev);
        await FileSystemUtil.saveJSON({
            data: JSON.stringify({
                climbLogs,
                boulderSettings,
                routeSettings,
            }),
        });
        setIsFileActionStarted((prev) => !prev);
    };

    return (
        <KeyboardAwareScrollView className="px-4">
            <View className="gap-8 flex-grow py-safe-offset-20">
                {isFileActionStarted ? (
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
                                onPress={handleExport}
                            >
                                <AppText size={"xs"}>Export as Data</AppText>
                            </PressableOpacity>
                            <PressableOpacity
                                twClassName="bg-core-caribbean-current-600"
                                rounded={"lg"}
                                onPress={handleImport}
                            >
                                <AppText size={"xs"}>Import as Data</AppText>
                            </PressableOpacity>
                        </View>
                    </>
                )}
            </View>
        </KeyboardAwareScrollView>
    );
};

export default profile;
