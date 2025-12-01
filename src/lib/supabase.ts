// Supabase client initializer for the frontend (Vite + React)
// Install dependency: `npm install @supabase/supabase-js`

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // This is a development-time warning; runtime code should handle missing keys gracefully
  console.warn('Supabase keys not found in environment. Check .env or .env.example');
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_ANON_KEY ?? '');

export default supabase;
