import Image from "next/image";
import { EnvelopeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
interface HeroProps {
  role: string;
  headline: string;
  shortbio: string;
  cta: string;
  imageSrc: string;
}
export default function Hero({
  role,
  headline,
  shortbio,
  cta,
  imageSrc}: HeroProps) {
    return (
        <section className="m-auto p-4 ">
            <article className="flex flex-row justify-center items-center gap-4 md-gap-8">
              <div className="basis-2/3 m-auto p-4">
                <p className="w-fit text-xs text-white bg-sky-500 rounded-full p-2 lowercase">{role}</p>
              
              <h1 className="text-bold text-2xl md:text-3xl lg:text-4xl m-auto p-4">
                {headline}
              </h1>
              <p className="m-auto p-4  text-xs text-gray-600">
                {shortbio}
                
              </p>
              <hr className="border-gray-300" />
              <p className="text-xs text-black text-bold m-auto p-4">{cta}</p> 
                 
              <div className="">
                <a className="w-fit text-xs text-white bg-black rounded-md p-2 lowercase" href="#Contact">
                  <EnvelopeIcon className="h-4 w-4 inline mr-2" />
                  email me
                </a>
                <a className="w-fit text-xs text-gray-600 rounded-md p-2 lowercase" href="#Resume">
                  <ArrowDownTrayIcon className="h-4 w-4 inline mr-2" />
                  resume
                </a>
              </div>

              </div> 

              <div className="relative bg-gray-300 shadow-lg overflow-hidden w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full m-auto p-4">
                <Image
                  src={imageSrc}
                  alt="Profile"
                  fill
                  quality={1000}
                  className="object-cover"
                />
              </div>
            </article>
        </section>
        );        
}
