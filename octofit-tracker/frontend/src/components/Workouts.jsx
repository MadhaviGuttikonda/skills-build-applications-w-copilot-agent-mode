import { useEffect, useState } from 'react';

const fallbackWorkouts = [
  { title: 'Core Blast', difficulty: 'Medium', durationMinutes: 25 },
  { title: 'Morning Mobility', difficulty: 'Easy', durationMinutes: 20 },
];

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        const res = await fetch(`${apiBaseUrl}/api/workouts/`);
        if (!res.ok) {
          throw new Error('Failed to load workouts');
        }
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setWorkouts(items);
      } catch (err) {
        setWorkouts(fallbackWorkouts);
        setError(err.message);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id || workout.title}>
            <strong>{workout.title}</strong>
            <div className="text-muted">{workout.difficulty} • {workout.durationMinutes} min</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;
