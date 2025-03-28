import ClimbCard from "@/components/climbs/climb-card";
import AppText from "@/components/core/app-text";
import PressableOpacity from "@/components/core/pressable-opacity";
import { useUserGradeOptions } from "@/hooks/user-grade-options.hook";
import {
	LoggedClimb,
	useUserClimbRecordStore,
} from "@/stores/user-climb-record.store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as FileSystem from "expo-file-system";

type Props = {};

const Tab = ({}: Props) => {
	const climbs = useUserClimbRecordStore((store) => store.climbs);
	const bottomTabBarHeight = useBottomTabBarHeight();
	const { bottom } = useSafeAreaInsets();
	const { getUserGrade } = useUserGradeOptions();

	const renderItem = useCallback(
		(climb: LoggedClimb) => (
			<ClimbCard
				{...climb}
				displayedGrade={getUserGrade({ grade: climb.grade })}
			/>
		),
		[getUserGrade]
	);
	const sortedClimbs = climbs
		.slice()
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);

	return (
		<View className="flex-1 px-2">
			<FlashList
				data={sortedClimbs}
				contentContainerClassName="pt-safe-offset-20"
				contentContainerStyle={{
					paddingBottom: bottom + bottomTabBarHeight,
				}}
				ItemSeparatorComponent={() => <View className="h-2" />}
				renderItem={({ item }) => renderItem(item)}
				estimatedItemSize={200}
				extraData={{ getUserGrade }}
				// ListFooterComponent={() => (
				// 	<PressableOpacity
				// 		onPress={async () => {
				// 			let videoThumb;
				// 			let imagePick;
				// 			let dirr;
				// 			// if (FileSystem.cacheDirectory) {
				// 			videoThumb = await FileSystem.readDirectoryAsync(
				// 				FileSystem.cacheDirectory + "VideoThumbnails/"
				// 			);
				// 			imagePick = await FileSystem.readDirectoryAsync(
				// 				FileSystem.cacheDirectory + "ImagePicker/"
				// 			);
				// 			// }
				// 			// if (FileSystem.documentDirectory)
				// 			dirr = await FileSystem.readDirectoryAsync(
				// 				FileSystem.documentDirectory ?? ""
				// 			);

				// 			console.log(
				// 				"file system: ",
				// 				JSON.stringify({ videoThumb, imagePick, dirr })
				// 			);
				// 		}}
				// 	>
				// 		<AppText>Log</AppText>
				// 	</PressableOpacity>
				// )}
			/>
		</View>
	);
};

export default Tab;
