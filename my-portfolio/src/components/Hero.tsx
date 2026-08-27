import Image from "next/image";
import { Slot } from "@radix-ui/react-slot"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
} from "@/components/ui/avatar"

import { EnvelopeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {Badge} from "@/components/ui/badge"
import {Button, buttonVariants} from "@/components/ui/button"
interface HeroProps {
  role: string;
  headline: string;
  headline_1:string;
  shortbio: string;
  cta: string;
  imageSrc: string;
}
export default function Hero({
  role,
  headline,
  headline_1,
  shortbio,
  cta,
  imageSrc}: HeroProps) {
    return (
        <section className="m-auto p-4 lowercase ">
            <article className="flex flex-col md:flex-row justify-center items-center gap-4 md-gap-8">
              <div className="basis-2/3 m-auto p-4">
                <Badge className="w-fit text-xs text-accent rounded-full p-2 lowercase">{role}</Badge>
                <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl mt-4">
                  {headline} <br></br> <span className="text-md text-muted-foreground">{headline_1}</span>
                </h1>
              <h2 className="m-auto p-4  text-md text-gray-600">
                {shortbio}  
              </h2>
              <div className="">
                <Button nativeButton={false} render={<a href="#contact"/>}>
                  <EnvelopeIcon className="h-4 w-4 inline mr-2" />
                  email me
                </Button>
                <Button nativeButton={false} variant="outline" render={<a href="#contact"/>}>
                <ArrowDownTrayIcon className="h-4 w-4 inline mr-2" />
                  resume
                </Button>
              </div>

              </div> 

              <div className="m-auto p-4">
    <Avatar className=" shadow-lg  w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
      <AvatarImage src={imageSrc} className="w-full h-full object-cover" alt="Alyssa Jade" />
      <AvatarFallback>AM</AvatarFallback>
    </Avatar>
              </div>
            </article>
        </section>
        );        
}
