import { useEffect, useState } from 'react';
import { api } from '../api/client.js';

export default function EmployeeNew() {
  const [deps, setDeps] = useState([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    startWorkYear: new Date().getFullYear(),
    departmentId: '',
  });
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/departments');
      setDeps(data);
    })();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/employees', form);
    window.location.href = '/employees';
  };

  return (
    <div className="card">
      <h2>New Employee</h2>
      <form
        onSubmit={submit}
        style={{ display: 'grid', gap: 12, maxWidth: 480 }}
      >
        <input
          className="input"
          placeholder="First name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          className="input"
          placeholder="Last name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <input
          className="input"
          type="number"
          placeholder="Start year"
          value={form.startWorkYear}
          onChange={(e) =>
            setForm({ ...form, startWorkYear: Number(e.target.value) })
          }
        />
        <select
          value={form.departmentId}
          onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
        >
          <option value="">Select department</option>
          {deps.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
        <button>Save</button>
      </form>
    </div>
  );
}
