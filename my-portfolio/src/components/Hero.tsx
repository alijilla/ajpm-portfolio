"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { EnvelopeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Hero = {
     role: string; 
     headline: string;
     headline_1: string;
     shortbio: string;
     cta: string ;
     image_src: string ;
     about: string;
}
export default function Hero() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  /*const [role, setRole] = useState("");
  const [headline, setHeadline] = useState("");
  const [headline_1, setHeadline_1] = useState("");
  const [shortbio, setShortbio] = useState("");
  const [cta, setCta] = useState("");
  const [image_src, setImage_src] = useState("");
  const [isLoading, setIsLoading] = useState(true);*/

  useEffect(() => {

    async function fetchHero(){

      const response = await fetch("/api/hero");
      const result = await response.json();
      setHero(result.data[0]);

       setIsLoading(false);
      
     /* if(result){
      const hero = result.data[0];
      setRole(hero.role);
      setHeadline(hero.headline);
      setHeadline_1(hero.headline_1);
      setShortbio(hero.shortbio);
      setCta(hero.cta);
      setImage_src(hero.image_src);
      }*/

    }
    fetchHero();
  },[])
     
  return (
    <section className="lowercase py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
      {isLoading ? (
        <div className="flex justify-center p-8"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
      ) : hero ? (
        <>
        <div className="flex flex-col gap-4 md:basis-2/3">
          <Badge className="w-fit text-xs rounded-full px-3 py-1">
            {hero.role}
          </Badge>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl">
            {hero.headline}
            <br />
            <span className="text-2xl font-medium text-muted-foreground">
              {hero.headline_1}
            </span>
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            {hero.shortbio}
          </p>

          <p className="text-sm text-muted-foreground italic">
            {hero.cta}
          </p>

          <div className="flex flex-row gap-3 flex-wrap mt-2">
            <Button nativeButton={false} render={<a href="#contact" />}>
              <EnvelopeIcon className="h-4 w-4 mr-2" />
              email me
            </Button>
            <Button nativeButton={false} variant="outline" render={<a href="/resume.pdf" target="_blank" rel="noopener noreferrer" />}>
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              resume
            </Button>
          </div>
        </div>

        
        <div className="shrink-0">
          <Avatar className="shadow-lg w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
            <AvatarImage
              src={hero.image_src}
              className="w-full h-full object-cover"
              alt="Alyssa Jade Merjilla"
            />
            <AvatarFallback className="text-2xl font-bold">AJ</AvatarFallback>
          </Avatar>
        </div>

       </>
      ) : null}
        
      </article>
    </section>
  );
}
