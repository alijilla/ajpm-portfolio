"use client"

import {useState, useEffect} from "react"
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

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_month: string;
  issue_year: string;
  credential_url?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  type: string;
  start_date: string;
  end_date: string;
  description: string;
  stack: string[]; // Fix: stack is an array in Supabase, not a string
}

export default function Home() {
 const [exp, setExp] = useState<Experience[] | null>(null);
 const [cert, setCert] = useState<Certificate[] | null>(null);
 const [about, setAbout] = useState("");
 const [cta, setCta] = useState("");

  useEffect(() => {
    async function fetchData(){
      try {
        const [response, respo, res ] = await Promise.all ([
          fetch("/api/hero"),
          fetch("/api/experiences"),
          fetch("/api/certifications"),
        ]);
        
        const [resHero, resExp, resCert] = await Promise.all([
          response.json(),
          respo.json(),
          res.json()
        ]);
       
        // Fix: Add safe check in case hero data is empty
        const hero = resHero.data?.[0];
        if (hero) {
          setAbout(hero.about || "");
          setCta(hero.cta || "");
        }
        
        setExp(resExp.data || []);
        setCert(resCert.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [])

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
            <About about={about || "About section coming soon."}/>
          </FadeIn>
        </section>

        <section id="experience">
          <FadeIn>
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mb-6">experience</h2>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 overflow-x-auto pb-2">
              {exp?.map((company) => (
                <Experience 
                  key={company.id} 
                  company={company.company} 
                  position={company.position} 
                  type={company.type} 
                  start_date={company.start_date} 
                  end_date={company.end_date}  
                  description={company.description} 
                  // Fix: stack is already an array, so we don't call .split(",")
                  stack={Array.isArray(company.stack) ? company.stack : []}
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
          {cert?.map((certificate) => (
            <Certificates  
              key={certificate.id} 
              title={certificate.title} 
              issuer={certificate.issuer} 
              issue_month={certificate.issue_month}
              issue_year={Number(certificate.issue_year) || 0}
              credential_url={certificate.credential_url || ""}
            />
          ))}
            </div>
          </FadeIn>
        </section>

        <section id="contact">
          <FadeIn>
            <ContactForm cta={cta || "open to junior frontend / web developer roles."} />
          </FadeIn>
        </section>

      </div>

      <Footer />
    </main>
  ); 
}
