import Skills from "@/components/Skills";
import { skillsData} from "@/data/skill";
interface AboutProps {
    about: string;
}

export default function About ({about}: AboutProps) {
    return (
        <section  id="about" className="m-auto p-4">
            <article className="flex flex-col justify-content gap-4 md:gap-8 m-auto p-4">
                <p className="text-xs text-gray-600 ">about</p>
                <p className="text-md text-black">
                    {about}
                </p>
                <div>
                {skillsData.map((category) => (
                    <Skills key={category.category} category ={category.category} skills={category.skills}/>))}
                 <hr className="border-gray-300 mt-2 mb-2" />
                 <p className="text-xs text-gray-600 mt-2 mb-2">engr. alyssa jade p. merjilla · so2 certified · bs computer engineering, southern luzon state university</p>
                </div>
               
                
                </article>
        </section>
    );
}