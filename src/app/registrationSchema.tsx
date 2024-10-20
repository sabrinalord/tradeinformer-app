import { z } from "zod";

export const schema = z.object({
    email: z.string().trim().email({
        message:"Invalid email address",
    }),
})