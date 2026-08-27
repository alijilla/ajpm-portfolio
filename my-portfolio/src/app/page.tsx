import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience"
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Certificates from "@/components/Certificates";
import { certificatesData } from "@/data/certificates";
import { heroData } from "@/data/hero";
import { aboutData} from "@/data/about";
import {experienceData} from "@/data/experience"
import {projectsData} from "@/data/projects"
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="">
      <Navbar name="Alyssa Jade Merjilla"/>

      <Hero 
        role={heroData.role}
        headline={heroData.headline}
        headline_1={heroData.headline_1}
        shortbio={heroData.shortbio}
        cta={heroData.cta}
        imageSrc={heroData.imageSrc}
      />
  <div className="  ml-3 p-8"> 
      <h3 className="scroll-m-20 border-b pb-2 ml-3 text-3xl font-semibold tracking-tight">about</h3>
      <About 
        about={aboutData.about}/>
         


      <h3 className="scroll-m-20  ml-2 border-b pb-2 text-2xl mb-2 mt-4 font-semibold tracking-tight">experience</h3>
      <div className="flex flex-row justify-content overflow-scroll mt-8 gap-4 md:gap-8">
        
      {experienceData.map((company) => (
        <Experience 
        key={company.company} 
        company={company.company} 
        position={company.position} 
        type={company.type} 
        start_date={company.start_date} 
        end_date={company.end_date}  
        description={company.description} 
        stack={company.stack}  /> ))}
      </div>

      
       <h3 className="scroll-m-20 ml-2 border-b pb-2 text-2xl mt-4 mb-2 font-semibold tracking-tight">projects</h3>
      <div 
      className="flex flex-row m-auto mt-8 gap-4 md:gap-8 overflow-scroll">
      {projectsData.map((project) => ( 
        <Projects   
          key={project.title} 
          title={project.title}
          description={project.description} 
          role={project.role} 
          type={project.type} 
          stack={project.stack} 
          live_git_url={project.live_git_url}/>))}                                   
      </div>
       <h3 className="scroll-m-20 ml-2 border-b pb-2 text-2xl mt-4 mb-2 font-semibold tracking-tight">certificates</h3>
      <div className="flex flex-row justify-content overflow-scroll mt-8 gap-4 md:gap-8">
      {certificatesData.map((certificate) => (
        <Certificates  
          key={certificate.title} 
          title={certificate.title} 
          issuer={certificate.issuer} 
          issue_Month={certificate.issue_Month}
          issue_Year={certificate.issue_Year}  
          credential_url={certificate.credential_url} />))}      
      </div>
            <Contact />
    </div>

      <Footer />
    </main>
  ); 
}


