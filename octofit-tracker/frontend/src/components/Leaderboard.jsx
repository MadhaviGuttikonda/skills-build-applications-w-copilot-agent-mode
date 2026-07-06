import { useEffect, useState } from 'react';

const fallbackEntries = [
  { rank: 1, name: 'Ada Lovelace', score: 1280 },
  { rank: 2, name: 'Grace Hopper', score: 1190 },
];

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const apiBaseUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        const res = await fetch(`${apiBaseUrl}/api/leaderboard/`);
        if (!res.ok) {
          throw new Error('Failed to load leaderboard');
        }
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setEntries(items);
      } catch (err) {
        setEntries(fallbackEntries);
        setError(err.message);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.rank || entry.user?.name}>
            <strong>{entry.user?.name || entry.name}</strong>
            <span className="float-end">{entry.score}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;
