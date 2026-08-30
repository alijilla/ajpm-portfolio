"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "@/lib/schemas/contact";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { Plus, Trash2, Pencil, Loader2 } from "lucide-react";
import Link from "next/link";
import { heroSchemaUpdate } from "@/lib/schemas/hero";

type Hero = {
     role: string; 
     headline: string;
     headline_1: string;
     shortbio: string;
     cta: string ;
     image_src: string ;
     about: string;
}

interface Experience {
  company: string;
  position: string;
  type: string;
  start_date: string;
  end_date: string;
  description: string;
  stack: string[];
}

interface Certificate {
  title: string;
  issuer: string;
  issue_month: string;
  issue_year: number;
  credential_url: string;
}

type ProjectCard = {
  id: string;
  title: string, 
  description: string, 
 imagesource: string[], 
  role: string, 
 type: string, 
  stack: string[], 
  live_git_url: string, 
};

type Skills = {
  id: string;
  category: string;
  name: string;
};

export default function AdminPage() {
  
 
  // Hero State
  const [hero, setHero] = useState<Hero | null>(null);

  //Experience Stage
   const [exp, setExp] = useState<Experience[] | null>(null);
  
  //Project Stage
   const [projects, setProj] = useState<ProjectCard[]>([]);
  
   //Skill stage 
  const [skills, setSkill] = useState<Skills[]>([]);
  
  //Certificate stage
  const [cert, setCert] = useState<Certificate[] | null>(null);
  
  //isLoading isSaving
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

     const {
      register,
      handleSubmit,
      reset,
      formState: { errors},
    } = useForm<z.infer<typeof heroSchemaUpdate>>({
      resolver: zodResolver(heroSchemaUpdate),
    })



  //FetchAllData
   useEffect(() => {
    async function fetchData(){
      try {
        const [resHero, resSkill, resProj, resExp, resCert ] = await Promise.all ([
          fetch("/api/hero"),
          fetch("/api/skills"),
          fetch("/api/projects"),    // Fixed order
          fetch("/api/experiences"), // Fixed order
          fetch("/api/certifications"),
        ]);
        
        const [dataHero, dataSkill, dataProj, dataExp, dataCert] = await Promise.all([
          resHero.json(),
          resSkill.json(),
          resProj.json(),
          resExp.json(),
          resCert.json()
        ]);
       
        setHero(dataHero.data[0]);

        reset(dataHero.data[0]); 
        setSkill(dataSkill.data || []);
        setProj(dataProj.data || []); // Fixed: setProj instead of setExp
        setExp(dataExp.data || []);
        setCert(dataCert.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [])
  // Update Hero Function



  async function handleUpdateHero(herovalue: z.infer<typeof heroSchemaUpdate>){
  
          try {
         
            const res = await fetch("/api/hero", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(herovalue),
          });
            const heroUpdate = await res.json();
             setHero(heroUpdate.data);
             alert("Updated Succesfully")
          } catch (error){
             console.error("Failed to update:", error);
          }

          
  }

  
  
  //Update Experience 
  async function handleUpdateExp() {


  }
  //Delete Experience
    async function handleDeleteExp() {

    }
  //Add Experience
    async function handleAddExp() {

    }

 
  //Update Project 
  async function handleUpdateProj() {

  }
  //Delete Project
  async function handleDeleteProj() {

  }
  //Add Project
   async function handleAddProj() {

   }
  

  //Update Certificate
  async function handleUpdateCert() {

  }
  //Delete Certificate
  async function handleDeleteCert() {

  }
  //Add Certificate
   async function handleAddCert() {

   }


  //Update Skills
  async function handleUpdateSkill() {

  }
  
    //Delete Skills
  async function handleDeleteSkill() {

  }

   //Add Skills
   async function handleAddSkill(){

   }



 
  
  return (
    <main className="min-h-screen bg-muted/30 p-4 md:p-10 lowercase">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">admin dashboard</h1>
            <p className="text-muted-foreground mt-1">manage your portfolio content here.</p>
          </div>
          <div className="flex gap-2">
            <Button nativeButton={false} variant="outline" render={<Link href="/" />}>
              view live site
            </Button>
          </div>
        </div>

        {/* Tabs for different database tables */}
        <Tabs defaultValue="hero">
          <TabsList className="mb-6 flex-wrap h-auto">
            <TabsTrigger value="hero">hero & about</TabsTrigger>
            <TabsTrigger value="experience">experience</TabsTrigger>
            <TabsTrigger value="projects">projects</TabsTrigger>
            <TabsTrigger value="certificates">certificates</TabsTrigger>
            <TabsTrigger value="skills">skills</TabsTrigger>
          </TabsList>

          {/* 1. HERO TAB */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>hero section</CardTitle>
                <CardDescription>update the main text on your landing page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center p-8"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
                ) : (
                  <>
                  <form onSubmit={handleSubmit(handleUpdateHero)}>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">role badge</label>
                       <Input {...register("role")} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">headline</label>
                      <Input {...register("headline")} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">sub-headline</label>
                      <Input {...register("headline_1")} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">short bio</label>
                      <Input {...register("shortbio")} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">call to action text</label>
                      <Input {...register("cta")} />
                    </div>
                    <div className="grid gap-2 pt-4 border-t">
                      <label className="text-sm font-medium">about section text</label>
                      <Input {...register("about")} />
                    </div>
                    <Button type="submit" className="mt-4" disabled={isSaving}>
                      {isSaving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                      {isSaving ? "saving..." : "update hero & about"}
                    </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2. EXPERIENCE TAB */}
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>add new experience</CardTitle>
                <CardDescription>fill out the form below to add a new role to your timeline.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add Form */}
                <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); handleAddExp(); }}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2"><label className="text-sm font-medium">company</label><Input placeholder="e.g. FlyRank" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">position</label><Input placeholder="e.g. AI Engineer" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">type</label><Input placeholder="e.g. Full-time, Internship" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">tech stack</label><Input placeholder="React, Next.js, Tailwind (comma separated)" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">start date</label><Input type="month" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">end date</label><Input type="month" placeholder="Leave blank if present" /></div>
                  </div>
                  <div className="grid gap-2"><label className="text-sm font-medium">description</label><Textarea placeholder="What did you do there?" /></div>
                  <Button type="submit" className="w-fit"><Plus className="h-4 w-4 mr-2" /> add experience</Button>
                </form>
              </CardContent>
            </Card>

            {/* List Existing Experiences */}
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold tracking-tight mt-4">existing experiences</h3>
              {exp?.map((item, i) => (
                <Card key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
                  <div>
                    <h4 className="font-medium">{item.position} <span className="text-muted-foreground font-normal">at {item.company}</span></h4>
                    <p className="text-sm text-muted-foreground">{item.start_date} - {item.end_date || "Present"}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" onClick={() => handleUpdateExp()}><Pencil className="h-4 w-4 mr-2" /> edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteExp()}><Trash2 className="h-4 w-4 mr-2" /> delete</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 3. PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>add new project</CardTitle>
                <CardDescription>showcase your latest work and case studies.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); handleAddProj(); }}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2"><label className="text-sm font-medium">project title</label><Input placeholder="e.g. AI Portfolio" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">role</label><Input placeholder="e.g. Lead Developer" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">project type</label><Input placeholder="e.g. Web App, Case Study" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">live / github url</label><Input placeholder="https://..." /></div>
                    <div className="grid gap-2 md:col-span-2"><label className="text-sm font-medium">tech stack</label><Input placeholder="React, Firebase, Zod (comma separated)" /></div>
                  </div>
                  <div className="grid gap-2"><label className="text-sm font-medium">description</label><Textarea placeholder="Describe the project and your impact..." /></div>
                  <Button type="submit" className="w-fit"><Plus className="h-4 w-4 mr-2" /> add project</Button>
                </form>
              </CardContent>
            </Card>

            {/* List Existing Projects */}
            <div className="grid gap-4 md:grid-cols-2">
              {projects?.map((item, i) => (
                <Card key={i} className="flex flex-col justify-between p-4 space-y-4">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleUpdateProj()}><Pencil className="h-4 w-4 mr-2" /> edit</Button>
                    <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDeleteProj()}><Trash2 className="h-4 w-4 mr-2" /> delete</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 4. CERTIFICATES TAB */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>add new certificate</CardTitle>
                <CardDescription>add a new certification or course completion.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); handleAddCert(); }}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2 md:col-span-2"><label className="text-sm font-medium">certificate title</label><Input placeholder="e.g. Google UX Design Professional Certificate" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">issuing organization</label><Input placeholder="e.g. Coursera" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">credential url</label><Input placeholder="https://..." /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">issue month</label><Input placeholder="e.g. August" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">issue year</label><Input type="number" placeholder="2026" /></div>
                  </div>
                  <Button type="submit" className="w-fit"><Plus className="h-4 w-4 mr-2" /> add certificate</Button>
                </form>
              </CardContent>
            </Card>

            {/* List Existing Certificates */}
            <div className="grid gap-4 md:grid-cols-2">
              {cert?.map((item, i) => (
                <Card key={i} className="flex flex-col justify-between p-4 space-y-4">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.issuer} ({item.issue_month} {item.issue_year})</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleUpdateCert()}><Pencil className="h-4 w-4 mr-2" /> edit</Button>
                    <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDeleteCert()}><Trash2 className="h-4 w-4 mr-2" /> delete</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 5. SKILLS TAB */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>add new skill</CardTitle>
                <CardDescription>add a new technology or tool to your stack.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); handleAddSkill(); }}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">skill category</label>
                      <Input placeholder="e.g. Frontend, Backend, Tools" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">skill name</label>
                      <Input placeholder="e.g. React, Next.js, Figma" />
                    </div>
                  </div>
                  <Button type="submit" className="w-fit"><Plus className="h-4 w-4 mr-2" /> add skill</Button>
                </form>
              </CardContent>
            </Card>

            {/* List Existing Skills */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {skills?.map((item, i) => (
                <Card key={i} className="flex justify-between items-center p-4">
                  <div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleDeleteSkill()}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </main>
  );
}
