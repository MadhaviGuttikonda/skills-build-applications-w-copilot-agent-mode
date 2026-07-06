"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_js_1 = require("../models/Team.js");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await Team_js_1.Team.find().populate('members').lean();
    res.json(teams);
});
router.post('/', async (req, res) => {
    const team = await Team_js_1.Team.create(req.body);
    res.status(201).json(team);
});
exports.default = router;
