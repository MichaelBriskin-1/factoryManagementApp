import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';

export default function Departments() {
  const [list, setList] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/departments');
      setList(data);
    })();
  }, []);
  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Departments</h2>
        <Link to="/departments/new">
          <button>New Department</button>
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((d) => (
            <tr key={d._id}>
              <td>
                <Link to={`/departments/${d._id}`}>{d.name}</Link>
              </td>
              <td>{d.manager || '-'}</td>
              <td>
                <Link to={`/departments/${d._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
