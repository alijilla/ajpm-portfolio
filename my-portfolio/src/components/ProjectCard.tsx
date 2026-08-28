import { projectsData } from "@/data/projects";
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

// Shown when a project has no screenshot yet
function ImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="w-full h-40 bg-muted rounded-md flex items-center justify-center">
      <span className="text-xs text-muted-foreground lowercase">{title}</span>
    </div>
  );
}

export default function ProjectCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {projectsData.map((project) => (
        <Dialog key={project.title}>

          {/* Card trigger — clicking opens the dialog */}
          <DialogTrigger className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer  h-full">
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
             ( <div className="flex flex-row overflow-hidden hover:overflow-x-scroll">
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