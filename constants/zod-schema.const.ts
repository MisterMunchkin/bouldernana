import { z } from "zod";

export const videoSourceSchema = {
    videoSource: z.string().optional(),
};
