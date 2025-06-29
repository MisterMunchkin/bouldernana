import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuItemTitle,
	DropdownMenuRoot,
	DropdownMenuTrigger,
} from "@/lib/modules/dropdown-menu";
import { TailwindUtil } from "@/utils/tailwind.util";
import { Feather } from "@expo/vector-icons";

type Props = {};

const DropdownMenu = ({}: Props) => {
	return (
		<DropdownMenuRoot>
			<DropdownMenuTrigger>
				<Feather
					name="more-horizontal"
					size={24}
					color={TailwindUtil.getCoreColor("cod-gray.DEFAULT")}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					key={"edit"}
					onSelect={() => console.log("Edit")}
				>
					<DropdownMenuItemTitle>Edit</DropdownMenuItemTitle>
				</DropdownMenuItem>
				<DropdownMenuItem
					key={"more-media"}
					onSelect={() => console.log("Add Media")}
				>
					<DropdownMenuItemTitle>Add Media</DropdownMenuItemTitle>
				</DropdownMenuItem>
				<DropdownMenuItem
					key={"delete"}
					onSelect={() => console.log("Delete")}
				>
					<DropdownMenuItemTitle>Delete</DropdownMenuItemTitle>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenuRoot>
	);
};

export default DropdownMenu;
