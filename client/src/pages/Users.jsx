import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export default function Users() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/users');
      setList(data);
    })();
  }, []);
  return (
    <div className="card">
      <h2>Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Max Actions</th>
            <th>Actions Left (today)</th>
          </tr>
        </thead>
        <tbody>
          {list.map((u) => (
            <tr key={u.id}>
              <td>{u.fullName}</td>
              <td>{u.maxActions}</td>
              <td>{u.actionsLeft}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
