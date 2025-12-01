import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.warn('Supabase service credentials missing. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in .env');
}

export const supabase = createClient(SUPABASE_URL ?? '', SUPABASE_SERVICE_KEY ?? '');

export async function upsertUserProfile(profile) {
  try {
    // Expect profile to contain an `id` or unique identifier (e.g., email)
    const { data, error } = await supabase.from('users').upsert(profile).select();
    if (error) throw error;
    return { data };
  } catch (err) {
    console.error('upsertUserProfile error:', err.message || err);
    throw err;
  }
}

export async function saveRoadmap(user_id, roadmap) {
  try {
    const payload = {
      user_id,
      roadmap,
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('roadmaps').insert([payload]).select();
    if (error) throw error;
    return { data };
  } catch (err) {
    console.error('saveRoadmap error:', err.message || err);
    throw err;
  }
}
