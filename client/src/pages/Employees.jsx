import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client.js';

export default function Employees() {
  const [list, setList] = useState([]);
  const [deps, setDeps] = useState([]);
  const [filter, setFilter] = useState('');

  const depMap = useMemo(() => {
    const m = new Map();
    deps.forEach((d) => m.set(d._id, d.name));
    return m;
  }, [deps]);

  const load = async () => {
    const qs = filter ? `?departmentId=${filter}` : '';
    const { data } = await api.get(`/employees${qs}`);
    setList(data);
  };

  useEffect(() => {
    load();
  }, [filter]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/departments');
      setDeps(data);
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
        <h2>Employees</h2>
        <Link to="/employees/new">
          <button>New Employee</button>
        </Link>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Filter by Department: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          {deps.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((e) => (
            <tr key={e._id}>
              <td>
                <Link to={`/employees/${e._id}`}>
                  {e.firstName} {e.lastName}
                </Link>
              </td>
              <td>{depMap.get(e.departmentId) || e.departmentId}</td>
              <td>
                <Link to={`/employees/${e._id}`}>
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
