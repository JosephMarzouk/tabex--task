import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const stored = localStorage.getItem('auth');
  let isAuthenticated = false;

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      isAuthenticated = !!parsed.token;
    } catch {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
