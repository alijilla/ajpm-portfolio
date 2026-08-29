import {z} from "zod";

export const certificateSchema = z.object({
    title: z.string().min(1), 
    issuer: z.string().min(1),
    issue_month: z.string().min(1),
    issue_year: z.string().min(1), 
    credential_url: z.string().min(1),
})

export const certificateSchemaUpdate = certificateSchema.partial();