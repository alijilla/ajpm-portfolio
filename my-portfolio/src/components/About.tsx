import Skills from "@/components/Skills";

interface AboutProps {
  about: string;
}

export default function About({ about }: AboutProps) {
  return (
    <div className="flex flex-col gap-8">

      {/* Bio */}
      <p className="leading-7 text-base text-foreground max-w-2xl">
        {about}
      </p>

      {/* Skills tabs */}
      <Skills />

      {/* Credential line */}
      <div className="pt-2 border-t border-border">
        <p className="text-xs text-muted-foreground">
          engr. alyssa jade p. merjilla · so2 certified · bs computer engineering, southern luzon state university
        </p>
      </div>

    </div>
  );
}