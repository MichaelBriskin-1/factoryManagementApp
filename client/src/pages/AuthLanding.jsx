import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../api/client.js';
import { useAuth } from '../auth/AuthContext.jsx';

export default function AuthLanding() {
  const { token, login } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);

  // login fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // register fields
  const [rFullName, setRFullName] = useState('');
  const [rUsername, setRUsername] = useState('');
  const [rEmail, setREmail] = useState('');

  if (token) return <Navigate to="/employees" replace />;

  const doLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { username, email });
      login(data.token, data.user);
      window.location.href = '/employees';
    } finally {
      setLoading(false);
    }
  };

  const doRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', {
        fullName: rFullName,
        username: rUsername,
        email: rEmail,
        // no maxActions here (defaults on server)
      });
      // auto-login after register
      const { data } = await api.post('/auth/login', {
        username: rUsername,
        email: rEmail,
      });
      login(data.token, data.user);
      window.location.href = '/employees';
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-tabs">
          <button
            className={mode === 'login' ? 'active' : ''}
            onClick={() => setMode('login')}
            disabled={loading}
          >
            Log in
          </button>
          <button
            className={mode === 'register' ? 'active' : ''}
            onClick={() => setMode('register')}
            disabled={loading}
          >
            Create account
          </button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={doLogin} className="auth-form">
            <h2>Welcome back</h2>
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
            <p className="auth-switch">
              New here?{' '}
              <a onClick={() => setMode('register')}>Create an account</a>
            </p>
          </form>
        ) : (
          <form onSubmit={doRegister} className="auth-form">
            <h2>Create your account</h2>
            <label>
              Full name
              <input
                className="input"
                value={rFullName}
                onChange={(e) => setRFullName(e.target.value)}
              />
            </label>
            <label>
              Username
              <input
                className="input"
                value={rUsername}
                onChange={(e) => setRUsername(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                className="input"
                value={rEmail}
                onChange={(e) => setREmail(e.target.value)}
              />
            </label>
            <button disabled={loading}>
              {loading ? '...' : 'Create account'}
            </button>
            <p className="auth-switch">
              Already have an account?{' '}
              <a onClick={() => setMode('login')}>Log in</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
