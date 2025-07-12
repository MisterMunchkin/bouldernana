import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { ClimbsClass } from "@/classes/climbs.class";
import { useCallback, useMemo, useRef } from "react";
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
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import ClimbDetails from "@/components/climb-log/climb-details";
import SkillsNeeded from "@/components/climb-log/skills-needed";
import Notes from "@/components/climb-log/notes";
import DropdownMenu from "@/components/climb-log/dropdown-menu";
import { BlurView } from "expo-blur";
import { use$ } from "@legendapp/state/react";

type Props = {};
export type ClimbLogLocalParams = {
	id: string;
};
const Index = ({}: Props) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();
	const climbInstance = use$(new ClimbsClass(id, { isTrackable: true }));

	const router = useRouter();
	const { getUserGrade } = useUserGradeOptions();

	useFocusEffect(
		useCallback(() => {
			bottomSheetRef.current?.present();
			return () => {
				bottomSheetRef.current?.dismiss();
			};
		}, [])
	);

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
					{
						backgroundColor: climbInstance.colorType,
						opacity: 1,
					},
				]}
			/>
		),
		[]
	);

	return (
		/**This should probably just be a flatlist with a header instead */
		<View className="flex-1">
			<View className="pt-safe-offset-5 px-4 flex-row items-center justify-between">
				<BlurView tint="dark">
					<PressableOpacity onPress={router.back}>
						<EvilIcons
							name="chevron-left"
							color={TailwindUtil.getCoreColor(
								"amethyst-smoke.100"
							)}
							size={40}
						/>
					</PressableOpacity>
				</BlurView>
				<BlurView tint="dark">
					<DropdownMenu />
				</BlurView>
			</View>
			<AssetCarousel
				assetIds={videoAssetIds ?? []}
				className="absolute top-0 -z-50"
			/>

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
