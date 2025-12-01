import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { upsertUserProfile, saveRoadmap } from './supabaseServer.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

app.get('/', (req, res) => res.send('Supabase helper server running'));

app.post('/api/upsert-profile', async (req, res) => {
  try {
    const profile = req.body;
    if (!profile) return res.status(400).json({ error: 'Missing profile in body' });
    const result = await upsertUserProfile(profile);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || String(err) });
  }
});

app.post('/api/save-roadmap', async (req, res) => {
  try {
    const { user_id, roadmap } = req.body;
    if (!user_id || !roadmap) return res.status(400).json({ error: 'Missing user_id or roadmap' });
    const result = await saveRoadmap(user_id, roadmap);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || String(err) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
