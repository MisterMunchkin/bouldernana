import { DropDownItem } from "@/components/core/dropdown-field";

export namespace CoreTypesUtil {
    export const getInferredDropdownItems = <T extends readonly string[]>(
        items: T
    ): DropDownItem<T[number]>[] => {
        return items.map((item) => ({
            value: item,
            label: item,
        }));
    };
}
