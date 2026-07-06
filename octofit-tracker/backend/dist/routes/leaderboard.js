"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardEntry_js_1 = require("../models/LeaderboardEntry.js");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const entries = await LeaderboardEntry_js_1.LeaderboardEntry.find().populate('user').sort({ score: -1 }).lean();
    res.json(entries.map((entry, index) => ({ ...entry, rank: index + 1 })));
});
exports.default = router;
