"use client";
import { skillsData } from "@/data/skill";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Skills() {
  const [tab, setTab] = useState(skillsData[0].category);

  return (
    <div>
      <Tabs value={tab} onValueChange={setTab} className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <TabsList className="self-start">
          {skillsData.map((group) => (
            <TabsTrigger key={group.category} value={group.category}>
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
                  variant="secondary"
                  className="text-xs px-3 py-1 rounded-md lowercase"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
