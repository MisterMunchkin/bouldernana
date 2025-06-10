import { ClimbsClass } from "@/classes/climbs.class";
import UpdateVideoList from "@/components/climb-log/update-video-list";
import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import Dividers from "@/components/ui/dividers";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import { ClimbLogUtil } from "@/utils/climb-log.util";
import { cn } from "@/utils/cn.util";
import { day, DayJsUtils } from "@/utils/day-js.util";
import { TailwindUtil } from "@/utils/tailwind.util";
import { FontAwesome } from "@expo/vector-icons";
import { observer } from "@legendapp/state/react";
import { router, useLocalSearchParams } from "expo-router";
import { Fragment, useMemo } from "react";
import { Alert, ScrollView, View } from "react-native";

type Props = {};

export type ClimbLogLocalParams = {
	id: string;
};
const index = observer(({}: Props) => {
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();
	const climbLog = ClimbsClass.get(id);
	const { date, whereDidYouClimb, typeOfClimb, videoAssetIds } =
		climbLog ?? {};
	const destroyLog = ClimbsClass.destroy;
	const { getUserGrade } = useUserGradeOptions();

	const confirmDeleteLog = () =>
		Alert.alert(
			"This action cannot be undone",
			`Are you sure you want to delete this climb? \n\nBrother... please reconsider.`,
			[
				{
					text: "Nevermind",
					style: "cancel",
				},
				{
					text: "Delete Climb",
					style: "destructive",
					onPress: () => {
						router.back();
						destroyLog(id);
					},
				},
			]
		);

	const grade = useMemo(
		() => getUserGrade({ grade: climbLog?.grade ?? "" }),
		[climbLog?.grade]
	);

	const climbDetails = ClimbLogUtil.getClimbLogDataStructure(climbLog);

	return (
		<ScrollView className={cn("flex-1")}>
			<View className="pt-safe-offset-4 pb-safe-offset-4 gap-4">
				<PressableOpacity
					onPress={() =>
						router.navigate(`/climb-log/${id}/update-header`)
					}
					twClassName="items-start pt-0 pb-0 px-4"
					haptics={false}
				>
					<AppText size={"xs"} color={"black-50"}>
						{day(date).format(DayJsUtils.DEFAULT_FORMAT)}
					</AppText>
					<View className="flex-row items-start gap-4 w-full justify-between">
						<AppText
							twClassName="font-semibold text-core-caribbean-current-300"
							size={"sm"}
						>
							{`${
								grade && grade + "\n"
							}${whereDidYouClimb} ${typeOfClimb}`}
						</AppText>
						<FontAwesome
							name="pencil-square-o"
							size={32}
							color={TailwindUtil.getCoreColor(
								"amethyst-smoke.100"
							)}
						/>
					</View>
				</PressableOpacity>
				{/* TODO: Hide inside Subscriber Toggle */}
				<UpdateVideoList id={id} videoAssetIds={videoAssetIds ?? []} />
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
				<View className="flex-col px-4 gap-4">
					{climbDetails["last-block"].map(
						(
							{
								bgColor,
								label,
								noData,
								value,
								size,
								getHref: getHref,
							},
							index
						) => (
							<PressableOpacity
								onPress={() =>
									getHref && router.navigate(getHref(id))
								}
								twClassName={cn(
									"rounded-lg px-4 py-2 items-start",
									label === "Skills Needed"
										? "bg-core-imperial-red-800"
										: "bg-gray-200"
								)}
								key={index}
								haptics={false}
							>
								<AppText size={"xs"} twClassName={"pb-4"}>
									{label}
								</AppText>
								<AppText
									color={"black-50"}
									{...(size && { size })}
								>
									{value || noData}
								</AppText>
							</PressableOpacity>
						)
					)}
					<Dividers text="Danger Zone" color={"danger"} />
					<PressableOpacity
						color={"red"}
						rounded={"lg"}
						onPress={confirmDeleteLog}
					>
						<FontAwesome
							name="trash"
							size={30}
							color={TailwindUtil.getCoreColor("white-rock.400")}
						/>
					</PressableOpacity>
				</View>
			</View>
		</ScrollView>
	);
});

export default index;
