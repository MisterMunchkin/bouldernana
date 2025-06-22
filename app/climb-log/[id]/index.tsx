import { ClimbLogLocalParams } from "./_index";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ClimbsClass } from "@/classes/climbs.class";
import { useCallback, useEffect, useMemo, useRef } from "react";
import AssetCarousel from "@/components/video/asset-carousel";
import {
	BottomSheetModal,
	BottomSheetBackgroundProps,
	BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";
import AppText from "@/components/core/app-text";
import { TailwindUtil } from "@/utils/tailwind.util";
import PressableOpacity from "@/components/core/pressable-opacity";
import { EvilIcons } from "@expo/vector-icons";

type Props = {};

const Index = ({}: Props) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();
	const climbInstance = useMemo(() => new ClimbsClass(id), [id]);
	const router = useRouter();

	useEffect(() => {
		bottomSheetRef.current?.present();
	}, [bottomSheetRef]);

	const {
		climb: { videoAssetIds, grade, date },
	} = climbInstance;

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
				<PressableOpacity
					onPress={router.back}
					twClassName="rounded-sm w-10 h-10 absolute z-50 top-safe-offset-5 left-5 bg-core-white-rock"
				>
					<EvilIcons
						name="chevron-left"
						color={TailwindUtil.getCoreColor("cod-gray.DEFAULT")}
						style={{
							textAlign: "center",
						}}
						size={40}
					/>
				</PressableOpacity>
				<AssetCarousel assetIds={videoAssetIds ?? []} />
			</View>
			<BottomSheetModal
				ref={bottomSheetRef}
				snapPoints={["18%", "50%", "80%"]}
				enablePanDownToClose={false}
				enableDynamicSizing={false}
				backgroundComponent={renderBackground}
			>
				{/* <BottomSheetFlashList className="flex-row items-center justify-between"> */}
				<AppText font={"semibold"} color={"black"}>
					{grade}
				</AppText>
				{/* <AppText font={"semibold"} color={"black"}>
						{date}
					</AppText> */}
				{/* </BottomSheetFlashList> */}
			</BottomSheetModal>
		</View>
	);
};

export default Index;
