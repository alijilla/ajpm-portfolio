import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { heroSchema } from "@/lib/schemas/hero";
import { heroSchemaUpdate } from "@/lib/schemas/hero";

export async function GET() {
     // 1. Fetch data directly from Supabase on the server!
     const {data, error} = await supabase 
            .from("hero")
            .select("*");
    //2. Fallbck
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





export async function PATCH(
    request:Request
) {
   
  
    const body = await request.json();
    const result = await heroSchemaUpdate.safeParse(body);

    if(!result.success){
        return Response.json(
            {success:false, 
             message:"Failed to update hero",
             errors: z.flattenError(result.error).fieldErrors,
            },{status:400}
        )
    }

    const {data, error} = await supabase
    .from("hero")
    .update(result.data)
    .not("id", "is", null) // <-- Added this! Supabase requires a filter to update.
    .select()
    .single();

    if (error) {
  return Response.json(
    {
      success: false,
      message: error.message,
    },
    { status: 500 }
  );
}
    
    return Response.json(
        {success:true, data,}
    );
}
