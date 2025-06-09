import {
	FRENCH_GRADES,
	VGRADES,
	CLIMB_TYPE,
	WHERE,
	ASCENT_TYPE,
	CLIMB_FEEL,
	SKILL_TYPE,
	STEEPNESS,
} from "@/constants/core.const";
import { addClimbSchema } from "@/constants/zod-schema.const";
import { z } from "zod";

export type FrenchGrade = (typeof FRENCH_GRADES)[number];
export type VGrade = (typeof VGRADES)[number];
export type ClimbType = (typeof CLIMB_TYPE)[number];
export type Where = (typeof WHERE)[number];
export type Ascent = (typeof ASCENT_TYPE)[number];
export type Feel = (typeof CLIMB_FEEL)[number];
export type Skill = (typeof SKILL_TYPE)[number];
export type Steepness = (typeof STEEPNESS)[number];

type ClimbSchema = z.infer<typeof addClimbSchema>;
export type LoggedClimb = ClimbSchema & {
	id: string;
};
