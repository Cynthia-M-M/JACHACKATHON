# Deployment Guide

## Quick Start: Deploy to Vercel (Frontend)

1. **Connect GitHub repo to Vercel**
   - Visit https://vercel.com/new
   - Select your GitHub repo
   - Click "Deploy"

2. **Environment Variables**
   - Add to Vercel project settings:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your_key
     ```

3. **Auto-deploy on push**
   - Main branch auto-deploys to production
   - Preview deployments for PRs

## Backend Deployment: Render or AWS

### Option A: Render (Recommended for MVP)
1. Push `server/` to GitHub
2. Create new service on render.com
3. Set environment variables:
   ```
   SUPABASE_URL=...
   SUPABASE_SERVICE_KEY=...
   PORT=4000
   ```
4. Deploy

### Option B: AWS Lambda + RDS
1. Package Express server as Lambda function
2. Use RDS for Supabase (or stick with Supabase-managed DB)
3. API Gateway for routing
4. CloudFront for CDN

## Database: Supabase (PostgreSQL)

1. **Create tables** (run in Supabase SQL editor):
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

2. **Enable Row Level Security (RLS)**
   - Policies to ensure users can only see their own data

3. **Set up backups**
   - Supabase handles auto-backups (14-day retention)

## Monitoring & Analytics

1. **Sentry (Error Tracking)**
   - Add Sentry SDK to frontend: `npm install @sentry/react`
   - Add to main.tsx:
     ```typescript
     import * as Sentry from '@sentry/react';
     Sentry.init({ dsn: process.env.VITE_SENTRY_DSN });
     ```

2. **PostHog or Mixpanel (Product Analytics)**
   - Track user actions, roadmap creation, course completion
   - Monitor adoption metrics for investors

3. **Uptime Monitoring**
   - Use UptimeRobot or Datadog to monitor API health

## CI/CD Pipeline

### GitHub Actions (Free)

**.github/workflows/deploy.yml**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run typecheck
      - run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - uses: vercel/action@main
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Performance & Cost Optimization

### Frontend (Vercel)
- Automatic image optimization
- Code splitting via Vite
- Edge middleware for analytics
- **Estimated cost:** $0 (hobby) – $50/mo (production)

### Backend (Render)
- Auto-scaling based on traffic
- **Estimated cost:** $7/mo (starter) – $50+/mo (production)

### Database (Supabase)
- Free tier: 500MB storage, 2GB bandwidth
- **Estimated cost:** $0 (dev) – $100+/mo (production)

### LLM & APIs
- Use multi-provider strategy (OpenAI, Anthropic, local)
- Cache LLM responses to reduce costs
- **Estimated cost:** $100–$500/mo (depending on usage)

## Security Checklist

- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set up Supabase RLS policies
- [ ] Rotate API keys monthly
- [ ] Enable 2FA on GitHub, Vercel, Supabase
- [ ] Run security audit: `npm audit fix`
- [ ] Add rate limiting to API endpoints
- [ ] Set up DDoS protection (Vercel provides this)

## Rollback & Disaster Recovery

1. **Vercel rollback:** One-click rollback in dashboard
2. **Database:** Supabase backups restore in minutes
3. **Runbook:** Document recovery steps in team wiki

## Support & Escalation

- **Vercel support:** vercel.com/support
- **Supabase support:** supabase.com/support
- **Render support:** render.com/support
- **Team Slack channel:** #production-incidents
