import { cn } from "@/utils/cn.util";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { ComponentProps, forwardRef, ReactNode, useCallback } from "react";

type Props = {
    children: ReactNode;
};

const ScrollableBottomSheet = forwardRef<BottomSheetModal, Props>(
    (props, ref) => {
        const { children } = props;
        const renderBackdrop = useCallback(
            (props: ComponentProps<typeof BottomSheetBackdrop>) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    pressBehavior={"close"}
                />
            ),
            []
        );

        return (
            <BottomSheetModal
                ref={ref}
                snapPoints={["50%"]}
                backdropComponent={renderBackdrop}
                // index={1}
                enablePanDownToClose
                enableDynamicSizing={false}
            >
                <BottomSheetScrollView
                    contentContainerClassName={cn("px-4 py-6")}
                >
                    {children}
                </BottomSheetScrollView>
            </BottomSheetModal>
        );
    }
);

ScrollableBottomSheet.displayName = "ScrollableBottomSheet";

export default ScrollableBottomSheet;
