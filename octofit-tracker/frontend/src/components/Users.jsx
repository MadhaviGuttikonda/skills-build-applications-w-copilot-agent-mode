import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!res.ok) {
          throw new Error('Failed to load users');
        }
        const data = await res.json();
        const items = Array.isArray(data) ? data : data.results ?? [];
        setUsers(items);
      } catch (err) {
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
