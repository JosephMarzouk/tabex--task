import { Navigate } from 'react-router-dom';

function PublicRoute({ children }) {
  const stored = localStorage.getItem('auth');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.token && parsed.user && (!parsed.expiresAt || Date.now() <= parsed.expiresAt)) {
        return <Navigate to="/dashboard" replace />;
      }
    } catch {
      localStorage.removeItem('auth');
    }
  }
  return children;
}

export default PublicRoute;
