import { z } from "zod";

export const videoSourceSchema = {
    videoSource: z.string().optional(),
};

export const addClimbSchema = z.object({
    grade: z.string(),
    description: z.string().optional(),
    date: z.string().date(),
    notes: z.string().optional(),
    ...videoSourceSchema,
});
