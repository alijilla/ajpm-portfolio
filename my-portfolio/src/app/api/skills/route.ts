import { z } from "zod";
import { skillSchema } from "@/lib/schemas/skills";
import { supabase } from "@/lib/supabase";

export async function GET() {

     const {data, error} = await supabase 
            .from("skills")
            .select("*");

            if (error){
                return Response.json({
                    success:false,
                    error: error.message,
                },{status:500}
                    
                );}

            return Response.json(
                {
                    success:true,
                    data,
                }
            );
}

export async function POST(request:Request){

        const body = await request.json();
        const result = await skillSchema.safeParse(body);
            
            if(!result.success){
                return Response.json(
                    {
                        success:false,
                        message:"Failed to add a skill",
                        errors: z.flattenError(result.error).fieldErrors,
                    }, {status:400}
                )
            }
        const {data, error} = await supabase
             .from("skills")
             .insert(result.data)
             .select()
             .single();

             if(error) {
                
                return Response.json({success: true,
                message:error.message, 
                },
                    {status:500}
                )
             }
        return Response.json(
            {
                success:true,
                message:"Added successfully",
            }, {status:201}
        )
}