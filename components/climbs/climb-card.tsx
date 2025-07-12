import { View } from "react-native";
import AppText from "../core/app-text";
import { day } from "@/utils/day-js.util";
import PressableOpacity from "../core/pressable-opacity";
import { router } from "expo-router";
import { LoggedClimb } from "@/types/core.type";
import { cn } from "@/utils/cn.util";
import { useMemo } from "react";
import { ClimbsClass } from "@/classes/climbs.class";
import ContextMenuWrapper from "../ui/context-menu-wrapper";
import VideoThumbnailView from "../video/video-thumbnail-view";

type Props = {
	displayedGrade: string;
} & Pick<
	LoggedClimb,
	| "date"
	| "videoAssetIds"
	| "id"
	| "skill"
	| "typeOfClimb"
	| "steepness"
	| "whereDidYouClimb"
>;

const ClimbCard = ({
	date,
	displayedGrade,
	id,
	typeOfClimb,
	skill,
	steepness,
	whereDidYouClimb,
}: Props) => {
	const climbInstance = useMemo(() => {
		return new ClimbsClass(id);
	}, [id]);

	return (
		<ContextMenuWrapper
			preview={
				<VideoThumbnailView
					videoAssetId={
						climbInstance.climb.videoAssetIds?.at(0) ?? ""
					}
				/>
			}
		>
			<PressableOpacity
				twClassName={cn("flex-col flex-1 p-2 rounded-md")}
				style={{
					backgroundColor: climbInstance.colorType,
				}}
				onPress={() => router.push(`/climb-log/${id}`)}
			>
				<View className="w-full  flex-col items-start gap-2">
					<AppText size={"xs"}>{`${typeOfClimb} - ${
						displayedGrade || "No Grade"
					} - ${steepness || "No Steepness"}`}</AppText>
					<AppText twClassName="text-lg text-core-caribbean-current-200">
						{`${climbInstance.climb.name} • ${day(
							date
						).strictFormat("DD MMM, YYYY")}`}
					</AppText>
					{skill && skill.length > 0 && (
						<View className="flex-row gap-2">
							<AppText size={"sm"}>
								{skill?.slice(0, 4).join(" - ")}
							</AppText>
						</View>
					)}
				</View>
			</PressableOpacity>
		</ContextMenuWrapper>
	);
};

export default ClimbCard;
