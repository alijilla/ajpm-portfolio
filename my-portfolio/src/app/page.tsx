import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: skills, error } = await supabase
    .from("skills")
    .select("*");

  if (error) {
    return (
      <main>
        <h1>Error</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>My Skills</h1>

      {skills?.map((skill) => (
        <div key={skill.id}>
          <p>Name: {skill.name}</p>
          <p>Category: {skill.category}</p>
        </div>
      ))}
    </main>
  );
}