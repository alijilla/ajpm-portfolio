"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Plus, Trash2, Pencil, Loader2, X } from "lucide-react";
import Link from "next/link";
import { heroSchemaUpdate } from "@/lib/schemas/hero";

type Hero = {
  role: string;
  headline: string;
  headline_1: string;
  shortbio: string;
  cta: string;
  image_src: string;
  about: string;
};

interface Experience {
  id: string; // <-- Fixed: Added ID
  company: string;
  position: string;
  type: string;
  start_date: string;
  end_date: string;
  description: string;
  stack: string[] | string;
}

interface Certificate {
  id: string; // <-- Fixed: Added ID
  title: string;
  issuer: string;
  issue_month: string;
  issue_year: number;
  credential_url: string;
}

type ProjectCard = {
  id: string;
  title: string;
  description: string;
  imagesource: string[] | string;
  role: string;
  type: string;
  stack: string[] | string;
  live_git_url: string;
};

type Skills = {
  id: string;
  category: string;
  name: string;
};

export default function AdminPage() {
  // --- AUTH STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [hero, setHero] = useState<Hero | null>(null);
  const [exp, setExp] = useState<Experience[]>([]);
  const [projects, setProj] = useState<ProjectCard[]>([]);
  const [skills, setSkill] = useState<Skills[]>([]);
  const [cert, setCert] = useState<Certificate[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Edit Tracking States
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);

  // --- FORMS ---
  const heroForm = useForm<z.infer<typeof heroSchemaUpdate>>({
    resolver: zodResolver(heroSchemaUpdate),
  });
  
  const expForm = useForm<Experience>();
  const projForm = useForm<ProjectCard>();
  const certForm = useForm<Certificate>();
  const skillForm = useForm<Skills>();

  // --- FETCH DATA ---
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    
   
    async function fetchData() {
       setIsLoading(true);
      try {
        const [resHero, resSkill, resProj, resExp, resCert] = await Promise.all([
          fetch("/api/hero"),
          fetch("/api/skills"),
          fetch("/api/projects"),
          fetch("/api/experiences"),
          fetch("/api/certifications"),
        ]);

        const [dataHero, dataSkill, dataProj, dataExp, dataCert] = await Promise.all([
          resHero.json(),
          resSkill.json(),
          resProj.json(),
          resExp.json(),
          resCert.json(),
        ]);

        setHero(dataHero.data[0]);
        heroForm.reset(dataHero.data[0]); // Auto-fill Hero form

        setSkill(dataSkill.data || []);
        setProj(dataProj.data || []);
        setExp(dataExp.data || []);
        setCert(dataCert.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [isAuthenticated, heroForm]);

  
  
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

   
    // Call Supabase Authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      alert("Error logging in: " + error.message);
    } else if (data.session) {
      setIsAuthenticated(true);
    }
  };
  const [isUploading, setIsUploading] = useState(false);

  const uploadImageToSupabase = async (file: File) => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: unknown) {
      const err = error as Error;
      alert("Upload failed. Make sure you created a public 'portfolio-images' storage bucket. Error: " + err.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // --- 1. HERO CRUD ---
  async function handleUpdateHero(herovalue: z.infer<typeof heroSchemaUpdate>) {
    setIsSaving(true);
    try {
      const res = await fetch("/api/hero", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(herovalue),
      });
      const heroUpdate = await res.json();
      if (heroUpdate.success) {
        setHero(heroUpdate.data);
        alert("Hero Updated Successfully!");
      }
    } catch (error) {
      console.error("Failed to update hero:", error);
    } finally {
      setIsSaving(false);
    }
  }

  // --- 2. EXPERIENCE CRUD ---
  async function onSubmitExp(data: Omit<Experience, 'id'>) {
    // Convert comma-separated string back to array for DB
    const payload = {
      ...data,
      stack: typeof data.stack === "string" ? data.stack.split(",").map((s: string) => s.trim()) : data.stack,
    };

    if (editingExpId) {
      // UPDATE
      await fetch(`/api/experiences/${editingExpId}`, { method: "PATCH", body: JSON.stringify(payload) });
      setExp((prev) => prev.map((e) => (e.id === editingExpId ? { ...e, ...payload } : e)));
      setEditingExpId(null);
    } else {
      // CREATE
      const res = await fetch("/api/experiences", { method: "POST", body: JSON.stringify(payload) });
      const created = await res.json();
      if (created.data) setExp((prev) => [...prev, ...created.data]);
    }
    expForm.reset({});
  }

  async function handleDeleteExp(id: string) {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/experiences/${id}`, { method: "DELETE" });
    setExp((prev) => prev.filter((e) => e.id !== id));
  }

  function handleEditExpClick(item: Experience) {
    setEditingExpId(item.id);
    expForm.reset({
      ...item,
      stack: Array.isArray(item.stack) ? item.stack.join(", ") : item.stack,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- 3. PROJECTS CRUD ---
  async function onSubmitProj(data: ProjectCard) {
    const payload = {
      ...data,
      stack: typeof data.stack === "string" ? data.stack.split(",").map((s: string) => s.trim()) : data.stack,
      imagesource: typeof data.imagesource === "string" ? [data.imagesource] : data.imagesource,
    };

    if (editingProjId) {
      await fetch(`/api/projects/${editingProjId}`, { method: "PATCH", body: JSON.stringify(payload) });
      setProj((prev) => prev.map((p) => (p.id === editingProjId ? { ...p, ...payload } : p)));
      setEditingProjId(null);
    } else {
      const res = await fetch("/api/projects", { method: "POST", body: JSON.stringify(payload) });
      const created = await res.json();
      if (created.data) setProj((prev) => [...prev, ...created.data]);
    }
    projForm.reset({});
  }

  async function handleDeleteProj(id: string) {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProj((prev) => prev.filter((p) => p.id !== id));
  }

  function handleEditProjClick(item: ProjectCard) {
    setEditingProjId(item.id);
    projForm.reset({
      ...item,
      stack: Array.isArray(item.stack) ? item.stack.join(", ") : item.stack,
      imagesource: Array.isArray(item.imagesource) ? item.imagesource[0] : item.imagesource,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- 4. CERTIFICATES CRUD ---
  async function onSubmitCert(data: Certificate) {
    // Ensure year is an integer
    const payload = { ...data, issue_year: Number(data.issue_year) };

    if (editingCertId) {
      await fetch(`/api/certifications/${editingCertId}`, { method: "PATCH", body: JSON.stringify(payload) });
      setCert((prev) => prev.map((c) => (c.id === editingCertId ? { ...c, ...payload } : c)));
      setEditingCertId(null);
    } else {
      const res = await fetch("/api/certifications", { method: "POST", body: JSON.stringify(payload) });
      const created = await res.json();
      if (created.data) setCert((prev) => [...prev, ...created.data]);
    }
    certForm.reset({});
  }

  async function handleDeleteCert(id: string) {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/certifications/${id}`, { method: "DELETE" });
    setCert((prev) => prev.filter((c) => c.id !== id));
  }

  function handleEditCertClick(item: Certificate) {
    setEditingCertId(item.id);
    certForm.reset(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- 5. SKILLS CRUD ---
  async function onSubmitSkill(data: Skills) {
    if (editingSkillId) {
      await fetch(`/api/skills/${editingSkillId}`, { method: "PATCH", body: JSON.stringify(data) });
      setSkill((prev) => prev.map((s) => (s.id === editingSkillId ? { ...s, ...data } : s)));
      setEditingSkillId(null);
    } else {
      const res = await fetch("/api/skills", { method: "POST", body: JSON.stringify(data) });
      const created = await res.json();
      if (created.data) setSkill((prev) => [...prev, ...created.data]);
    }
    skillForm.reset({});
  }

  async function handleDeleteSkill(id: string) {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    setSkill((prev) => prev.filter((s) => s.id !== id));
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-muted/30 p-4 lowercase">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>admin login</CardTitle>
            <CardDescription>please sign in to manage your portfolio.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">email</label>
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                login
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
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
              <Button variant="outline" onClick={async () => {
                await supabase.auth.signOut();
                setIsAuthenticated(false);
              }}>
                logout
              </Button>            
              <Button nativeButton={false} variant="outline" render={<Link href="/" />}>
              view live site
            </Button>
          </div>
        </div>

        {/* Tabs */}
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
                  <form onSubmit={heroForm.handleSubmit(handleUpdateHero)}>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">role badge</label>
                      <Input {...heroForm.register("role")} />
                    </div>
                    <div className="grid gap-2 mt-4">
                      <label className="text-sm font-medium">headline</label>
                      <Input {...heroForm.register("headline")} />
                    </div>
                    <div className="grid gap-2 mt-4">
                      <label className="text-sm font-medium">sub-headline</label>
                      <Input {...heroForm.register("headline_1")} />
                    </div>
                    <div className="grid gap-2 mt-4">
                      <label className="text-sm font-medium">short bio</label>
                      <Input {...heroForm.register("shortbio")} />
                    </div>
                    <div className="grid gap-2 mt-4">
                      <label className="text-sm font-medium">call to action text</label>
                      <Input {...heroForm.register("cta")} />
                    </div>
                    <div className="grid gap-2 mt-4">
                      <label className="text-sm font-medium">hero image (upload or paste url)</label>
                      <div className="flex gap-2 items-center">
                        <Input {...heroForm.register("image_src")} placeholder="https://..." className="flex-1" />
                        <Input 
                          type="file" 
                          accept="image/*" 
                          className="w-auto cursor-pointer"
                          disabled={isUploading}
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const url = await uploadImageToSupabase(e.target.files[0]);
                              if (url) heroForm.setValue("image_src", url);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2 pt-4 mt-4 border-t">
                      <label className="text-sm font-medium">about section text</label>
                      <Input {...heroForm.register("about")} />
                    </div>
                    <Button type="submit" className="mt-6" disabled={isSaving}>
                      {isSaving ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : null}
                      {isSaving ? "saving..." : "update hero & about"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2. EXPERIENCE TAB */}
          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{editingExpId ? "edit experience" : "add new experience"}</CardTitle>
                  <CardDescription>{editingExpId ? "updating existing record." : "fill out the form below to add a new role."}</CardDescription>
                </div>
                {editingExpId && (
                  <Button variant="ghost" onClick={() => { setEditingExpId(null); expForm.reset({}); }}>
                    <X className="h-4 w-4 mr-2" /> cancel edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={expForm.handleSubmit(onSubmitExp)}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2"><label className="text-sm font-medium">company</label><Input {...expForm.register("company")} placeholder="e.g. FlyRank" required /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">position</label><Input {...expForm.register("position")} placeholder="e.g. AI Engineer" required /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">type</label><Input {...expForm.register("type")} placeholder="e.g. Full-time, Internship" required /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">tech stack</label><Input {...expForm.register("stack")} placeholder="React, Next.js (comma separated)" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">start date</label><Input {...expForm.register("start_date")} type="month" required /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">end date</label><Input {...expForm.register("end_date")} type="month" placeholder="Leave blank if present" /></div>
                  </div>
                  <div className="grid gap-2"><label className="text-sm font-medium">description</label><Textarea {...expForm.register("description")} placeholder="What did you do there?" required /></div>
                  <Button type="submit" className="w-fit">
                    {editingExpId ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />} 
                    {editingExpId ? "save changes" : "add experience"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold tracking-tight mt-4">existing experiences</h3>
              {exp?.map((item) => (
                <Card key={item.id} className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 ${editingExpId === item.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                  <div>
                    <h4 className="font-medium">{item.position} <span className="text-muted-foreground font-normal">at {item.company}</span></h4>
                    <p className="text-sm text-muted-foreground">{item.start_date} - {item.end_date || "Present"}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" onClick={() => handleEditExpClick(item)}><Pencil className="h-4 w-4 mr-2" /> edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteExp(item.id)}><Trash2 className="h-4 w-4 mr-2" /> delete</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 3. PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{editingProjId ? "edit project" : "add new project"}</CardTitle>
                  <CardDescription>showcase your latest work and case studies.</CardDescription>
                </div>
                {editingProjId && (
                  <Button variant="ghost" onClick={() => { setEditingProjId(null); projForm.reset({}); }}>
                    <X className="h-4 w-4 mr-2" /> cancel edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={projForm.handleSubmit(onSubmitProj)}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2"><label className="text-sm font-medium">project title</label><Input {...projForm.register("title")} placeholder="e.g. AI Portfolio" required /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">role</label><Input {...projForm.register("role")} placeholder="e.g. Lead Developer" required /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">project type</label><Input {...projForm.register("type")} placeholder="e.g. Web App, Case Study" /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">live / github url</label><Input {...projForm.register("live_git_url")} placeholder="https://..." /></div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">project image (upload or paste url)</label>
                      <div className="flex gap-2 items-center">
                        <Input {...projForm.register("imagesource")} placeholder="https://..." className="flex-1" />
                        <Input 
                          type="file" 
                          accept="image/*" 
                          className="w-auto cursor-pointer"
                          disabled={isUploading}
                          onChange={async (e) => {
                            if (e.target.files && e.target.files[0]) {
                              const url = await uploadImageToSupabase(e.target.files[0]);
                              if (url) projForm.setValue("imagesource", url);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2"><label className="text-sm font-medium">tech stack</label><Input {...projForm.register("stack")} placeholder="React, Firebase (comma separated)" /></div>
                  </div>
                  <div className="grid gap-2"><label className="text-sm font-medium">description</label><Textarea {...projForm.register("description")} placeholder="Describe the project and your impact..." required /></div>
                  <Button type="submit" className="w-fit">
                    {editingProjId ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />} 
                    {editingProjId ? "save changes" : "add project"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {projects?.map((item) => (
                <Card key={item.id} className={`flex flex-col justify-between p-4 space-y-4 ${editingProjId === item.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditProjClick(item)}><Pencil className="h-4 w-4 mr-2" /> edit</Button>
                    <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDeleteProj(item.id)}><Trash2 className="h-4 w-4 mr-2" /> delete</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 4. CERTIFICATES TAB */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{editingCertId ? "edit certificate" : "add new certificate"}</CardTitle>
                  <CardDescription>add a new certification or course completion.</CardDescription>
                </div>
                {editingCertId && (
                  <Button variant="ghost" onClick={() => { setEditingCertId(null); certForm.reset({}); }}>
                    <X className="h-4 w-4 mr-2" /> cancel edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={certForm.handleSubmit(onSubmitCert)}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2 md:col-span-2"><label className="text-sm font-medium">certificate title</label><Input {...certForm.register("title")} placeholder="e.g. Google UX Design" required /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">issuing organization</label><Input {...certForm.register("issuer")} placeholder="e.g. Coursera" required /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">credential url</label><Input {...certForm.register("credential_url")} placeholder="https://..." /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">issue month</label><Input {...certForm.register("issue_month")} placeholder="e.g. August" required /></div>
                    <div className="grid gap-2"><label className="text-sm font-medium">issue year</label><Input {...certForm.register("issue_year")} type="number" placeholder="2026" required /></div>
                  </div>
                  <Button type="submit" className="w-fit">
                    {editingCertId ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />} 
                    {editingCertId ? "save changes" : "add certificate"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              {cert?.map((item) => (
                <Card key={item.id} className={`flex flex-col justify-between p-4 space-y-4 ${editingCertId === item.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.issuer} ({item.issue_month} {item.issue_year})</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditCertClick(item)}><Pencil className="h-4 w-4 mr-2" /> edit</Button>
                    <Button variant="destructive" size="sm" className="flex-1" onClick={() => handleDeleteCert(item.id)}><Trash2 className="h-4 w-4 mr-2" /> delete</Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* 5. SKILLS TAB */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{editingSkillId ? "edit skill" : "add new skill"}</CardTitle>
                  <CardDescription>add a new technology or tool to your stack.</CardDescription>
                </div>
                {editingSkillId && (
                  <Button variant="ghost" onClick={() => { setEditingSkillId(null); skillForm.reset({}); }}>
                    <X className="h-4 w-4 mr-2" /> cancel edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={skillForm.handleSubmit(onSubmitSkill)}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">skill category</label>
                      <Input {...skillForm.register("category")} placeholder="e.g. Frontend, Backend, Tools" required />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">skill name</label>
                      <Input {...skillForm.register("name")} placeholder="e.g. React, Next.js, Figma" required />
                    </div>
                  </div>
                  <Button type="submit" className="w-fit">
                    {editingSkillId ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />} 
                    {editingSkillId ? "save changes" : "add skill"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {skills?.map((item) => (
                <Card key={item.id} className={`flex justify-between items-center p-4 ${editingSkillId === item.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                  <div>
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => { setEditingSkillId(item.id); skillForm.reset(item); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => handleDeleteSkill(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </main>
  );
}
