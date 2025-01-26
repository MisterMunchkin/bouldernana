import { DropDownItem } from "@/components/grade-dropdown-field";
import {
    AscentType,
    ClimbFeel,
    ClimbType,
    ClimbWhere,
    FrenchGradeOptions,
    VGradeOptions,
} from "@/types/core.type";

export const FRENCH_GRADES: DropDownItem<FrenchGradeOptions>[] = [
    ...["1", "2", "3"].map((value) => ({
        label: value,
        value: value as FrenchGradeOptions,
    })),
    ...Array.from({ length: 6 }, (_, i) => i + 4).flatMap((n) =>
        ["a", "b", "c"].map((suffix) => {
            const value = `${n}${suffix}` as FrenchGradeOptions;
            return {
                label: value,
                value,
            };
        })
    ),
];
export const VGRADES: DropDownItem<VGradeOptions>[] = Array.from(
    { length: 16 },
    (_, i) => {
        const value = `V${i}` as VGradeOptions;
        return {
            label: value,
            value,
        };
    }
);

export const CLIMB_TYPE: DropDownItem<ClimbType>[] = [
    {
        value: "Board",
        label: "Board",
    },
    {
        value: "Boulder",
        label: "Boulder",
    },
    {
        value: "Route",
        label: "Route",
    },
    {
        value: "Trad",
        label: "Trad",
    },
];

export const CLIMB_WHERE: DropDownItem<ClimbWhere>[] = [
    {
        value: "Indoor",
        label: "Indoor",
    },
    {
        value: "Outdoor",
        label: "Outdoor",
    },
];

export const ASCENT_TYPE: DropDownItem<AscentType>[] = [
    {
        value: "Flash",
        label: "Flash",
    },
    {
        value: "Onsight",
        label: "Onsight",
    },
    {
        value: "Redpoint",
        label: "Redpoint",
    },
];

export const CLIMB_FEEL: DropDownItem<ClimbFeel>[] = [
    {
        value: "Hard",
        label: "Hard",
    },
    {
        value: "Soft",
        label: "Soft",
    },
    {
        value: "Solid",
        label: "Solid",
    },
];
