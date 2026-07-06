import { useEffect, useState } from 'react';

const fallbackActivities = [
  { type: 'Run', durationMinutes: 35, calories: 320 },
  { type: 'Cycling', durationMinutes: 45, calories: 410 },
];

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        const res = await fetch(`${apiBaseUrl}/api/activities/`);
        if (!res.ok) {
          throw new Error('Failed to load activities');
        }
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setActivities(items);
      } catch (err) {
        setActivities(fallbackActivities);
        setError(err.message);
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id || activity.type}>
            <strong>{activity.type}</strong>
            <div className="text-muted">{activity.durationMinutes} min</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;
