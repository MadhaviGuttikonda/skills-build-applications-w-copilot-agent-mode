import { useEffect, useState } from 'react';
import { getApiUrl } from '../utils/api.js';

const fallbackUsers = [
  { name: 'Ada Lovelace', email: 'ada@example.com', fitnessGoal: 'Marathon training' },
  { name: 'Grace Hopper', email: 'grace@example.com', fitnessGoal: 'Strength building' },
];

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch(getApiUrl('users'));
        if (!res.ok) {
          throw new Error('Failed to load users');
        }
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setUsers(items);
      } catch (err) {
        setUsers(fallbackUsers);
        setError(err.message);
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name}</strong>
            <div className="text-muted">{user.email}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;
