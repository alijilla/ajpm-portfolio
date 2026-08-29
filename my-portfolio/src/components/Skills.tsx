
"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";


type Skills = {
  id: string;
  category: string;
  name: string;
};

export default function Skills() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const [tab, setTab] = useState("Frontend");

  useEffect(() => {
    async function fetchSkills() {
      const response = await fetch("/api/skills");
      const result = await response.json();

      setSkills(result.data);
    }

    fetchSkills();
  }, []);

  const categories = [
    ...new Set(skills.map((item: Skills) => item.category)),
  ];

  return (
    <div>
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex flex-col gap-4 sm:flex-row sm:gap-6"
      >
        <TabsList className="self-start">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab}>
          <div className="flex flex-wrap gap-2">
            {skills
              .filter((item: Skills) => item.category === tab)
              .map((item: Skills) => (
                <Badge
                  key={item.id}
                  variant="secondary"
                  className="text-xs px-3 py-1 rounded-md lowercase"
                >
                  {item.name}
                </Badge>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

