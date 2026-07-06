"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_js_1 = __importDefault(require("./routes/users.js"));
const teams_js_1 = __importDefault(require("./routes/teams.js"));
const activities_js_1 = __importDefault(require("./routes/activities.js"));
const leaderboard_js_1 = __importDefault(require("./routes/leaderboard.js"));
const workouts_js_1 = __importDefault(require("./routes/workouts.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-tracker-backend', apiUrl: apiBaseUrl });
});
app.use('/api/users', users_js_1.default);
app.use('/api/teams', teams_js_1.default);
app.use('/api/activities', activities_js_1.default);
app.use('/api/leaderboard', leaderboard_js_1.default);
app.use('/api/workouts', workouts_js_1.default);
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Backend listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
startServer();
