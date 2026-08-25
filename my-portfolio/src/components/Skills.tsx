interface skillsProps {
    category: string;
    skills: string[];
}

export default function Skills (props: skillsProps) {
    return (
        <section className="">
            <article className="flex flex-col justify-content gap-2 md:gap-4">
            
                <p className="text-xs text-gray-600 mt-2">{props.category}</p>  
                <ul className="flex flex-row justify-content mt-2 gap-4 md:gap-8">
                    {props.skills.map(skill => (
                        <li key={skill} className="w-fit text-xs text-white bg-black rounded-md p-2 mt- 2 lowercase ">{skill}</li>
                    ))}
                </ul> 
            </article>
        </section>
    );
}
  
