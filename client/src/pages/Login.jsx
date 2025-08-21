import { useState } from 'react';
import { api } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Login() {
  const [username, setUsername] = useState('Bret'); // jsonplaceholder sample
  const [email, setEmail] = useState('Sincere@april.biz');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { username, email });
      login(data.token, data.user);
      window.location.href = '/';
    } catch (e) {
      // handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <form
          onSubmit={submit}
          style={{ display: 'grid', gap: 12, maxWidth: 420 }}
        >
          <label>
            Username
            <input
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button disabled={loading}>{loading ? '...' : 'Log in'}</button>
        </form>
      </div>
    </div>
  );
}
