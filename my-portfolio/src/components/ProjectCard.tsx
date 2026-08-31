"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


type ProjectCard = {
  id: string;
  title: string, 
  description: string, 
 imagesource: string[], 
  role: string, 
 type: string, 
  stack: string[], 
  live_git_url: string, 
};

// Shown when a project has no screenshot yet
function ImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center">
      <span className="text-xs text-muted-foreground lowercase">{title}</span>
    </div>
  );
}

export default function ProjectCard() {
        const [projects, setProjects] = useState<ProjectCard[]>([]);
        const [isLoading, setIsLoading] = useState(true);
        
        useEffect(() =>{
            async function fetchProjects(){
              try {
                const response = await fetch("/api/projects");
                const result =  await response.json();
                setProjects(result.data || []);
              } finally {
                setIsLoading(false);
              }
            } 
            fetchProjects();
          },[]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2 rounded-xl overflow-hidden border p-0">
            <div className="w-full h-40 bg-muted animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {projects.map((project) => (
        <Dialog key={project.id}>

          {/* Card trigger — clicking opens the dialog */}
          <DialogTrigger nativeButton={false} render={<div role="button" tabIndex={0} className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl group cursor-pointer h-full" />}>
              <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                <CardHeader className="p-0 overflow-hidden rounded-t-xl">
                {project.imagesource[0] ? (
                  <Image
                    src={project.imagesource[0]}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <ImagePlaceholder title={project.title} />
                )}
              </CardHeader>
              <CardContent className="pt-4 pb-2">
                <CardTitle className="text-sm font-semibold lowercase leading-snug">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-xs mt-1 lowercase">
                  {project.type}
                </CardDescription>
              </CardContent>
            </Card>
          </DialogTrigger>

          {/* Dialog detail view */}
          <DialogContent className="max-w-lg">
            <DialogTitle className="text-lg font-semibold lowercase">
              {project.title}
            </DialogTitle>
            <p className="text-xs text-muted-foreground lowercase -mt-2">
              {project.type}
            </p>

            {/* Project image or placeholder */}
            {project.imagesource[0] ? 
             ( <div className="flex flex-row overflow-x-auto snap-x gap-2 pb-2">
                {project.imagesource.map((imageSrc) => (
                <Image
                key={imageSrc}
                src={imageSrc}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-auto object-cover rounded-md"
              />
              ))}
              </div>
            ) : (
              <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
                <span className="text-xs text-muted-foreground">no preview available yet</span>
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Role — only shown if filled in */}
            {project.role && (
              <p className="text-xs text-muted-foreground italic">
                {project.role}
              </p>
            )}

            {/* Stack badges + live link */}
            <CardFooter className="px-0 pb-0 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="lowercase text-xs">
                  {tech}
                </Badge>
              ))}
              {project.live_git_url && (
                <a
                  href={project.live_git_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs underline underline-offset-2 text-muted-foreground hover:text-foreground transition-colors ml-auto"
                >
                  <PaperClipIcon className="h-3.5 w-3.5" />
                  view project
                </a>
              )}
            </CardFooter>
          </DialogContent>

        </Dialog>
      ))}
    </div>
  );
}