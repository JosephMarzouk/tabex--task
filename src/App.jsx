import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/Login'
import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <div className="text-zinc-500 dark:text-zinc-400 p-4 text-sm">
                Dashboard content coming soon…
              </div>
            }
          />
          <Route path="users" element={<div className="text-zinc-500 dark:text-zinc-400 p-4 text-sm">Users coming soon…</div>} />
          <Route path="analytics" element={<div className="text-zinc-500 dark:text-zinc-400 p-4 text-sm">Analytics coming soon…</div>} />
          <Route path="settings" element={<div className="text-zinc-500 dark:text-zinc-400 p-4 text-sm">Settings coming soon…</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
