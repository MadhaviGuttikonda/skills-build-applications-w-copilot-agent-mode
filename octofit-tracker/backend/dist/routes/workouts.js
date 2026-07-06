"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_js_1 = require("../models/Workout.js");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await Workout_js_1.Workout.find().lean();
    res.json(workouts);
});
router.post('/', async (req, res) => {
    const workout = await Workout_js_1.Workout.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
