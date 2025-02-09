import { z } from "zod";
import {
    ASCENT_TYPE,
    CLIMB_FEEL,
    CLIMB_TYPE,
    SKILL_TYPE,
    STEEPNESS,
    VGRADES,
    WHERE,
} from "./core.const";

export const videoSourceSchema = {
    videoSources: z.array(z.string()),
};

export const addClimbSchema = z.object({
    ...videoSourceSchema,
    typeOfClimb: z.enum(CLIMB_TYPE).default("Boulder"), //boulder, route, board, trad
    whereDidYouClimb: z.enum(WHERE).default("Indoor"), //indoor, outdoor
    grade: z.enum(VGRADES).default("V0"), //VGrade for boulder and board, French for route and trad
    //Advanced info
    ascentType: z.enum(ASCENT_TYPE).optional(), //redpoint, onsight, flash, project
    attempts: z.coerce.number().optional(), //Should only show up if ascentType is redpoint or project
    hasBeenSent: z.boolean(),
    howDidItFeel: z.enum(CLIMB_FEEL).optional(), //soft, solid, hard
    skill: z.enum(SKILL_TYPE).array().optional(), //Cruxy, Athletic, etc..
    steepness: z.enum(STEEPNESS).optional(), // Slab, Overhang, etc.
    //ENDOF Advanced info
    // rating: z.string().optional(), // no rating to 5
    date: z.string().datetime(),
    notes: z.string().optional(),
    link: z.string().optional(),
    // relativeEffort: z.string().optional(), //strava effort input
});
