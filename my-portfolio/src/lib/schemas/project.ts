import { z } from "zod";

export const projectSchema = z.object (
    {
    title: z.string().min(1), 
    description: z.string().min(1), 
    imagesource: z.array(z.string()).min(1), 
    role: z.string().min(1), 
    type: z.string().min(1), 
    stack: z.array(z.string()).min(1), 
    live_git_url: z.string().min(1), 
    }
);

export const projectSchemaUpdate = projectSchema.partial();