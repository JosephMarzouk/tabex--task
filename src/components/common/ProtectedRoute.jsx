import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const stored = localStorage.getItem('auth');
  let isAuthenticated = false;

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      isAuthenticated = !!parsed.token;
    } catch {
      localStorage.removeItem('auth');
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
