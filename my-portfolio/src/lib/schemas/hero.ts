
import {z} from "zod";

export const heroSchema = z.object({
   role: z.string().min(1), 
   headline: z.string().min(1), 
   headline_1: z.string().min(1), 
   shortbio: z.string().min(1), 
   cta: z.string().min(1),  
   image_src: z.string().min(1),  
   about: z.string().min(1), 
})

export const heroSchemaUpdate =  heroSchema.partial();