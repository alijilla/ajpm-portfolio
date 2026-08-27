import Skills from "@/components/Skills";
interface AboutProps {
    about: string;
}

export default function About ({about}: AboutProps) {
    return (
        <section  id="about" className="">
            <article className="flex flex-col justify-content gap-4 md:gap-8 m-auto p-4">
                <div className="basis 1/2 max-w-full">
               
                <p className="leading-7 [&:not(:first-child)]:mt-6 ">
                    {about}
                </p>        
                </div>
        
                <div>
                
                    <Skills />
                 <hr className="border-gray-300 mt-2 mb-2" />
                 <p className="text-xs text-gray-600 mt-2 mb-2">engr. alyssa jade p. merjilla · so2 certified · bs computer engineering, southern luzon state university</p>
                </div>  
                </article>
        </section>
    );
}