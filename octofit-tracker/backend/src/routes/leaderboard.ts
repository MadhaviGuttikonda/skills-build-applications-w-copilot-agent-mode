import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';

const router = Router();
const fallbackEntries = [
  { rank: 1, name: 'Ada Lovelace', score: 1280 },
  { rank: 2, name: 'Grace Hopper', score: 1190 },
];

router.get('/', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find().populate('user').sort({ score: -1 }).lean();
    const data = entries.length > 0 ? entries.map((entry, index) => ({ ...entry, rank: index + 1 })) : fallbackEntries;
    res.json(data);
  } catch (error) {
    console.error('Leaderboard route fallback:', error);
    res.json(fallbackEntries);
  }
});

export default router;
