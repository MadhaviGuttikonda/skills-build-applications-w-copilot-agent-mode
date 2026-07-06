import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (_req, res) => {
  const entries = await LeaderboardEntry.find().populate('user').sort({ score: -1 }).lean();
  res.json(entries.map((entry, index) => ({ ...entry, rank: index + 1 })));
});

export default router;
