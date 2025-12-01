Server helper for Supabase (service-key) operations

Overview
- This small Node server provides secure server-side endpoints that use the Supabase `SERVICE_KEY`.
- Use it to persist sensitive writes (upserting user profiles, saving roadmaps) without exposing the service key to the browser.

Files
- `supabaseServer.js` - Supabase client wrapper and helper functions (`upsertUserProfile`, `saveRoadmap`).
- `index.js` - Minimal Express server exposing `/api/upsert-profile` and `/api/save-roadmap` endpoints.

Setup
1. Install dependencies

```powershell
cd "c:\Users\user\Downloads\New folder"
npm install express @supabase/supabase-js dotenv cors body-parser
```

2. Populate `.env` with real Supabase values (do NOT commit `.env`):

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key_here
```

3. Run the server

```powershell
node server/index.js
```

Usage examples

- Upsert profile

```powershell
curl -X POST http://localhost:3000/api/upsert-profile -H "Content-Type: application/json" -d "{ \"id\": \"user-1\", \"email\": \"alice@example.com\", \"name\": \"Alice\" }"
```

- Save roadmap

```powershell
curl -X POST http://localhost:3000/api/save-roadmap -H "Content-Type: application/json" -d "{ \"user_id\": \"user-1\", \"roadmap\": { \"steps\": [\"learn python\"] } }"
```

Database schema (example)

Run these in Supabase SQL editor to create minimal tables:

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

Notes
- Keep the `SUPABASE_SERVICE_KEY` server-side only. Use `VITE_SUPABASE_ANON_KEY` for client-side reads where appropriate.
- You can extend the server to validate incoming requests with a JWT or API key for additional security.
