import { z } from "zod";

export const skillSchema = z.object({
    name:z.string().min(1),
    category:z.string().min(1),
});

export const skillSchemaUpdate = skillSchema.partial();