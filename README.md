# Smart Career Path Navigator 🚀

**AI-powered career guidance platform that matches your skills to roles, courses, and real job market opportunities.**

> Built for the AI Hackathon with Jac Language, byLLM, and Supabase. Investor-ready with production deployment.

## 🎯 The Problem

**800M+ students and career-changers** struggle with:
- Fragmented, static learning resources
- No data-driven role matching
- Inability to adapt to market shifts
- Expensive career coaching

**Our Solution:** AI agents that intelligently map skills → roles → courses → jobs in real-time.

## ✨ Key Features

- **🤖 AI-Powered Roadmaps** – Personalized 8-16 week learning paths using byLLM
- **📊 Graph-Based Matching** – OSP (Object-Spatial) graphs for deep skill-to-role analysis
- **💼 Real Job Insights** – Live job market data integrated into recommendations
- **📈 Adaptive Plans** – Roadmaps auto-adjust as market demand shifts
- **🚀 Multi-Agent Architecture** – Resume parser, skill graph manager, roadmap planner, job fetcher
- **💻 Production Ready** – Deployed on Vercel + Render + Supabase

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Tailwind CSS, shadcn/ui, Vite |
| **Backend** | Express (Node.js), Jac Language |
| **AI/ML** | byLLM, OpenAI/Anthropic/Local LLMs |
| **Database** | Supabase (PostgreSQL) |
| **Deployment** | Vercel (frontend), Render (backend) |
| **Monitoring** | Sentry, PostHog/Mixpanel |

## 🎬 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Copy `.env.example` to `.env` and fill in your keys:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

### 3. Start Dev Server (Frontend + Backend)
```bash
npm run dev:all
```

**Frontend:** http://localhost:3000  
**Backend API:** http://localhost:4000

### 4. Load Demo Data (Optional)
```bash
jac run main.jac
```

## 📱 Demo

**Live:** [https://smart-career-path.vercel.app](https://smart-career-path.vercel.app)  

**Demo Account:**
- Email: alice@example.com
- Password: demo123

Sample roadmaps included for Data Engineer, ML Engineer, Product Manager roles.

## 🏢 Business Model

| Segment | Model | ARR Potential |
|---------|-------|--------------|
| **B2C (Learners)** | Freemium + Premium ($15–$20/mo) | $500k–$2M |
| **B2B (Enterprises)** | White-label API + SaaS ($500–$5k/mo) | $2M–$10M |
| **Talent Sourcing** | Per-assessment billing ($2–$5) | $200k–$1M |

## 📊 Key Metrics (12-Month Targets)

- **DAU:** 5,000
- **Paid Conversion:** 5–8%
- **LTV:** $180
- **CAC:** <$5 (organic)
- **NRR:** 120%+
- **B2B Logos:** 10+ enterprise pilots

## 🔗 API Endpoints

### Orchestrator Walkers (Jac)
```bash
POST /jac/spawn
{
  "walker": "Orchestrator",
  "spawn": "generate_roadmap",
  "ctx": { "name": "Alice", "resume_text": "..." },
  "params": ["Data Engineer"]
}
```

### Supabase Helper (Express)
```bash
POST http://localhost:4000/api/upsert-profile
POST http://localhost:4000/api/save-roadmap
```

See [README_SERVER.md](./server/README_SERVER.md) for full API docs.

## 📚 Documentation

- **[PITCH.md](./PITCH.md)** – Investor pitch deck outline
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** – Production deployment guide
- **[README_SERVER.md](./server/README_SERVER.md)** – Backend API docs
- **[main.jac](./main.jac)** – Jac language source code with multi-agent architecture

## 🚢 Deployment

### One-Click Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjaseci-labs%2Fsmart-career-path)

### Manual Deploy
See [DEPLOYMENT.md](./DEPLOYMENT.md) for:
- Vercel (frontend)
- Render (backend)
- Supabase (database)
- CI/CD with GitHub Actions
- Monitoring & analytics setup

## 🛠️ Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # shadcn/ui components
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main application component
├── index.css            # Global styles with Tailwind
└── main.tsx             # Application entry point
```

---

# Smart Career Path Navigator (AI Hackathon Project)

## Overview
This project is a personalized career guidance platform built with JacLang, byLLM, and Supabase. It helps users map their skills to career roles, discover learning paths, and track progress using an OSP graph and LLM-powered agents.

## Features
- JacLang backend with multi-agent design (walkers for parsing, planning, and orchestration)
- byLLM integration for skill extraction and roadmap generation
- Supabase integration for persistent user profiles and roadmaps
- Jac-Client/React frontend (or cURL/Postman) can call backend walkers using `spawn()`

## Setup
1. **Install dependencies**
    - Python: Jaseci, JacLang, byLLM, etc. (see hackathon instructions)
    - Node: `npm install express @supabase/supabase-js dotenv cors body-parser`
    - Frontend: `npm install @supabase/supabase-js`

2. **Configure environment**
    - Copy `.env.example` to `.env` and fill in your Supabase and byLLM keys.

3. **Start the backend server**
    ```powershell
    node server/index.js
    ```

4. **Seed demo data**
    - Run the `Loader.init_graph` walker in Jac to create sample roles, skills, and courses.

## Jac-Client / API Usage Examples

### Call Orchestrator Walkers via Jac-Client (spawn)

- **Generate a career roadmap**
   ```json
   POST /jac/spawn
   {
      "walker": "Orchestrator",
      "spawn": "generate_roadmap",
      "ctx": {
         "name": "Alice",
         "email": "alice@example.com",
         "current_role": "Student",
         "resume_text": "Python, ETL, data projects..."
      },
      "params": ["Data Engineer"]
   }
   ```
   - Returns: `{ user, target_role, roadmap, jobs }`

- **Evaluate a user profile**
   ```json
   POST /jac/spawn
   {
      "walker": "Orchestrator",
      "spawn": "evaluate_profile",
      "ctx": {
         "name": "Alice",
         "email": "alice@example.com",
         "current_role": "Student",
         "resume_text": "Python, ETL, data projects..."
      }
   }
   ```

### Save Roadmap to Supabase (from frontend or server)

- **Frontend (React/JS)**
   ```js
   import { supabase } from './src/lib/supabase';
   await supabase.from('roadmaps').insert([{ user_id: 'user-1', roadmap: { steps: ['learn python'] } }]);
   ```

- **Server (Node/Express)**
   ```js
   fetch('http://localhost:3000/api/save-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: 'user-1', roadmap: { steps: ['learn python'] } })
   });
   ```

## Database Schema (Supabase SQL)
```sql
create table if not exists users (
   id text primary key,
   email text unique,
   name text,
   profile jsonb,
   updated_at timestamptz default now()
);

create table if not exists roadmaps (
   id uuid default gen_random_uuid() primary key,
   user_id text references users(id),
   roadmap jsonb,
   created_at timestamptz default now()
);
```

## Demo Data
- Use the `Loader.init_graph` walker to seed roles, skills, and courses for testing.

## Notes
- Never expose your Supabase service key in frontend code.
- byLLM and JacLang must be configured with valid API keys for LLM features.
- For full hackathon requirements, see the detailed plan in this repo.
## 🎨 Customization

### Adding New shadcn/ui Components

This template is pre-configured with shadcn/ui. You can add more components by creating them in the `src/components/ui/` directory.

### Tailwind Configuration

The Tailwind configuration is set up with shadcn/ui color variables. You can customize colors and other design tokens in:

- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - CSS custom properties for themes

### TypeScript Configuration

Path mapping is configured for clean imports:

```typescript
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

## 🌗 Dark Mode

The template includes dark mode support through Tailwind's `dark:` classes and CSS custom properties.

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

**⚡ Powered by [Dala](https://dala.gebeya.com)** - The AI-powered web development platform that helps you build full-stack applications faster.

---

## 🤖 What is Dala?

**[Gebeya Dala](https://dala.gebeya.com)** is an intelligent web development platform that accelerates your React development workflow. Build, preview, and deploy web applications, and instant development environments.

🔗 **Try Dala:** [dala.gebeya.com](https://dala.gebeya.com)

### Why Use Dala?

- **AI-Powered Development** - Get intelligent code suggestions and automated component generation
- **Instant Preview** - See your changes live in real-time sandbox environments
- **Zero Setup** - No local environment configuration needed
- **Collaborative** - Build and share projects with your team
- **Deployment Ready** - One-click deployment to production

---

Built with ❤️ by the Dala team to help developers build faster and smarter.
