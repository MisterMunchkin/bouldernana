export type FrenchGrade =
    | "1"
    | "2"
    | "3"
    | `4${"a" | "b" | "c"}`
    | `5${"a" | "b" | "c"}`
    | `6${"a" | "b" | "c"}`
    | `7${"a" | "b" | "c"}`
    | `8${"a" | "b" | "c"}`
    | `9${"a" | "b" | "c"}`;
export type VGrade = `V${
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

export type Where = "Indoor" | "Outdoor";

/**
 * - Redpoint: Sent a climb after attempts, beta, and other insights
 * - Onsight: Sent a climb without prior knowledge of the beta and flashed it
 * - Flash: Sent a climb on just 1 attempt with prior knowledge of the beta
 * - Project: Currently working on sending the climb, unsent as of yet.
 */
export type Ascent = "Redpoint" | "Onsight" | "Flash" | "Project";

/**
 * - Soft: Too soft for the grade
 * - Solid: Solid climb for the grade
 * - Hard: Too hard for the grade
 */
export type Feel = "Soft" | "Solid" | "Hard";

export type Skill =
    | "Cruxy"
    | "Athletic"
    | "Slopey"
    | "Endurance"
    | "Technical"
    | "Crimpy"
    | "Power"
    | "Dyno";

export type Steepness = "Slab" | "Vert" | "Overhang" | "Roof";
