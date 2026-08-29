import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard"
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience"
import { ContactForm } from "@/components/Contact";
import Certificates from "@/components/Certificates";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/ui/fade-in";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  // Fetch data directly from Supabase!
  const { data: experiencesData } = await supabase.from("experiences").select("*");
  const { data: certificationsData } = await supabase.from("certifications").select("*");
  // Fetch hero data to pass to the About component (.single() returns one object instead of an array)
  const { data: hero } = await supabase.from("hero").select("*").single();

  return (
    <main>
      <Navbar name="Alyssa Jade Merjilla"/>

      <FadeIn delay={0.1}>
        <Hero  />
      </FadeIn>

      {/* Consistent content container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-24">

        <section id="about">
          <FadeIn>
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">about</h2>
            <About about={hero?.about || "About section coming soon."}/>
          </FadeIn>
        </section>

        <section id="experience">
          <FadeIn>
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">experience</h2>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 overflow-x-auto pb-2">
              {experiencesData?.map((company) => (
                <Experience 
                  key={company.id} 
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
          </FadeIn>
        </section>

        <section id="projects">
          <FadeIn>
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">projects</h2>
            <ProjectCard />
          </FadeIn>
        </section>

        <section id="certificates">
          <FadeIn>
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">certificates</h2>
            <div className="flex flex-row overflow-x-auto gap-4 md:gap-6 pb-4 snap-x">
              {certificationsData?.map((certificate) => (
                <Certificates  
                  key={certificate.id} 
                  title={certificate.title} 
                  issuer={certificate.issuer} 
                  issue_Month={certificate.issue_month}
                  issue_Year={certificate.issue_year}  
                  credential_url={certificate.credential_url || ""}
                />
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="contact">
          <FadeIn>
            <ContactForm cta={hero?.cta || "open to junior frontend / web developer roles."} />
          </FadeIn>
        </section>

      </div>

      <Footer />
    </main>
  ); 
}
