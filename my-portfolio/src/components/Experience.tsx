"use client"

import {useState, useEffect} from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExperienceProp {
  company: string;
  position: string;
  type: string;
  start_date: string;
  end_date: string;
  description: string;
  stack: string[];
}

export default function Experience(props: ExperienceProp) {
  const isCurrent = props.end_date === "Present";
   const [experiences, setExperiences] = useState<ExperienceProp[]>([]);
          
          useEffect(() =>{
              async function fetchExperiences(){
                const response = await fetch("/api/projects");
                const result =  await response.json();
  
                setExperiences(result.data);
              } 
              fetchExperiences();
            },[]);
  
  return (
    <article className="flex-1 min-w-[260px]">
      <Card className="lowercase h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

        <CardHeader className="pb-2">
          {/* "current" dot for ongoing roles */}
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              current
            </span>
          )}

          <CardTitle className="text-base font-semibold tracking-tight">
            {props.company}
          </CardTitle>

          {/* Each piece of info on its own line — no more <br /> hacks */}
          <p className="text-sm font-medium text-foreground">{props.position}</p>
          <p className="text-xs text-muted-foreground">{props.type}</p>
          <p className="text-xs text-muted-foreground italic">
            {props.start_date} — {props.end_date}
          </p>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground flex-1">
          {props.description}
        </CardContent>

        <CardFooter>
          <ul className="flex flex-row flex-wrap gap-2">
            {props.stack.map((tech) => (
              <Badge variant="secondary" key={tech} className="text-xs">
                {tech}
              </Badge>
            ))}
          </ul>
        </CardFooter>

      </Card>
    </article>
  );
}