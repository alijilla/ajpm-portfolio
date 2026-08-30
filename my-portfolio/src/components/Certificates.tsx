import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface Certificateprops {
  title: string;
  issuer: string;
  issue_month: string;
  issue_year: number;
  credential_url: string;
}

export default function Certificates(props: Certificateprops) {
  return (
    <article className="lowercase flex-1 min-w-[280px] max-w-full">
      <Card className="h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <CardHeader className="flex-1 pb-4">
          <CardTitle className="text-base font-semibold tracking-tight leading-snug">
            {props.title}
          </CardTitle>
          {/* Replaced <br /> hacks with a clean flex column for the description details */}
          <div className="mt-2 flex flex-col gap-1">
            <p className="text-sm font-medium text-foreground">{props.issuer}</p>
            <p className="text-xs text-muted-foreground italic">
              {props.issue_month} {props.issue_year}
            </p>
          </div>
        </CardHeader>
        
        <CardFooter className="pt-0 mt-auto">
          {/* Render real link if URL exists, otherwise show disabled state */}
          {props.credential_url ? (
            <Button variant="outline" nativeButton={false} render={<a href={props.credential_url} target="_blank" rel="noopener noreferrer" />} className="w-full sm:w-auto text-xs">
              view credential
              <ArrowTopRightOnSquareIcon className="ml-2 h-3.5 w-3.5 inline" />
            </Button>
          ) : (
            <Button variant="outline" disabled className="w-full sm:w-auto text-xs">
              credential unavailable
            </Button>
          )}
        </CardFooter>
      </Card>
    </article>
  );
}