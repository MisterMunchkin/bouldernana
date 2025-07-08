import { ClimbLogLocalParams } from "@/app/climb-log/[id]";
import { ClimbsClass } from "@/classes/climbs.class";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuItemTitle,
	DropdownMenuRoot,
	DropdownMenuTrigger,
} from "@/lib/modules/dropdown-menu";
import { TailwindUtil } from "@/utils/tailwind.util";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert } from "react-native";

type Props = {};

const DropdownMenu = ({}: Props) => {
	const { id } = useLocalSearchParams<ClimbLogLocalParams>();
	const destroyLog = ClimbsClass.destroy;
	const router = useRouter();

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

	return (
		<DropdownMenuRoot>
			<DropdownMenuTrigger>
				<Feather
					name="more-horizontal"
					size={24}
					style={{ paddingHorizontal: 8, paddingVertical: 4 }}
					color={TailwindUtil.getCoreColor("amethyst-smoke.100")}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					key={"edit"}
					onSelect={() => router.push(`/climb-log/${id}/update`)}
				>
					<DropdownMenuItemTitle>Edit</DropdownMenuItemTitle>
				</DropdownMenuItem>
				<DropdownMenuItem
					key={"more-media"}
					onSelect={() => console.log("Add Media")}
				>
					<DropdownMenuItemTitle>Add Media</DropdownMenuItemTitle>
				</DropdownMenuItem>
				<DropdownMenuItem key={"delete"} onSelect={confirmDeleteLog}>
					<DropdownMenuItemTitle>Delete</DropdownMenuItemTitle>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuRoot>
	);
};

export default DropdownMenu;
