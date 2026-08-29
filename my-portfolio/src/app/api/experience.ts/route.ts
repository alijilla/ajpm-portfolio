import { z } from "zod";
import { experienceSchema } from "@/lib/schemas/experience";
import { supabase } from "@/lib/supabase";

export async function GET() {

     const {data, error} = await supabase 
            .from("experiences")
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
        const result = await experienceSchema.safeParse(body);
            
            if(!result.success){
                return Response.json(
                    {
                        success:false,
                        message:"Failed to add an experience",
                        errors: z.flattenError(result.error).fieldErrors,
                    }, {status:400}
                )
            }
        const {data, error} = await supabase
             .from("experiences")
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