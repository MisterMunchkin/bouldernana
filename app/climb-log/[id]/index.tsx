import { useLocalSearchParams, useRouter } from "expo-router";
import { ClimbsClass } from "@/classes/climbs.class";
import { useCallback, useEffect, useMemo, useRef } from "react";
import AssetCarousel from "@/components/video/asset-carousel/asset-carousel";
import {
	BottomSheetModal,
	BottomSheetBackgroundProps,
	BottomSheetBackdrop,
	BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { TailwindUtil } from "@/utils/tailwind.util";
import PressableOpacity from "@/components/core/pressable-opacity";
import { EvilIcons } from "@expo/vector-icons";

import AppText from "@/components/core/app-text";
import { day } from "@/utils/day-js.util";
import { BlurView } from "expo-blur";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import ClimbDetails from "@/components/climb-log/climb-details";
import SkillsNeeded from "@/components/climb-log/skills-needed";
import Notes from "@/components/climb-log/notes";
import DropdownMenu from "@/components/climb-log/dropdown-menu";

type Props = {};
export type ClimbLogLocalParams = {
	id: string;
};
const Index = ({}: Props) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();
	const climbInstance = useMemo(() => new ClimbsClass(id), [id]);
	const router = useRouter();
	const { getUserGrade } = useUserGradeOptions();

	useEffect(() => {
		bottomSheetRef.current?.present();
	}, [bottomSheetRef]);

	const { climb } = climbInstance;
	const { name, date, grade, videoAssetIds } = climb ?? {};

	const userGrade = useMemo(
		() => getUserGrade({ grade: grade ?? "" }),
		[grade, getUserGrade]
	);

	const renderBackground = useCallback(
		(props: BottomSheetBackgroundProps) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={1}
				style={[
					props.style,
					{ backgroundColor: climbInstance.colorType, opacity: 1 },
				]}
			/>
		),
		[]
	);

	return (
		<View className="absolute top-0">
			<View>
				<BlurView
					className="absolute z-50 top-safe-offset-5 left-5"
					tint="prominent"
				>
					<PressableOpacity onPress={router.back}>
						<EvilIcons
							name="chevron-left"
							color={TailwindUtil.getCoreColor(
								"cod-gray.DEFAULT"
							)}
							style={{
								textAlign: "center",
							}}
							size={40}
						/>
					</PressableOpacity>
				</BlurView>
				<AssetCarousel assetIds={videoAssetIds ?? []} />

				<BlurView className="absolute z-50 top-safe-offset-5 right-5 px-2 py-1">
					<DropdownMenu />
				</BlurView>
			</View>
			<BottomSheetModal
				ref={bottomSheetRef}
				snapPoints={["18%", "50%", "80%"]}
				enablePanDownToClose={false}
				enableDynamicSizing={false}
				enableOverDrag={false}
				backgroundComponent={renderBackground}
			>
				<View className="flex-row items-start justify-between px-4 pb-1">
					<AppText
						size={"xl"}
						font={"bold"}
						twClassName="text-pretty flex-1"
					>
						{name}
					</AppText>
					<View className="flex-col items-start">
						<AppText>
							{day(date).strictFormat("DD MMM, YYYY")}
						</AppText>

						<AppText
							size={"xl"}
						>{`${userGrade} (${grade})`}</AppText>
					</View>
				</View>
				<BottomSheetScrollView
					className={"flex-1"}
					contentContainerClassName={"gap-4"}
				>
					<ClimbDetails {...climb} />
					<SkillsNeeded {...climb} />
					<Notes {...climb} />
					<View className="px-4 py-2 items-start">
						<AppText size={"base"}>Link</AppText>
						<AppText size={"xl"}>{climb.link ?? "No link"}</AppText>
					</View>
				</BottomSheetScrollView>
			</BottomSheetModal>
		</View>
	);
};

export default Index;
