import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { projectSchemaUpdate } from "@/lib/schemas/project";

export async function PATCH(
    request:Request, 
    { params } : {params: Promise<{id:string}>}
){


    const { id } = await params;
    console.log("ID:", id);
    const body = await request.json()

    const result = projectSchemaUpdate.safeParse(body);
    console.log("BODY:", body);
    console.log("VALIDATED:", result.data);
    if(!result.success){
        return Response.json(
            {success:false, 
            message:"Failed to Update the project",
            errors:z.flattenError(result.error).fieldErrors,},
            {status:400}
        );
    }
    console.log("VALIDATED:", result.data);
    const {data, error} = await supabase
        .from("projects")
        .update(result.data)
        .eq("id", id)
        .select()
        .single();
    console.log("UPDATED DATA:", data);
console.log("SUPABASE ERROR:", error);
    if(error) {
        return Response.json(
            {
                success:false,
                message: error.message,
            }, {status:500}
        )
    }

    return Response.json(
        {
            success:true,
            data,
        }
    )
}

export async function DELETE(
    request: Request,
    { params }: {params: Promise<{id: string}>}
){
    const { id } = await params;
    
    const {error} = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
    
    
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
        {success:true, message:"Project successfully deleted!"}
    )
}