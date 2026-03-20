# Tabex — Admin Dashboard

A modern, fully responsive React admin dashboard built with Vite, Tailwind CSS, and shadcn/ui.

## Features

- Authentication with local JSON credentials
- Dark / light mode toggle (persisted in localStorage)
- Users table with real-time search and expandable rows
- Notification center with unread badges
- Fully responsive — mobile drawer, tablet/desktop sidebar
- Loading skeletons on first data load

## Tech Stack

- **React** + **Vite**
- **React Router DOM v6**
- **Tailwind CSS v3**
- **shadcn/ui** components
- **Lucide React** icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Demo Credentials

| Role  | Email           | Password  |
|-------|-----------------|-----------|
| Admin | admin@demo.com  | admin123  |
| User  | user@demo.com   | user123   |

## Folder Structure

```
src/
├── components/
│   ├── layout/          # AppLayout, Sidebar, Header
│   ├── tables/          # UsersTable with expand + search
│   ├── common/          # ProtectedRoute, ThemeToggle
│   └── ui/              # shadcn-style components
├── data/
│   ├── users.json       # Login credentials
│   └── mockData.json    # Table + notification data
├── hooks/
│   └── useAuth.js       # Auth state management
├── pages/
│   ├── Login.jsx
│   └── Dashboard.jsx
├── lib/
│   └── utils.js         # cn() helper
├── App.jsx
└── main.jsx
```
