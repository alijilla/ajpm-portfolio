import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY}); 

export async function GET(){
    
    return Response.json({
        success:true,
        question:"You asked: What projects have you built?"
    });

}

export async function POST(request: Request) {
    
    const body = await request.json();


    if (!body.question) {
        return Response.json(
            {
                success: false,
                message: "Invalid form data",
            },
            { status: 400 }
        );
    }
     
        const response = await ai.models.generateContent({
  model: "gemini-3.6-flash",
  contents: body.question,
});

        const answer = response.text; 

    return Response.json({
        success: true,
        message: `You Asked: ${answer}`,
        
    });
}

