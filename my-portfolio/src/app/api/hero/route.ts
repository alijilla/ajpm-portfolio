import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { heroSchema } from "@/lib/schemas/hero";

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


