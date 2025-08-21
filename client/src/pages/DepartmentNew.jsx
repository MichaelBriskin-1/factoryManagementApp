import { useState } from 'react';
import { api } from '../api/client.js';

export default function DepartmentNew() {
  const [form, setForm] = useState({ name: '', manager: null });
  const submit = async (e) => {
    e.preventDefault();
    await api.post('/departments', form);
    window.location.href = '/departments';
  };
  return (
    <div className="card">
      <h2>New Department</h2>
      <form
        onSubmit={submit}
        style={{ display: 'grid', gap: 12, maxWidth: 480 }}
      >
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <button>Save</button>
      </form>
    </div>
  );
}
