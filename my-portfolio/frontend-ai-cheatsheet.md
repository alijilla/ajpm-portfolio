# 🚀 The Ultimate Frontend Engineer Cheatsheet
**React, Next.js, Tailwind, Shadcn, Supabase, Zod, & CRUD**

This is your master reference guide for modern web development. Keep this open when building full-stack apps!

---

## 1. ⚛️ Next.js (App Router) & React

### Server Components vs Client Components
By default, every file in Next.js `app/` is a **Server Component**. They run on the server, fetch data instantly, and send HTML to the browser.
* **Use Server Components for:** Fetching data (`await`), SEO, reading files, direct database access.
* **Use Client Components for:** Interactivity (onClick, onChange), State (`useState`), Lifecycle (`useEffect`), and Browser APIs (window). Add `"use client"` at the very top.

### Routing (App Router)
* `app/page.tsx` ➡️ `yourwebsite.com/`
* `app/admin/page.tsx` ➡️ `yourwebsite.com/admin`
* `app/api/hero/route.ts` ➡️ `yourwebsite.com/api/hero`

---

## 2. 🗄️ Supabase & CRUD Operations

### 1. CREATE (Insert Data)
```typescript
const { data, error } = await supabase
  .from('experiences')
  .insert([{ company: 'FlyRank', position: 'AI Engineer' }])
  .select(); // .select() returns the newly created row!
```

### 2. READ (Fetch Data)
```typescript
// Fetch many rows (Returns an Array)
const { data: experiences } = await supabase.from('experiences').select('*');

// Fetch a single row (Returns an Object)
const { data: hero } = await supabase.from('hero').select('*').single();

// Filter data
const { data } = await supabase.from('projects').select('*').eq('featured', true);
```

### 3. UPDATE (Modify Data)
```typescript
const { data, error } = await supabase
  .from('hero')
  .update({ headline: 'New Headline' })
  .eq('id', '123-abc'); // NEVER forget .eq(), or you will update every row!
```

### 4. DELETE (Remove Data)
```typescript
const { error } = await supabase
  .from('experiences')
  .delete()
  .eq('id', '123-abc');
```

---

## 3. 🛡️ Zod (Data Validation)
Use Zod to make sure the data a user types (or the database returns) is exactly what you expect.

### Defining a Schema
```typescript
import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(2, "Company name is too short"),
  start_date: z.string(),
  stack: z.array(z.string()).optional(), // An optional array of strings
});
```

### Validating Data (Usually in API Routes)
```typescript
const body = await request.json();
const result = experienceSchema.safeParse(body);

if (!result.success) {
  console.log("Validation failed:", result.error.flatten().fieldErrors);
  return Response.json({ error: "Invalid data" }, { status: 400 });
}
// result.data is now 100% type-safe!
const validData = result.data;
```

---

## 4. 🎨 Tailwind CSS
Tailwind uses utility classes. You don't write CSS; you combine classes.

* **Layout:** `flex`, `flex-col` (vertical), `grid`, `grid-cols-3`
* **Spacing:** `p-4` (padding inside), `m-4` (margin outside), `gap-4` (space between flex/grid items)
* **Sizing:** `w-full` (100% width), `h-screen` (100% viewport height), `max-w-5xl`
* **Typography:** `text-sm`, `text-2xl`, `font-bold`, `tracking-tight` (letter spacing), `lowercase`
* **Colors:** `bg-background`, `text-muted-foreground`, `border-border` (Uses your global CSS variables!)
* **Responsive:** `sm:flex` (applies flex on small screens and up), `md:grid`, `lg:p-8`

---

## 5. 🧩 Shadcn UI
Shadcn is NOT a component library you install via `npm`. You copy/paste the code into your project (`components/ui`) so you fully own it.

* **Installing a component:** `npx shadcn@latest add button`
* **Using it:** `import { Button } from "@/components/ui/button"`
* **Customizing:** Because the code lives in your `components/ui` folder, you can just open `button.tsx` and change the Tailwind classes if you want it to look different globally!
* **Base UI vs Radix:** Always check if a component uses `@base-ui` (requires `render={<element/>}`) or `@radix-ui` (requires `asChild`).

---

## 6. 🧠 Pro Techniques: Fetching & Rendering

### Technique 1: Safe Array Mapping
Never map over an array without checking if it exists, or your app will crash.
```tsx
// ❌ Bad: Crashes if projects is null
{projects.map(p => <Card key={p.id} />)}

// ✅ Good: The ? stops it from crashing if null
{projects?.map(p => <Card key={p.id} />)}

// ✅ Best (Fallback):
{(projects || []).map(p => <Card key={p.id} />)}
```

### Technique 2: Conditional Rendering
Show something only if a condition is true.
```tsx
// Using && (If isLoading is true, show the spinner)
{isLoading && <Loader2 className="animate-spin" />}

// Using Ternary ? : (If/Else)
{isSuccess ? <p>Saved!</p> : <button>Save</button>}
```

### Technique 3: Fetching Data in Client Components
When you can't use Server Components, this is the standard way to fetch data in React.
```tsx
"use client"
import { useState, useEffect } from "react";

export default function Profile() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('/api/user');
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []); // Empty array [] means "run once on load"

  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.name}</div>;
}
```
