"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  // Hero State
  const [heroId, setHeroId] = useState("");
  const [role, setRole] = useState("");
  const [headline, setHeadline] = useState("");
  const [headline1, setHeadline1] = useState("");
  const [shortbio, setShortbio] = useState("");
  const [cta, setCta] = useState("");
  const [about, setAbout] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch Hero Data on Load
  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.from("hero").select("*").single();
      if (data) {
        setHeroId(data.id);
        setRole(data.role || "");
        setHeadline(data.headline || "");
        setHeadline1(data.headline_1 || "");
        setShortbio(data.shortbio || "");
        setCta(data.cta || "");
        setAbout(data.about || "");
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Update Hero Function
  async function handleUpdateHero() {
    setIsSaving(true);
    const { error } = await supabase
      .from("hero")
      .update({
        role,
        headline,
        headline_1: headline1,
        shortbio,
        cta,
        about
      })
      .eq("id", heroId);
      
    setIsSaving(false);
    
    if (error) {
      alert("Error saving: " + error.message + " (Make sure you enabled UPDATE policies in Supabase!)");
    } else {
      alert("Successfully updated! Go check your live site!");
    }
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
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">role badge</label>
                      <Input value={role} onChange={e => setRole(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">headline</label>
                      <Input value={headline} onChange={e => setHeadline(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">sub-headline</label>
                      <Input value={headline1} onChange={e => setHeadline1(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">short bio</label>
                      <Textarea value={shortbio} onChange={e => setShortbio(e.target.value)} rows={3} />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">call to action text</label>
                      <Input value={cta} onChange={e => setCta(e.target.value)} />
                    </div>
                    <div className="grid gap-2 pt-4 border-t">
                      <label className="text-sm font-medium">about section text</label>
                      <Textarea value={about} onChange={e => setAbout(e.target.value)} rows={5} />
                    </div>
                    <Button className="mt-4" onClick={handleUpdateHero} disabled={isSaving}>
                      {isSaving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                      {isSaving ? "saving..." : "update hero & about"}
                    </Button>
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
