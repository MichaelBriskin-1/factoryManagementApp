import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client.js';

export default function DepartmentEdit() {
  const { id } = useParams();
  const [dep, setDep] = useState(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    (async () => {
      const [{ data: d }, { data: emps }] = await Promise.all([
        api.get(`/departments/${id}`),
        api.get('/employees'),
      ]);
      setDep(d);
      // employees not in this department
      setCandidates(emps.filter((e) => e.departmentId !== id));
    })();
  }, [id]);

  if (!dep) return null;

  const save = async () => {
    await api.put(`/departments/${id}`, dep);
    alert('Updated');
  };
  const remove = async () => {
    if (confirm('Delete department?')) {
      await api.delete(`/departments/${id}`);
      window.location.href = '/departments';
    }
  };
  const addEmp = async (empId) => {
    await api.put(`/departments/${id}/add-employee/${empId}`);
    alert('Employee moved to this department');
  };

  return (
    <div className="card">
      <h2>Edit Department</h2>
      <div style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
        <input
          className="input"
          value={dep.name}
          onChange={(e) => setDep({ ...dep, name: e.target.value })}
        />
        <div>
          <button onClick={save}>Update</button>
          <button onClick={remove} style={{ marginLeft: 8 }}>
            Delete
          </button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Add employee to this department</h3>
        <ul>
          {candidates.map((c) => (
            <li key={c._id}>
              {c.firstName} {c.lastName}{' '}
              <button onClick={() => addEmp(c._id)}>Add</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
