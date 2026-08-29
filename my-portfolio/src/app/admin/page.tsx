"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Pencil } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  // NOTE: You can add your Supabase fetching/updating logic in this file later!
  
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
            <Button variant="default">
              save all changes
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
                <div className="grid gap-2">
                  <label className="text-sm font-medium">role badge</label>
                  <Input placeholder="computer engineering graduate" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">headline</label>
                  <Input placeholder="building clear, responsive websites." />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">sub-headline</label>
                  <Input placeholder="Aspiring frontend developer..." />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">short bio</label>
                  <Textarea placeholder="Self-taught through independent practice..." rows={3} />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">call to action text</label>
                  <Input placeholder="open to junior frontend / web developer roles." />
                </div>
                <div className="grid gap-2 pt-4 border-t">
                  <label className="text-sm font-medium">about section text</label>
                  <Textarea placeholder="BS Computer Engineering graduate..." rows={5} />
                </div>
                <Button className="mt-4">update hero & about</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2. EXPERIENCE TAB */}
          <TabsContent value="experience">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>experience</CardTitle>
                  <CardDescription>manage your internships and jobs.</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  add new
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  {/* Mock Item 1 */}
                  <div className="p-4 flex justify-between items-center bg-background">
                    <div>
                      <p className="font-medium">Frontend AI Engineer <span className="text-muted-foreground font-normal">at FlyRank AI</span></p>
                      <p className="text-sm text-muted-foreground">July 2026 - Present</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                  {/* Mock Item 2 */}
                  <div className="p-4 flex justify-between items-center bg-background">
                    <div>
                      <p className="font-medium">Intern <span className="text-muted-foreground font-normal">at DICT Region-4A</span></p>
                      <p className="text-sm text-muted-foreground">Jun 2025 - Aug 2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 3. PROJECTS TAB */}
          <TabsContent value="projects">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>projects</CardTitle>
                  <CardDescription>showcase your latest work.</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  add new
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  {/* Mock Item */}
                  <div className="p-4 flex justify-between items-center bg-background">
                    <div>
                      <p className="font-medium">my portfolio</p>
                      <p className="text-sm text-muted-foreground">next.js, tailwind css, supabase</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 4. CERTIFICATES TAB */}
          <TabsContent value="certificates">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>certificates</CardTitle>
                  <CardDescription>add or remove your credentials.</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  add new
                </Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  {/* Mock Item */}
                  <div className="p-4 flex justify-between items-center bg-background">
                    <div>
                      <p className="font-medium">Google AI Essentials <span className="text-muted-foreground font-normal">by Google</span></p>
                      <p className="text-sm text-muted-foreground">November 2024</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </main>
  );
}
