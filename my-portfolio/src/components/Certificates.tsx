interface Certificateprops{
    type:string;
    title: string;
    issuer:string;
    issue_date:string;
    credential_url:string;
    image_url:string;
    others:string[];
}

export default function Certificates (props:Certificateprops) {
    return (
        <section>
            <article>
                <div>
                    <p>
                        {props.type}
                    </p>
                    <p>
                        {props.title}
                    </p>
                                        <p>
                        {props.issuer}
                    </p>
                    <p>
                        {props.issue_date}
                    </p>

                    <div>
                        <a href={props.credential_url}></a>
                        <a href={props.image_url}></a>
                        
                    </div>
                                        <p>
                        {props.type}
                    </p>
                </div>
            </article>
        </section>
    );
}