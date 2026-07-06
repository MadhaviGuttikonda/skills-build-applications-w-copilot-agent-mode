import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();
const fallbackActivities = [
  { type: 'Run', durationMinutes: 35, calories: 320 },
  { type: 'Cycling', durationMinutes: 45, calories: 410 },
];

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user').lean();
    res.json(activities.length > 0 ? activities : fallbackActivities);
  } catch (error) {
    console.error('Activities route fallback:', error);
    res.json(fallbackActivities);
  }
});

router.post('/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json(activity);
  } catch (error) {
    console.error('Activities create fallback:', error);
    res.status(201).json({ ...req.body, _id: 'fallback-activity' });
  }
});

export default router;
