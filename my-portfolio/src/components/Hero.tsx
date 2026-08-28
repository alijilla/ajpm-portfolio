import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { EnvelopeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface HeroProps {
  role: string;
  headline: string;
  headline_1: string;
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
  imageSrc,
}: HeroProps) {
  return (
    <section className="lowercase py-16 px-4 sm:px-6 lg:px-8">
      <article className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">

        {/* Left: text content */}
        <div className="flex flex-col gap-4 md:basis-2/3">
          <Badge className="w-fit text-xs rounded-full px-3 py-1">
            {role}
          </Badge>

          <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl">
            {headline}
            <br />
            <span className="text-2xl font-medium text-muted-foreground">
              {headline_1}
            </span>
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed max-w-md">
            {shortbio}
          </p>

          {/* cta prop is now rendered */}
          <p className="text-sm text-muted-foreground italic">
            {cta}
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

        {/* Right: avatar */}
        <div className="shrink-0">
          <Avatar className="shadow-lg w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
            <AvatarImage
              src={imageSrc}
              className="w-full h-full object-cover"
              alt="Alyssa Jade Merjilla"
            />
            <AvatarFallback className="text-2xl font-bold">AJ</AvatarFallback>
          </Avatar>
        </div>

      </article>
    </section>
  );
}
