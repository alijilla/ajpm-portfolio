# Full-Stack AI Portfolio 🚀

A modern, highly responsive personal portfolio and Content Management System (CMS) built with **Next.js**, **TypeScript**, and **Tailwind CSS**. 

This project goes beyond a static website by integrating a **Supabase PostgreSQL backend** for dynamic content management and the **Google Gemini API** to power a custom "Ask Me Anything" AI assistant.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)

## ✨ Features

- **Custom Admin Dashboard (CMS):** A secure, authenticated `/admin` route allows for real-time CRUD operations. Update the Hero section, Experiences, Projects, and Certificates without touching the code.
- **AI-Powered Chatbot:** Integrated with the **Google Gemini API**, visitors can chat with an AI assistant trained on my resume and professional experience.
- **Secure Contact Form:** Powered by the **Resend API**, ensuring messages sent through the portfolio are reliably delivered to my inbox.
- **Cloud Storage:** Image uploading is integrated directly into the Admin Dashboard using **Supabase Storage**.
- **Modern UI/UX:** Built with **shadcn/ui** and **Framer Motion** for sleek, minimalist components and smooth animations. Fully responsive across all devices.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database & Auth:** Supabase (PostgreSQL)
- **AI Integration:** Google Gemini API
- **Emails:** Resend API
- **Deployment:** Vercel

## 🚀 Getting Started Locally

To run this project on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/alijilla/ajpm-portfolio.git
cd my-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and add the following API keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contact
Alyssa Jade P. Merjilla  
- LinkedIn: [linkedin.com/in/alyssa-jade-merjilla](https://linkedin.com/in/alyssa-jade-merjilla)
- GitHub: [@alijilla](https://github.com/alijilla)
