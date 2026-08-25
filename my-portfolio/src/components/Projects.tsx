interface Projectprops{
    title:string ,
    description:string ,
    category:string ,
    role:string,
    type:string,
    stack:string[] ,
    url: "string"
}

export default function Projects (props: Projectprops) {
    return (
        <section id="projects">
            <article>
                <div>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                    <p>{props.category}</p>
                    <p>{props.role}</p>
                    <p>{props.type}</p>
                    <p>{props.stack}</p>
                    <p>{props.url}</p>
                    <ul>
                        {props.stack.map(stack => (
                            <li key={stack}>{stack}</li>
                        ))}
                    </ul>
                </div>
            </article>
        </section>
    );
}