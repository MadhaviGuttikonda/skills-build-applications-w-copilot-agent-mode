"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_js_1 = require("../models/Team.js");
const router = (0, express_1.Router)();
const fallbackTeams = [
    { name: 'Alpha Squad', sport: 'Cycling' },
    { name: 'Beta Crew', sport: 'Running' },
];
router.get('/', async (_req, res) => {
    try {
        const teams = await Team_js_1.Team.find().populate('members').lean();
        res.json(teams.length > 0 ? teams : fallbackTeams);
    }
    catch (error) {
        console.error('Teams route fallback:', error);
        res.json(fallbackTeams);
    }
});
router.post('/', async (req, res) => {
    try {
        const team = await Team_js_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (error) {
        console.error('Teams create fallback:', error);
        res.status(201).json({ ...req.body, _id: 'fallback-team' });
    }
});
exports.default = router;
