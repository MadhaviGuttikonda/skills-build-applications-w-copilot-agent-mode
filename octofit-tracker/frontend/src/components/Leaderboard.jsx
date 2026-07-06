import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

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
        const res = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
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
