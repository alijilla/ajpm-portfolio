import {PaperClipIcon} from "@heroicons/react/24/outline"
import {  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
interface Projectprops{
    title:string;
    description:string;
    role:string;
    type:string;
    imagesource:string[],
    stack:string[];
    live_git_url:string;
}

export default function Projects(props: Projectprops) {
    return (
        <section id="projects">
            
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {props.title}
                        </CardTitle>
                        <CardDescription>
                           {props.type}
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        {props.description}
                        <br></br><br></br>
                        <span className="text-xs italic ">{props.role}</span>
                    </CardContent>
                    <CardFooter>
                        
                        <ul className="flex flex-row gap-4 md-gap-8">
                        {props.stack.map(stack => (
                            <Badge key={stack}>{stack}</Badge>
                        ))}
                    </ul>

                   <Button render={<a href={props.live_git_url}/>}>
                   <PaperClipIcon className="h-4 w-4 inline mr-2" />
                   </Button>
                 
                    </CardFooter>
                </Card>      
               
        </section>
    );
}
