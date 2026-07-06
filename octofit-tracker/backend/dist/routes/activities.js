"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_js_1 = require("../models/Activity.js");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await Activity_js_1.Activity.find().populate('user').lean();
    res.json(activities);
});
router.post('/', async (req, res) => {
    const activity = await Activity_js_1.Activity.create(req.body);
    res.status(201).json(activity);
});
exports.default = router;
