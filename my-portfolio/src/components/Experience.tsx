import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
interface ExperienceProp{
company:string;
position: string;
type:string;
start_date:string;
end_date:string;
description:string;
stack: string[];
}

export default function Experience(props: ExperienceProp){
return (
    <section id="experience">
    <Card className="lowercase">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight">{props.company}</CardTitle>
                        <CardDescription>
                           <span className="font-bold">{props.position}</span> <br></br>   
                           {props.type}<br></br> 
                           <span className=" italic">{props.start_date} - {props.end_date}</span>
                            </CardDescription>       
                 </CardHeader>
                <CardContent >{props.description}</CardContent>      
                <CardFooter > 
                    <div className="mt-2">
                             <ul className="flex flex-row flex-wrap gap-2">
                            {props.stack.map(stack => (
                            <Badge variant="secondary" key={stack} >{stack}</Badge> ))}
                            </ul>         
                    </div>
                </CardFooter>
    </Card>
    </section>
);

}