import { ClimbsClass } from "@/classes/climbs.class";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import { ClimbLogUtil } from "@/utils/climb-log.util";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { Fragment, useMemo } from "react";
import { View } from "react-native";
import PressableOpacity from "@/components/core/pressable-opacity";
import AppText from "@/components/core/app-text";

type Props = {
	id: string;
};

const ClimbDetails = ({ id }: Props) => {
	const router = useRouter();

	const { getUserGrade } = useUserGradeOptions();
	const climbInstance = useMemo(() => new ClimbsClass(id), [id]);
	const { climb, colorType } = climbInstance;

	const grade = useMemo(
		() => getUserGrade({ grade: climb?.grade ?? "" }),
		[climb?.grade]
	);

	const climbDetails = ClimbLogUtil.getClimbLogDataStructure(climb);
	return (
		<BottomSheetScrollView className="flex-1">
			<View className="gap-4">
				<View className="flex-row px-4 gap-2 flex-wrap flex-1">
					<PressableOpacity
						onPress={() =>
							router.navigate(
								`/climb-log/${id}/update-ascent-info`
							)
						}
						twClassName="rounded-lg bg-core-vanilla-600 px-4 py-2 items-start"
						haptics={false}
					>
						{climbDetails["block-1"].map(
							({ label, value }, index) => (
								<Fragment key={index}>
									<AppText size={"xs"} twClassName="pb-4">
										{label}
									</AppText>
									<AppText color={"black-50"}>
										{value}
									</AppText>
								</Fragment>
							)
						)}
					</PressableOpacity>
					<PressableOpacity
						onPress={() =>
							router.navigate(
								`/climb-log/${id}/update-climb-feel`
							)
						}
						twClassName="rounded-lg bg-core-nyanza-400 px-4 py-2 flex-1 items-start"
						haptics={false}
					>
						{climbDetails["block-2"].map(
							({ label, value }, index) => (
								<Fragment key={index}>
									<AppText size={"xs"} twClassName="pb-4">
										{label}
									</AppText>
									<AppText color={"black-50"}>
										{value}
									</AppText>
								</Fragment>
							)
						)}
					</PressableOpacity>
				</View>
			</View>
		</BottomSheetScrollView>
	);
};

export default ClimbDetails;
