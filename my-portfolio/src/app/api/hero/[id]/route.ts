
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { heroSchemaUpdate } from "@/lib/schemas/hero";

export async function PATCH(
    request:Request,
    {params} : {params: Promise<{id:string}>}
) {
    const {id} = await params;
  
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
    .eq("id", id)
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
