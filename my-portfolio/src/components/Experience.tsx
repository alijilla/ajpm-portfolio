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
        <article>
            <div>
            <h1>{props.company}</h1>
            <p>{props.position}</p>
            <p>{props.type}</p>
            <p>{props.start_date}</p>
            <p>{props.end_date}</p>
            <p>{props.description}</p>
            <ul>
            {props.stack.map(stack => (
            <li key={stack}>{stack}</li> ))}
            </ul>
            </div>
        </article>
    </section>
);

}