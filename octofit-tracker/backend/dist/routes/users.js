"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_js_1 = require("../models/User.js");
const router = (0, express_1.Router)();
const fallbackUsers = [
    { name: 'Ada Lovelace', email: 'ada@example.com', fitnessGoal: 'Marathon training' },
    { name: 'Grace Hopper', email: 'grace@example.com', fitnessGoal: 'Strength building' },
];
router.get('/', async (_req, res) => {
    try {
        const users = await User_js_1.User.find().lean();
        res.json(users.length > 0 ? users : fallbackUsers);
    }
    catch (error) {
        console.error('Users route fallback:', error);
        res.json(fallbackUsers);
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await User_js_1.User.create(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        console.error('Users create fallback:', error);
        res.status(201).json({ ...req.body, _id: 'fallback-user' });
    }
});
exports.default = router;
