"use client";
import {skillsData} from "@/data/skill";
import { useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Skills() {
    
    const [tab, setTab] = useState(skillsData[0].category)
    return (   
        <section className="">
        <Tabs value={tab} onValueChange={setTab} orientation="vertical" className="flex flex-row gap-4">
            <TabsList>
            {skillsData.map(group => (
            <TabsTrigger 
             key={group.category}value={group.category}>
                {group.category}
                </TabsTrigger>
           
           ))}
            </TabsList>
        
        
        {skillsData.map((group) => (
          <TabsContent key={group.category} value={group.category}>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge
                  key={skill}
                  className="w-fit text-xs text-white bg-black rounded-md p-2 mt-2 lowercase"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </TabsContent>))}
        </Tabs>

        </section>
    );
}
  
