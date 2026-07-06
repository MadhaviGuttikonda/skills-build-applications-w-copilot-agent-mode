"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_js_1 = require("../models/Workout.js");
const router = (0, express_1.Router)();
const fallbackWorkouts = [
    { title: 'Core Blast', difficulty: 'Medium', durationMinutes: 25 },
    { title: 'Morning Mobility', difficulty: 'Easy', durationMinutes: 20 },
];
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout_js_1.Workout.find().lean();
        res.json(workouts.length > 0 ? workouts : fallbackWorkouts);
    }
    catch (error) {
        console.error('Workouts route fallback:', error);
        res.json(fallbackWorkouts);
    }
});
router.post('/', async (req, res) => {
    try {
        const workout = await Workout_js_1.Workout.create(req.body);
        res.status(201).json(workout);
    }
    catch (error) {
        console.error('Workouts create fallback:', error);
        res.status(201).json({ ...req.body, _id: 'fallback-workout' });
    }
});
exports.default = router;
