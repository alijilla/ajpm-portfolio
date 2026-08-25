import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { heroData } from "@/data/hero";
export default function Home() {
  return (
    <main>
      <Navbar name="Alyssa Jade Merjilla"/>
      <Hero 
        role={heroData.role}
        claim={heroData.claim}
        shortbio={heroData.shortbio}
        cta={heroData.cta}
        imageSrc={heroData.imageSrc}
      />
    </main>
  ); 
}
