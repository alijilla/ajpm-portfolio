import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience"
import Projects from "@/components/Projects";
import { heroData } from "@/data/hero";
import { aboutData} from "@/data/about";
import {experienceData} from "@/data/experience"
import {projectsData} from "@/data/projects"
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main>
      <Navbar name="Alyssa Jade Merjilla"/>
      <Hero 
        role={heroData.role}
        headline={heroData.headline}
        shortbio={heroData.shortbio}
        cta={heroData.cta}
        imageSrc={heroData.imageSrc}
      />
      <About about={aboutData.about}/>
      {experienceData.map((company) => (
      <Experience key={company.company} company={company.company} position={company.position} type={company.type} start_date={company.start_date} end_date={company.end_date}  description={company.description} stack={company.stack}  /> ))};
      {projectsData.map((title) => (
        <Projects   key={title.title} description={title.description} category={title.category} role={title.role} type={title.type} stack={title.stack} url={title.url}/>))};                                    
      <Footer />
    </main>
 
  ); 
}

