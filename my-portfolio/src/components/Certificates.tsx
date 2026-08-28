import {  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent} from "@/components/ui/card";

  import {Button} from "@/components/ui/button";
  
interface Certificateprops{
    title: string;
    issuer:string;
    issue_Month:string;
    issue_Year:number;
    credential_url:string;
}

export default function Certificates (props:Certificateprops) {
    return (
        <section className="lowercase">

                <Card className="hover:shadow-md transition-shadow duration-150" >
                    <CardHeader>
                        <CardTitle>
                        {props.title}
                        </CardTitle>
                        <CardDescription>
                        {props.issuer} <br></br>
                        <span>{props.issue_Month} {props.issue_Year}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button>
                        <a href={props.credential_url}>View Credential</a>
                        </Button>
                    </CardFooter>
                </Card>                
        </section>
    );
}