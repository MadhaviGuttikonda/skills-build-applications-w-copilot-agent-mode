"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_js_1 = require("../models/User.js");
const Team_js_1 = require("../models/Team.js");
const Activity_js_1 = require("../models/Activity.js");
const LeaderboardEntry_js_1 = require("../models/LeaderboardEntry.js");
const Workout_js_1 = require("../models/Workout.js");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            User_js_1.User.deleteMany({}),
            Team_js_1.Team.deleteMany({}),
            Activity_js_1.Activity.deleteMany({}),
            LeaderboardEntry_js_1.LeaderboardEntry.deleteMany({}),
            Workout_js_1.Workout.deleteMany({}),
        ]);
        const users = await User_js_1.User.create([
            {
                name: 'Ada Lovelace',
                email: 'ada@example.com',
                age: 36,
                fitnessGoal: 'Marathon training',
            },
            {
                name: 'Grace Hopper',
                email: 'grace@example.com',
                age: 43,
                fitnessGoal: 'Strength building',
            },
            {
                name: 'Katherine Johnson',
                email: 'katherine@example.com',
                age: 39,
                fitnessGoal: 'Flexibility and mobility',
            },
        ]);
        const teams = await Team_js_1.Team.create([
            {
                name: 'Alpha Squad',
                sport: 'Cycling',
                members: [users[0]._id, users[1]._id],
            },
            {
                name: 'Beta Crew',
                sport: 'Running',
                members: [users[2]._id],
            },
        ]);
        await Activity_js_1.Activity.create([
            {
                user: users[0]._id,
                type: 'Run',
                durationMinutes: 35,
                calories: 320,
            },
            {
                user: users[1]._id,
                type: 'Cycling',
                durationMinutes: 45,
                calories: 410,
            },
            {
                user: users[2]._id,
                type: 'Yoga',
                durationMinutes: 30,
                calories: 180,
            },
        ]);
        await LeaderboardEntry_js_1.LeaderboardEntry.create([
            {
                user: users[0]._id,
                score: 1280,
                streak: 7,
            },
            {
                user: users[1]._id,
                score: 1190,
                streak: 4,
            },
            {
                user: users[2]._id,
                score: 1105,
                streak: 6,
            },
        ]);
        await Workout_js_1.Workout.create([
            {
                title: 'Core Blast',
                difficulty: 'Medium',
                durationMinutes: 25,
                focus: 'Abs and posture',
            },
            {
                title: 'Morning Mobility',
                difficulty: 'Easy',
                durationMinutes: 20,
                focus: 'Mobility',
            },
            {
                title: 'Hill Intervals',
                difficulty: 'Hard',
                durationMinutes: 40,
                focus: 'Cardio',
            },
        ]);
        console.log(`Seeded ${users.length} users, ${teams.length} teams, activities, leaderboard entries, and workouts.`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
