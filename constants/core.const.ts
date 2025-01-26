import { DropDownItem } from "@/components/grade-dropdown-field";
import {
    Ascent,
    Feel,
    ClimbType,
    Where,
    FrenchGrade,
    VGrade,
    Skill,
    Steepness,
} from "@/types/core.type";

export const FRENCH_GRADES: DropDownItem<FrenchGrade>[] = [
    ...["1", "2", "3"].map((value) => ({
        label: value,
        value: value as FrenchGrade,
    })),
    ...Array.from({ length: 6 }, (_, i) => i + 4).flatMap((n) =>
        ["a", "b", "c"].map((suffix) => {
            const value = `${n}${suffix}` as FrenchGrade;
            return {
                label: value,
                value,
            };
        })
    ),
];
export const VGRADES: DropDownItem<VGrade>[] = Array.from(
    { length: 16 },
    (_, i) => {
        const value = `V${i}` as VGrade;
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

export const CLIMB_WHERE: DropDownItem<Where>[] = [
    {
        value: "Indoor",
        label: "Indoor",
    },
    {
        value: "Outdoor",
        label: "Outdoor",
    },
];

export const ASCENT_TYPE: DropDownItem<Ascent>[] = [
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
    {
        value: "Project",
        label: "Project",
    },
];

export const CLIMB_FEEL: DropDownItem<Feel>[] = [
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

export const SKILL_TYPE: DropDownItem<Skill>[] = [
    {
        value: "Athletic",
        label: "Athletic",
    },
    {
        value: "Crimpy",
        label: "Crimpy",
    },
    {
        value: "Cruxy",
        label: "Cruxy",
    },
    {
        value: "Endurance",
        label: "Endurance",
    },
    {
        value: "Slopey",
        label: "Slopey",
    },
    {
        value: "Technical",
        label: "Technical",
    },
    {
        value: "Power",
        label: "Power",
    },
    {
        value: "Dyno",
        label: "Dyno",
    },
];

export const STEPPNESS: DropDownItem<Steepness>[] = [
    {
        value: "Slab",
        label: "Slab",
    },
    {
        value: "Overhang",
        label: "Overhang",
    },
    {
        value: "Vert",
        label: "Vert",
    },
    {
        value: "Roof",
        label: "Roof",
    },
];
