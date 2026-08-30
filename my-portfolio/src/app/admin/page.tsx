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
                    <Button className="mt-4" disabled={isSaving}>
                      {isSaving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                      {isSaving ? "saving..." : "update hero & about"}
                    </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* OTHER TABS OMITTED FOR BREVITY AS YOU WORK ON THE AI FEATURE */}
          <TabsContent value="experience"><Card><CardContent className="p-8 text-center text-muted-foreground">Work in progress...</CardContent></Card></TabsContent>
          <TabsContent value="projects"><Card><CardContent className="p-8 text-center text-muted-foreground">Work in progress...</CardContent></Card></TabsContent>
          <TabsContent value="certificates"><Card><CardContent className="p-8 text-center text-muted-foreground">Work in progress...</CardContent></Card></TabsContent>

        </Tabs>
      </div>
    </main>
  );
}
