# End-to-End Testing Guide

## System Overview

Your Smart Career Path Navigator is now **fully integrated** with:
- ✅ **Supabase Authentication** (Magic Link + Email/Password)
- ✅ **React Dashboard** with real-time roadmap loading
- ✅ **Express Backend** with persistence endpoints
- ✅ **Jac Multi-Agent System** that auto-saves roadmaps to database
- ✅ **Job Board Integration** with real company links

---

## Setup (One-Time)

### 1. **Verify .env is configured**
```bash
# Check .env has these variables:
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

If missing, fill from Supabase dashboard (Settings → API).

### 2. **Create Supabase Tables**

Run in Supabase SQL Editor:

```sql
-- Users table (auto-created by Supabase auth)
-- Just verify it exists

-- Roadmaps table
CREATE TABLE public.roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;

-- Users can see their own roadmaps
CREATE POLICY "Users see own roadmaps" ON public.roadmaps
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users create own roadmaps" ON public.roadmaps
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

---

## Testing Workflow

### **Test 1: Authentication Flow**

**Step 1.1: Start servers**
```bash
npm run dev:all
# Opens on http://localhost:3001
```

**Step 1.2: See Auth Screen**
- You should see the **Auth component** (not the dashboard)
- Options available:
  - Sign up with email/password
  - Log in with email/password
  - Send magic link
  - Continue as guest (demo mode)

**Step 1.3: Test Signup**
1. Click "Email & Password" tab
2. Fill in:
   - Full Name: "John Career"
   - Email: `john@example.com`
   - Password: `SecurePass123`
   - Confirm: `SecurePass123`
3. Click "Sign Up"
4. Check email for confirmation link (in dev, use Supabase email preview)
5. After confirmation, you should be logged in

**Step 1.4: Test Magic Link**
1. Switch to "Magic Link" tab
2. Enter email: `alice@example.com`
3. Click "Send Magic Link"
4. Check email inbox → click link
5. You should be logged in automatically

**Expected Result**: ✅ Logged in → Dashboard loads with demo roadmaps

---

### **Test 2: Dashboard & Real Data Loading**

**Step 2.1: Verify Auth State**
- Check header: shows email or "Demo Mode"
- Logout button visible in top-right

**Step 2.2: Check Roadmaps Load**
1. Once logged in, CareerDashboard should load
2. If Supabase has roadmaps for your user → **shows real data**
3. If no roadmaps in DB → **falls back to demo data** (Alice/Bob roadmaps)
4. Roadmap shows:
   - Progress bar (%)
   - Skill badges (Python, JavaScript, etc.)
   - Milestone timeline
   - Target role details

**Step 2.3: Switch Roadmaps** (if multiple exist)
- Roadmap selector dropdown should show all user roadmaps
- Clicking a roadmap updates the dashboard instantly

**Step 2.4: Click Job Links**
- Jobs sidebar shows 3-4 matching positions
- Click job card → opens real job posting URL (Stripe, OpenAI, etc.)
- Links should be clickable and valid

**Expected Result**: ✅ Dashboard displays real user data or fallback to demo

---

### **Test 3: Jac Integration & Persistence**

**Step 3.1: Generate Roadmap via Jac**
```bash
# In another terminal, run Jac directly
jac run main.jac
```

This triggers:
1. **ResumeParser** walker extracts skills from resume_text
2. **SkillGraphManager** creates/links skill nodes
3. **RoadmapPlanner** generates learning plan via byLLM
4. **Orchestrator** calls `/api/save-roadmap` endpoint
5. Express server upserts to Supabase `roadmaps` table

**Step 3.2: Verify in Supabase**
1. Open Supabase dashboard → Tables
2. Click `roadmaps` table
3. See newly created row with:
   - `user_id`: UUID of logged-in user
   - `roadmap`: JSON blob with target_role, missing_skills, milestones, status
   - `created_at`: timestamp

**Step 3.3: Refresh Dashboard**
- Reload dashboard → should fetch and display new roadmap from Supabase
- Verify progress persists across page reloads

**Expected Result**: ✅ Roadmap generated, saved to DB, displayed on dashboard

---

### **Test 4: Full End-to-End Flow**

**Scenario**: User goes from signup → roadmap generation → persistence → view on dashboard

**Steps**:
1. **Sign up** with new email
2. **Dashboard loads** with demo roadmaps initially
3. **Generate roadmap** via Jac: `jac run main.jac`
4. **Check Supabase**: New roadmap appears in table
5. **Refresh dashboard** (F5 or reload)
6. **Verify**: Personal roadmap is now displayed (not demo data)
7. **Logout** and login again
8. **Verify**: Roadmap persists across sessions

**Expected Result**: ✅ Complete flow works end-to-end

---

### **Test 5: Guest/Demo Mode**

**Steps**:
1. Click "Continue as Guest" on auth screen
2. Dashboard loads with demo data (Alice/Bob roadmaps)
3. Header shows "Demo Mode - Log in to see personal roadmaps"
4. All features work (view jobs, switch roadmaps, etc.)
5. Logout button not available

**Expected Result**: ✅ Demo works without authentication

---

## Troubleshooting

### **Issue: Auth Screen Keeps Showing**
- **Cause**: Supabase not configured or auth state not updating
- **Fix**: Check `.env` has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### **Issue: Jobs Page Shows No Links**
- **Cause**: demoJobs not imported or routes wrong
- **Fix**: Verify `src/data/demoData.ts` exports jobs with `.url` property

### **Issue: Roadmap Not Saving to Supabase**
- **Cause**: Express server offline or `/api/save-roadmap` failing
- **Fix**: 
  1. Check `http://localhost:4000` is accessible
  2. Check `.env` has `SUPABASE_SERVICE_KEY`
  3. Verify `roadmaps` table exists in Supabase

### **Issue: Port 3000 Already in Use**
- **Fix**: Vite auto-switches to 3001; connect to `http://localhost:3001`

---

## Key Features to Verify

| Feature | Location | Expected Behavior |
|---------|----------|-------------------|
| **Login** | Auth screen | Email/password or magic link works |
| **Signup** | Auth screen | Creates user, sends confirmation email |
| **Dashboard** | `/` (after login) | Loads roadmaps from Supabase |
| **Job Links** | Right sidebar | Click opens real company career pages |
| **Logout** | Header top-right | Clears auth, shows Auth screen |
| **Demo Mode** | Guest button | Shows demo roadmaps without login |
| **Roadmap Selector** | Top of dashboard | Switch between user's roadmaps |
| **Progress Bar** | Roadmap card | Shows completion % visually |
| **Skills Badges** | Roadmap card | Shows required skills as tags |
| **Persistence** | After refresh | Roadmap data persists (not lost on reload) |

---

## Deployment Checklist

Before going to production:

- [ ] Supabase production URL set in `.env`
- [ ] `SUPABASE_SERVICE_KEY` set on backend (Render/server)
- [ ] Database tables created with RLS policies
- [ ] Backend deployed to Render or similar (port 4000)
- [ ] Frontend deployed to Vercel
- [ ] `.env` variables set in hosting platforms
- [ ] Email provider configured for signup confirmations
- [ ] Test login → roadmap generation → persistence end-to-end
- [ ] Monitor Supabase for write errors

---

## Next Steps (Post-MVP)

1. **Roadmap Generation UI**: Add form to generate roadmaps from dashboard (instead of CLI)
2. **Resume Upload**: Let users upload `.pdf` or `.docx` resume for parsing
3. **Real LLM Integration**: Connect byLLM to actual OpenAI/Anthropic API keys
4. **Skill Assessment**: Add quiz or tests to validate skills
5. **Job Recommendations**: Real API integration to fetch live job postings
6. **Email Notifications**: Send roadmap progress reminders
7. **Team Collaboration**: Allow managers to view team member roadmaps

---

## Support

For issues or questions:
- Check logs: `npm run dev:all` terminal output
- Verify Supabase: Check Tables, Auth, API Keys in dashboard
- Test API: `curl http://localhost:4000/api/save-roadmap` (should return error if no body)
