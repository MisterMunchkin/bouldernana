export const FRENCH_GRADES = [
    "1a",
    "1b",
    "1c",
    "2a",
    "2b",
    "2c",
    "3a",
    "3b",
    "3c",
    "4a",
    "4b",
    "4c",
    "5a",
    "5a+",
    "5b",
    "5b+",
    "5c",
    "5c+",
    "6a",
    "6a+",
    "6b",
    "6b+",
    "6c",
    "6c+",
    "7a",
    "7a+",
    "7b",
    "7b+",
    "7c",
    "7c+",
    "8a",
    "8a+",
    "8b",
    "8b+",
    "8c",
    "8c+",
    "9a",
    "9a+",
    "9b",
    "9b+",
    "9c",
] as const;

export const VGRADES = [
    "V0",
    "V1",
    "V2",
    "V3",
    "V4",
    "V5",
    "V6",
    "V7",
    "V8",
    "V9",
    "V10",
    "V11",
    "V12",
    "V13",
    "V14",
    "V15",
] as const;

export const CLIMB_TYPE = ["Board", "Boulder", "Route", "Trad"] as const;

export const WHERE = ["Indoor", "Outdoor"] as const;

/**
 * - Flash: Send a climb in 1 attempt with prior knowledge of beta
 * - Onsight: Send a climb in 1 attempt without any prior knowledge of beta
 * - Redpoint: Send a climb in 1 attempt with practice, climbing sections off, and prior knowledge of beta
 * - Project: Send a climb after multiple attempts
 */
export const ASCENT_TYPE = ["Flash", "Onsight", "Redpoint", "Project"] as const;

export const CLIMB_FEEL = ["Hard", "Soft", "Solid"] as const;

export const SKILL_TYPE = [
    "Athletic",
    "Crimpy",
    "Cruxy",
    "Endurance",
    "Slopey",
    "Technical",
    "Power",
    "Dyno",
] as const;

export const STEEPNESS = ["Slab", "Overhang", "Vert", "Roof"] as const;
