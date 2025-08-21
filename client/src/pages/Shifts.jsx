import { useEffect, useState } from 'react';
import { api } from '../api/client.js';
import { formatShift } from '../api/helpers.js';

export default function Shifts() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString(),
    startingHour: 8,
    endingHour: 16,
  });

  const load = async () => {
    const { data } = await api.get('/shifts');
    setList(data);
  };
  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post('/shifts', form);
    setForm({
      date: new Date().toISOString(),
      startingHour: 8,
      endingHour: 16,
    });
    await load();
  };

  const update = async (id, patch) => {
    await api.put(`/shifts/${id}`, patch);
    await load();
  };

  return (
    <div className="card">
      <h2>Shifts</h2>
      <form
        onSubmit={create}
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          marginBottom: 12,
        }}
      >
        <input
          className="input"
          type="datetime-local"
          value={form.date.slice(0, 16)}
          onChange={(e) =>
            setForm({ ...form, date: new Date(e.target.value).toISOString() })
          }
        />
        <input
          className="input"
          type="number"
          value={form.startingHour}
          onChange={(e) =>
            setForm({ ...form, startingHour: Number(e.target.value) })
          }
        />
        <input
          className="input"
          type="number"
          value={form.endingHour}
          onChange={(e) =>
            setForm({ ...form, endingHour: Number(e.target.value) })
          }
        />
        <button>Create</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start</th>
            <th>End</th>
            <th>#Employees</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s) => (
            <tr key={s._id}>
              <td>{formatShift(s)}</td>
              <td>{s.startingHour}:00</td>
              <td>{s.endingHour}:00</td>
              <td>{(s.employeesID || []).length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
