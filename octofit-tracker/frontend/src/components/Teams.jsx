import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

const fallbackTeams = [
  { name: 'Alpha Squad', sport: 'Cycling' },
  { name: 'Beta Crew', sport: 'Running' },
];

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/teams/`);
        if (!res.ok) {
          throw new Error('Failed to load teams');
        }
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setTeams(items);
      } catch (err) {
        setTeams(fallbackTeams);
        setError(err.message);
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.id || team.name}>
            <strong>{team.name}</strong>
            {team.sport ? <div className="text-muted">{team.sport}</div> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;
