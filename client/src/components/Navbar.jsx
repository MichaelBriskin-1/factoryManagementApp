import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const isLogin = loc.pathname === '/login';
  return (
    <nav>
      <Link to="/">ShiftForge</Link>
      {!isLogin && (
        <>
          <Link to="/employees">Employees</Link>
          <Link to="/departments">Departments</Link>
          <Link to="/shifts">Shifts</Link>
          <Link to="/users">Users</Link>
          <div className="spacer" />
          <span>{user?.fullName}</span>
          <button onClick={logout} style={{ marginLeft: 8 }}>
            Log out
          </button>
        </>
      )}
    </nav>
  );
}
