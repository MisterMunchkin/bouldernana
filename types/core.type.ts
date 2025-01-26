export type FrenchGradeOptions =
    | "1"
    | "2"
    | "3"
    | `4${"a" | "b" | "c"}`
    | `5${"a" | "b" | "c"}`
    | `6${"a" | "b" | "c"}`
    | `7${"a" | "b" | "c"}`
    | `8${"a" | "b" | "c"}`
    | `9${"a" | "b" | "c"}`;
export type VGradeOptions = `V${
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15}`;

export type ClimbType = "Route" | "Boulder" | "Board" | "Trad";

export type ClimbWhere = "Indoor" | "Outdoor";

export type AscentType = "Redpoint" | "Onsight" | "Flash";

export type ClimbFeel = "Soft" | "Solid" | "Hard";
