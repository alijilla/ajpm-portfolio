"use client"
import { useState, useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { EnvelopeIcon, ArrowDownTrayIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { heroData } from "@/data/hero";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "@/lib/schemas/contact";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

function MessageSentAlert() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert
      className={`mt-4 transition-all duration-700 ease-in-out border-emerald-500/50 bg-emerald-500/10 text-emerald-600 ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-[0.98]"
      }`}
    >
      <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
      <AlertTitle className="lowercase">message sent</AlertTitle>
      <AlertDescription className="lowercase">
        your message was successfully sent!
      </AlertDescription>
    </Alert>
  );
}

export function ContactForm() {
  const [messageSent, setMessageSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setErrorMsg(null);
    setMessageSent(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      const data = await res.json();

      if (data.success) {
        setMessageSent(true);
        reset();
      } else {
        setErrorMsg(data.message ?? "something went wrong.");
      }
    } catch (err) {
      setErrorMsg("failed to send message. please try again.");
    }
  }

  return (
    <div className="mx-auto flex w-full flex-col md:flex-row justify-between gap-12 text-center md:text-left">
      
      {/* Left side: Info & Socials */}
      <div className="flex flex-col gap-6 md:basis-1/2">
        <div className="space-y-4">
          <p className="text-base text-muted-foreground leading-relaxed lowercase">
            {heroData.cta}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <a href="https://github.com/alijilla" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
            <SiGithub className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/alyssa-jade-merjilla/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
            <FaLinkedinIn className="h-5 w-5" />
          </a>
          <a href="https://instagram.com/yhttps://www.instagram.com/alyssa_jilla/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
            <SiInstagram className="h-5 w-5" />
          </a>
          <a href="https://www.facebook.com/allyson.jade.77/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
            <SlSocialFacebook className="h-5 w-5" />
          </a>

          <span className="w-px h-5 bg-border mx-1" />

          <a href="tel:09062815416" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Phone">
            <PhoneIcon className="h-5 w-5" />
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center text-xs lowercase text-muted-foreground hover:text-foreground transition-colors">
            <ArrowDownTrayIcon className="h-3.5 w-3.5 mr-1" />
            resume
          </a>
        </div>
      </div> 

      {/* Right side: Form */}
      <div className="md:basis-1/2 w-full max-w-md mx-auto md:mx-0">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="name" className="text-xs font-medium text-muted-foreground lowercase">name</label>
            <Input id="name" placeholder="your name" className="lowercase" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive lowercase">{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground lowercase">email</label>
            <Input id="email" placeholder="you@email.com" className="lowercase" {...register("email")} />
            {errors.email && <p className="text-xs text-destructive lowercase">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="message" className="text-xs font-medium text-muted-foreground lowercase">message</label>
            <Textarea id="message" rows={4} placeholder="what would you like to say?" className="lowercase resize-none" {...register("message")} />
            {errors.message && <p className="text-xs text-destructive lowercase">{errors.message.message}</p>}
          </div>

          <Button type="submit" className="mt-2 lowercase" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                sending...
              </>
            ) : (
              "submit"
            )}
          </Button>
        </form>

        {messageSent && <MessageSentAlert />}
        {errorMsg && <p className="text-sm text-destructive mt-4 lowercase">{errorMsg}</p>}
      </div>
    </div>
  );
}