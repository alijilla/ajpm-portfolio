import Image from "next/image";
interface HeroProps {
  role: string;
  claim: string;
  shortbio: string;
  cta: string;
  imageSrc: string;
}
export default function Hero({
  role,
  claim,
  shortbio,
  cta,
  imageSrc}: HeroProps) {
    return (
        <section className="m-auto p-4 ">
            <article className="hero-content">
              <div >
                <p className="w-fit text-xs text-white bg-sky-500 rounded-full p-2 lowercase">{role}</p>
              </div>
              <h1 className="text-bold text-2xl md:text-3xl lg:text-4xl">
                {claim}
              </h1>
              <p className="hero-shortbio">
                {shortbio}
              </p>
                <p className="hero-cta">{cta}</p>
              <div className="hero-contact">
                <a className="hero-emailme" href="#Contact">email me</a> 
                <a href="#Resume">download resume</a>
              </div>  
              <div className="rounded-full bg-gray-300 shadow-lg overflow-hidden w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 zoom-100 md:zoom-125">
                <Image src={imageSrc} alt="Profile" width={200} height={200} />
              </div>
            </article>
        </section>
        );        
}
