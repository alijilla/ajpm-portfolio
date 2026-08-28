import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard"
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience"
import { ContactForm } from "@/components/Contact";
import Certificates from "@/components/Certificates";
import { certificatesData } from "@/data/certificates";
import { heroData } from "@/data/hero";
import { aboutData} from "@/data/about";
import {experienceData} from "@/data/experience"
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar name="Alyssa Jade Merjilla"/>

      <Hero 
        role={heroData.role}
        headline={heroData.headline}
        headline_1={heroData.headline_1}
        shortbio={heroData.shortbio}
        cta={heroData.cta}
        imageSrc={heroData.imageSrc}
      />

      {/* Consistent content container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        <section id="about">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">about</h2>
          <About about={aboutData.about}/>
        </section>

        <section id="experience">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">experience</h2>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 overflow-x-auto pb-2">
            {experienceData.map((company) => (
              <Experience 
                key={company.company} 
                company={company.company} 
                position={company.position} 
                type={company.type} 
                start_date={company.start_date} 
                end_date={company.end_date}  
                description={company.description} 
                stack={company.stack}
              />
            ))}
          </div>
        </section>

        <section id="projects">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">projects</h2>
          <ProjectCard />
        </section>

        <section id="certificates">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">certificates</h2>
          <div className="flex flex-row overflow-hidden hover:overflow-x-scroll gap-4 md:gap-6">
            {certificatesData.map((certificate) => (
              <Certificates  
                key={certificate.title} 
                title={certificate.title} 
                issuer={certificate.issuer} 
                issue_Month={certificate.issue_Month}
                issue_Year={certificate.issue_Year}  
                credential_url={certificate.credential_url}
              />
            ))}
          </div>
        </section>

        <section id="contact">
          <ContactForm />
        </section>

      </div>

      <Footer />
    </main>
  ); 
}
