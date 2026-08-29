import {z} from "zod";

export const experienceSchema = z.object({
    company: z.string().min(1),
    position: z.string().min(1),
    type: z.string().min(1),
    start_date: z.string().min(1),
    end_date: z.string().min(1),
    description: z.string().min(1),
    stack: z.array(z.string()).min(1), 
})

export const experienceSchemaUpdate =  experienceSchema.partial();