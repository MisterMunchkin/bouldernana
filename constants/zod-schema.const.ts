import { z } from "zod";
import {
	ASCENT_TYPE,
	CLIMB_FEEL,
	FRENCH_GRADES,
	SKILL_TYPE,
	STEEPNESS,
	VGRADES,
	WHERE,
} from "./core.const";
export const ClimbTypeEnum = z.enum(["Board", "Boulder", "Route", "Trad"]);

export const addClimbSchema = z.object({
	assetIds: z.array(z.string()),
	typeOfClimb: ClimbTypeEnum.default("Boulder"), //boulder, route, board, trad
	whereDidYouClimb: z.enum(WHERE).default("Indoor"), //indoor, outdoor
	grade: z.string(),
	//Advanced info
	ascentType: z.enum(ASCENT_TYPE).default("Flash"), //redpoint, onsight, flash, project
	attempts: z.coerce.number(), //Should only show up if ascentType is redpoint or project
	hasBeenSent: z.boolean(),
	howDidItFeel: z.enum(CLIMB_FEEL).default("Solid"), //soft, solid, hard
	skill: z.enum(SKILL_TYPE).array(), //Cruxy, Athletic, etc..
	steepness: z.enum(STEEPNESS).default("Overhang"), // Slab, Overhang, etc.
	//ENDOF Advanced info
	// rating: z.string().optional(), // no rating to 5
	date: z.string().datetime(),
	notes: z.string(),
	link: z.string(),
	// relativeEffort: z.string().optional(), //strava effort input
});

const SupportedRouteGrades = ["YDS", "FRENCH"] as const;
const SupportedBoulderGrades = ["FONT", "VSCALE"] as const;
export const RouteGradeSystemEnum = z.enum(SupportedRouteGrades);
export const BoulderGradeSystemEnum = z.enum(SupportedBoulderGrades);

export const settingsSchema = z.object({
	routeSettings: z.object({
		gradeSystem: RouteGradeSystemEnum.default("FRENCH"),
	}),
	boulderSettings: z.object({
		gradeSystem: BoulderGradeSystemEnum.default("VSCALE"),
	}),
});

export const jsonExportSchema = z.object({
	climbLogs: z.array(z.object({ ...addClimbSchema.shape, id: z.string() })),
	...settingsSchema.shape,
});
