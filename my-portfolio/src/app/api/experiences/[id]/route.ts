import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { experienceSchemaUpdate } from "@/lib/schemas/experience";

export async function PATCH(
    request:Request,
    {params} : {params: Promise<{id:string}>}
) {
    const {id} = await params;
    
    const body = await request.json();
    const result = await experienceSchemaUpdate.safeParse(body);

    if(!result.success){
        return Response.json(
            {success:false, 
             message:"Failed to update an experience",
             errors: z.flattenError(result.error).fieldErrors,
            },{status:400}
        )
    }

    const {data, error} = await supabase
    .from("experiences")
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

export async function DELETE(
    request:Request,
    {params} : {params: Promise<{id:string}>}
) {
    const {id} = await params;
    
    const { error} = await supabase
    .from("experiences")
    .delete()
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
        {success:true, message:"Experience deleted",}
    );
}