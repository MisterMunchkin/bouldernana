import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import GradeSystemPreferences from "@/components/profile/grade-system-preferences";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {};

const profile = ({}: Props) => {
    return (
        <KeyboardAwareScrollView className="px-4">
            <View className="gap-8 flex-grow py-safe-offset-20">
                <GradeSystemPreferences />
                <View className="gap-4">
                    <PressableOpacity color={"submit"} rounded={"lg"}>
                        <AppText size={"xs"}>Export as JSON</AppText>
                    </PressableOpacity>
                    <AppText align={"center"} size={"xxs"} twClassName="italic">
                        What is JSON?
                    </AppText>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default profile;
