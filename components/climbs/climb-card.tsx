import { View } from "react-native";
import AppText from "../core/app-text";
import { day } from "@/utils/day-js.util";
import PressableOpacity from "../core/pressable-opacity";
import { router } from "expo-router";
import { LoggedClimb } from "@/types/core.type";
import { cn } from "@/utils/cn.util";
import { ClimbsClass } from "@/classes/climbs.class";
import ContextMenuWrapper from "../ui/context-menu-wrapper";
import VideoThumbnailView from "../video/video-thumbnail-view";
import { Computed, Show, use$, useComputed } from "@legendapp/state/react";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";

type Props = Pick<LoggedClimb, "id">;

const ClimbCard = ({ id }: Props) => {
	const climbInstance$ = use$(new ClimbsClass(id));
	const { getUserGrade } = useUserGradeOptions();

	const {
		climb: { typeOfClimb, steepness, grade, name, skill, date },
	} = climbInstance$;
	const displayedGrade = useComputed(() =>
		getUserGrade({
			grade: grade.get(),
		})
	);

	return (
		<ContextMenuWrapper
			preview={
				<Computed>
					{() => (
						<VideoThumbnailView
							videoAssetId={
								climbInstance$.climb.videoAssetIds
									.get()
									?.at(0) ?? ""
							}
						/>
					)}
				</Computed>
			}
		>
			<PressableOpacity
				twClassName={cn("flex-col flex-1 p-2 rounded-md")}
				style={{
					backgroundColor: climbInstance$.colorType,
				}}
				onPress={() => router.push(`/climb-log/${id}`)}
			>
				<Computed>
					{() => (
						<View className="w-full  flex-col items-start gap-2">
							<AppText size={"xs"}>{`${typeOfClimb.get()} - ${
								displayedGrade.get() || "No Grade"
							} - ${steepness.get() || "No Steepness"}`}</AppText>
							<AppText twClassName="text-lg text-core-caribbean-current-200">
								{`${name.get()} • ${day(
									date.get()
								).strictFormat("DD MMM, YYYY")}`}
							</AppText>
							<Show if={skill.length} else={() => <></>}>
								{() => (
									<View className="flex-row gap-2">
										<AppText size={"sm"}>
											{skill
												.get()
												?.slice(0, 4)
												.join(" - ")}
										</AppText>
									</View>
								)}
							</Show>
						</View>
					)}
				</Computed>
			</PressableOpacity>
		</ContextMenuWrapper>
	);
};

export default ClimbCard;
