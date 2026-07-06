import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        <h1 className="display-5 fw-bold mb-3">OctoFit Tracker</h1>
        <p className="lead text-muted mb-4">
          A modern multi-tier fitness application for logging activity, building teams,
          and tracking progress.
        </p>
        <div className="alert alert-info">
          Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> to use the
          Codespaces API URL. If it is unset, the app falls back to localhost.
        </div>
        <div className="d-flex gap-3 flex-wrap">
          <span className="badge bg-primary-subtle text-primary-emphasis">React 19</span>
          <span className="badge bg-success-subtle text-success-emphasis">Vite</span>
          <span className="badge bg-info-subtle text-info-emphasis">Express + TypeScript</span>
          <span className="badge bg-warning-subtle text-warning-emphasis">MongoDB + Mongoose</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded mb-4 px-3">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav flex-row flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="nav-link">
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  );
}

export default App;
