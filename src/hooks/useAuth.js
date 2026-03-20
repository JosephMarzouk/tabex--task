import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
      } catch {
        localStorage.removeItem('auth');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const auth = { token: 'fake-token-' + Date.now(), user: userData };
    localStorage.setItem('auth', JSON.stringify(auth));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser(null);
  };

  const isAuthenticated = () => {
    const stored = localStorage.getItem('auth');
    if (!stored) return false;
    try {
      const parsed = JSON.parse(stored);
      return !!parsed.token;
    } catch {
      return false;
    }
  };

  return { user, loading, login, logout, isAuthenticated };
}
