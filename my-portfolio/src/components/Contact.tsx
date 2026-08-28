"use client"
import {useState, useEffect} from "react";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { EnvelopeIcon, ArrowDownTrayIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedinIn} from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import {heroData} from "@/data/hero";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "@/lib/schemas/contact";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"




function Mesagesent() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert
      className={`transition-all duration-700 ease-in-out ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-[0.98]"
      }`}
    >
      <Terminal className="size-4" />
      <AlertTitle>Message Sent</AlertTitle>
      <AlertDescription>
        Your message is successfully sent!
      </AlertDescription>
    </Alert>
  );
}
export function ContactForm() {
  const [messageSent, setMessageSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string| null>(null);
  
  
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
 
    const res = await fetch("/api/contact",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify (values),
    })
    
    const data = await res.json()

    if(data.success)
       {
        setMessageSent(true);
        reset();
      } else {
        setErrorMsg(data.message ?? "Something went wrong");
      }
  }
    return (
        <section id="contact" className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-8 text-center md:flex-row md:text-left">
        
            <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-600">{heroData.cta}</p>

          <div className="flex items-center gap-4">
            <a href="https://github.com/alijilla" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
              <SiGithub className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/alyssa-jade-merjilla/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
              <FaLinkedinIn className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
              <SiInstagram className="h-5 w-5" />
            </a>
            <a href="https://www.facebook.com/allyson.jade.77/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors">
              <SlSocialFacebook className="h-5 w-5" />
            </a>

            <span className="w-px h-5 bg-gray-300 mx-1" />

            <a href="tel:09062815416" className="text-gray-600 hover:text-black transition-colors">
              <PhoneIcon className="h-5 w-5" />
            </a>
            <a href="#Resume" className="flex items-center text-xs text-gray-600 hover:text-black transition-colors">
              <ArrowDownTrayIcon className="h-3.5 w-3.5 mr-1" />
              resume
            </a>
          </div>
</div> 
           <div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-xs font-medium text-gray-600">Name</label>
        <Input id="name" placeholder="Your name" {...register("name")} />
        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-medium text-gray-600">Email</label>
        <Input id="email" placeholder="you@email.com" {...register("email")} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium text-gray-600">Message</label>
        <Textarea id="message" rows={4} placeholder="What would you like to say?" {...register("message")} />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" className="mt-2" disabled={isSubmitting}>
        {
          isSubmitting ? (
            <>
            <Loader2 className="animate-spin" />
      Sending...
            </>
          ): (
            "Submit"
          )
        }
        
        </Button>
        
    </form>
    {messageSent && <Mesagesent />}
    {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}

           </div>
        </section>
    );
}