import AssetCarousel from "@/components/video/asset-carousel";
import { ScrollView } from "react-native";
import { ClimbLogLocalParams } from "./_index";
import { useLocalSearchParams } from "expo-router";
import { ClimbsClass } from "@/classes/climbs.class";

type Props = {};

const Index = ({}: Props) => {
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();
	const climbLog = ClimbsClass.get(id);
	const { videoAssetIds } = climbLog ?? {};

	return (
		<ScrollView contentContainerClassName="flex-1 relative bg-core-cod-gray pt-safe-offset-0">
			<AssetCarousel assetIds={videoAssetIds ?? []} />
		</ScrollView>
	);
};

export default Index;
