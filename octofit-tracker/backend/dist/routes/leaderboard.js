"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_js_1 = require("../models/LeaderboardEntry.js");
const router = (0, express_1.Router)();
const fallbackEntries = [
    { rank: 1, name: 'Ada Lovelace', score: 1280 },
    { rank: 2, name: 'Grace Hopper', score: 1190 },
];
router.get('/', async (_req, res) => {
    try {
        const entries = await LeaderboardEntry_js_1.LeaderboardEntry.find().populate('user').sort({ score: -1 }).lean();
        const data = entries.length > 0 ? entries.map((entry, index) => ({ ...entry, rank: index + 1 })) : fallbackEntries;
        res.json(data);
    }
    catch (error) {
        console.error('Leaderboard route fallback:', error);
        res.json(fallbackEntries);
    }
});
exports.default = router;
