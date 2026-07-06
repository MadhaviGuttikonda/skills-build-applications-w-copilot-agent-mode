import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/workouts/`);
        if (!res.ok) {
          throw new Error('Failed to load workouts');
        }
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setWorkouts(items);
      } catch (err) {
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
