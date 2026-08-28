import { z } from "zod";
import { Resend } from "resend";
import { formSchema } from "@/lib/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY); 

export async function POST(request: Request) {
  const body = await request.json();
  const result = formSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        success: false,
        message: "Invalid form data",
        errors: z.flattenError(result.error).fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, message } = result.data;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",       // Resend's sandbox sender (Option A)
    to: "merjillajadealyssa@gmail.com", // must match the email you signed up with, while in sandbox mode
    subject: `New contact form message from ${name}`,
    replyTo: email,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
    console.log("Key length:", process.env.RESEND_API_KEY?.length);
console.log("Key starts with:", process.env.RESEND_API_KEY?.slice(0, 5));
console.log("Key ends with:", JSON.stringify(process.env.RESEND_API_KEY?.slice(-3)));
console.log("RAW ENV KEY:", JSON.stringify(process.env.RESEND_API_KEY));
console.log("KEY LENGTH:", process.env.RESEND_API_KEY?.length);
      if (error) {
    return Response.json(
      {
         success: false, message: "Failed to send email",
      },
      { status: 400 },
    );
  }

  return Response.json({
    success: true,
    message: "Message sent successfully!",
  });
}