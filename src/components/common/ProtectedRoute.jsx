import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const location = useLocation();

  const getAuthState = () => {
    const stored = localStorage.getItem('auth');
    if (!stored) return false;
    try {
      const parsed = JSON.parse(stored);
      if (!parsed.token || !parsed.user) return false;
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        localStorage.removeItem('auth');
        return false;
      }
      return true;
    } catch {
      localStorage.removeItem('auth');
      return false;
    }
  };

  if (!getAuthState()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
