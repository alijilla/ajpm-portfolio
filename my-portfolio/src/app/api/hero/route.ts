import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { heroSchema } from "@/lib/schemas/hero";

export async function GET() {

     const {data, error} = await supabase 
            .from("hero")
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


