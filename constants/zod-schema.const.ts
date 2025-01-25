import { z } from "zod";

export const videoSourceSchema = {
    videoSource: z.string().optional(),
};

export const addClimbSchema = z.object({
    grade: z.string(),
    description: z.string().optional(),
    date: z.string().datetime(),
    notes: z.string().optional(),
    ...videoSourceSchema,
});
