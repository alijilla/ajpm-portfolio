import { z } from "zod";
import { Resend } from "resend";
import { formSchema } from "@/lib/schemas/contact";

const resend = new Resend ("re_YzL9YvdU_KmknGx7wtkumnkNcUD8qpC8G"); // temporary — moving this next lesson

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