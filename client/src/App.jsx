import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Employees from './pages/Employees.jsx';
import EmployeeEdit from './pages/EmployeeEdit.jsx';
import EmployeeNew from './pages/EmployeeNew.jsx';
import Departments from './pages/Departments.jsx';
import DepartmentEdit from './pages/DepartmentEdit.jsx';
import DepartmentNew from './pages/DepartmentNew.jsx';
import Shifts from './pages/Shifts.jsx';
import Users from './pages/Users.jsx';
import Navbar from './components/Navbar.jsx';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <Protected>
                <Employees />
              </Protected>
            }
          />
          <Route
            path="/employees"
            element={
              <Protected>
                <Employees />
              </Protected>
            }
          />
          <Route
            path="/employees/new"
            element={
              <Protected>
                <EmployeeNew />
              </Protected>
            }
          />
          <Route
            path="/employees/:id"
            element={
              <Protected>
                <EmployeeEdit />
              </Protected>
            }
          />

          <Route
            path="/departments"
            element={
              <Protected>
                <Departments />
              </Protected>
            }
          />
          <Route
            path="/departments/new"
            element={
              <Protected>
                <DepartmentNew />
              </Protected>
            }
          />
          <Route
            path="/departments/:id"
            element={
              <Protected>
                <DepartmentEdit />
              </Protected>
            }
          />

          <Route
            path="/shifts"
            element={
              <Protected>
                <Shifts />
              </Protected>
            }
          />
          <Route
            path="/users"
            element={
              <Protected>
                <Users />
              </Protected>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
