import {
	ContextMenuContent,
	ContextMenuPreview,
	ContextMenuRoot,
	ContextMenuTrigger,
} from "@/lib/modules/context-menu";
import React from "react";

type Props = {
	children: React.ReactNode;
	preview: React.ReactNode;
};

const ContextMenuWrapper = ({ children, preview }: Props) => {
	return (
		<ContextMenuRoot>
			<ContextMenuTrigger>{children}</ContextMenuTrigger>
			<ContextMenuContent>
				<ContextMenuPreview>{preview}</ContextMenuPreview>
			</ContextMenuContent>
		</ContextMenuRoot>
	);
};

export default ContextMenuWrapper;
