import {z} from "zod";
import { supabase } from "@/lib/supabase";
import { projectSchema } from "@/lib/schemas/project";

export async function GET() {

    const {data, error} = await supabase
        .from("projects")
        .select("*");

    if (error){
        return Response.json(
            {
                success:false,
                error: error.message,
            },{status:400}
        )
    }
     
    return Response.json(
        {
            success:true,
            data,
        }
    )
}



export async function POST(request:Request) {
    
    const body = await request.json()
    const result = await projectSchema.safeParse(body);
    
    if(!result.success){
        return Response.json(
            {
                success:false,
                message:"Failed to add a project",
                errors: z.flattenError(result.error).fieldErrors,
            }, {status:400}
        )
    }
    
    const {data, error} = await supabase
        .from("projects")
        .insert(result.data)
        .select()
        .single();

    if(error){
        return Response.json(
            {status:false, message:error.message,},{status:500}
        )
    }
    return Response.json(
        {
            success:true,
            data,
        }
    )
}