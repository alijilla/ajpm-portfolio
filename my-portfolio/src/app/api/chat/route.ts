import { GoogleGenAI } from "@google/genai";
import { supabase } from "@/lib/supabase";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY}); 

export async function GET(){
    
    return Response.json({
        success:true,
        question:"You asked: What projects have you built?"
    });

}

export async function POST(request: Request) {
    
    const { data: hero, error: heroError } = await supabase
  .from("hero")
  .select("*");
   if (heroError) {
    return Response.json(
      {
        success: false,
        error: heroError.message,
      },
      { status: 500 }
    );
  }

const { data: projects, error: projectsError } = await supabase
  .from("projects")
  .select("*");
   if (projectsError) {
    return Response.json(
      {
        success: false,
        error: projectsError.message,
      },
      { status: 500 }
    );
  }

const { data: skills, error: skillsError } = await supabase
  .from("skills")
  .select("*");
 
   if (skillsError) {
    return Response.json(
      {
        success: false,
        error: skillsError.message,
      },
      { status: 500 }
    );
  }
const { data: certifications, error: certificationsError } = await supabase
  .from("certifications")
  .select("*");

     if (certificationsError) {
    return Response.json(
      {
        success: false,
        error: certificationsError.message,
      },
      { status: 500 }
    );
  }

const { data: experiences, error: experiencesError } = await supabase
  .from("experiences")
  .select("*");

      if (experiencesError) {
    return Response.json(
      {
        success: false,
        error: experiencesError.message,
      },
      { status: 500 }
    );
  }
 
  console.log("PORTFOLIO DATA:", {
  hero,
  projects,
  skills,
  certifications,
  experiences,
});

const portfolioContext = `
Hero:
${JSON.stringify(hero)}

Projects:
${JSON.stringify(projects)}

Skills:
${JSON.stringify(skills)}

Certifications:
${JSON.stringify(certifications)}

Experiences:
${JSON.stringify(experiences)}
`;

    const body = await request.json();

        console.log("QUESTION:", body.question);
         console.log("MESSAGES:", body.messages);
    if (!body.question) {
        return Response.json(
            {
                success: false,
                message: "Invalid form data",
            },
            { status: 400 }
        );
    }
     console.log("BODY:", body);
     
     try {

        const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.6-flash",
        config: {
            systemInstruction: `
            You are an AI assistant for my portfolio.

            RULES:
                1. Do not invent information.
                2. Do not create projects, skills, certifications, or experiences
                that are not in the provided data.
                3. Keep projects and experiences separate.
                4. If the user asks about projects, prioritize the Projects section.
                5. If the user asks about work/internship experience, use the
                Experiences section.
                6. If the information is not available, say that you don't know.
                7. Do not assume that a skill means it was used in every project.
            PORTFOLIO INFORMATION:
            Name: Alyssa Jade P. Merjilla
            Hobby: Reading manwha, novel, manga
            ${portfolioContext}
            `,
            },
        contents: body.question,
        }); 


      
const encoder = new TextEncoder();

const stream = new ReadableStream({
  async start(controller) {
    try {
      for await (const chunk of responseStream) {
        const text = chunk.text;

        console.log("GEMINI CHUNK:", text);

        if (text) {
          controller.enqueue(encoder.encode(text));
        }
      }

      controller.close();
    } catch (error) {
      controller.error(error);
    }
  },
});
       

        return new Response(stream, {
           headers:{
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
           }
            
        });
            

     } catch (error: unknown) {
        console.error("Gemini error:", error);

        const status =
            typeof error === "object" && error !== null && "status" in error
                ? (error as { status?: number }).status
                : undefined;

        if (status === 429) {
            return Response.json(
                {
                    success: false,
                    message: "AI service is temporarily unavailable. It reached the quota; please try again later.",
                },
                { status: 429 }
            );
        }

        return Response.json(
            {
                success: false,
                message: "AI service is temporarily unavailable.",
            },
            { status: 500 }
        );
     }
   
}

