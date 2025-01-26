import { DropDownItem } from "@/components/dropdown-field";

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
