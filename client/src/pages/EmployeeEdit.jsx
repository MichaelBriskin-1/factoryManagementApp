import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client.js';

export default function EmployeeEdit() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);
  const [deps, setDeps] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState('');

  const depMap = useMemo(() => {
    const m = new Map();
    deps.forEach((d) => m.set(d._id, d.name));
    return m;
  }, [deps]);

  useEffect(() => {
    (async () => {
      const [{ data: e }, { data: d }, { data: s }] = await Promise.all([
        api.get(`/employees/${id}`),
        api.get('/departments'),
        api.get('/shifts'),
      ]);
      setEmp(e);
      setDeps(d);
      setShifts(s);
    })();
  }, [id]);

  if (!emp) return null;

  const save = async () => {
    await api.put(`/employees/${id}`, emp);
    alert('Updated');
  };
  const remove = async () => {
    if (confirm('Delete employee?')) {
      await api.delete(`/employees/${id}`);
      window.location.href = '/employees';
    }
  };
  const assign = async () => {
    if (!selectedShift) return;
    await api.post(`/employees/${id}/assign-shift/${selectedShift}`);
    alert('Assigned to shift');
  };

  return (
    <div className="card">
      <h2>Edit Employee</h2>
      <div style={{ display: 'grid', gap: 12, maxWidth: 500 }}>
        <input
          className="input"
          value={emp.firstName}
          onChange={(e) => setEmp({ ...emp, firstName: e.target.value })}
        />
        <input
          className="input"
          value={emp.lastName}
          onChange={(e) => setEmp({ ...emp, lastName: e.target.value })}
        />
        <input
          className="input"
          type="number"
          value={emp.startWorkYear}
          onChange={(e) =>
            setEmp({ ...emp, startWorkYear: Number(e.target.value) })
          }
        />
        <select
          value={emp.departmentId}
          onChange={(e) => setEmp({ ...emp, departmentId: e.target.value })}
        >
          {deps.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
        <div>
          <button onClick={save}>Update</button>
          <button onClick={remove} style={{ marginLeft: 8 }}>
            Delete
          </button>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Assign to existing shift</h3>
        <select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
        >
          <option value="">Select shift</option>
          {shifts.map((s) => (
            <option key={s._id} value={s._id}>
              {new Date(s.date).toLocaleDateString()} {s.startingHour}:00-
              {s.endingHour}:00
            </option>
          ))}
        </select>
        <button onClick={assign} style={{ marginLeft: 8 }}>
          Add
        </button>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <b>Department:</b> {depMap.get(emp.departmentId) || emp.departmentId}
      </div>
    </div>
  );
}
