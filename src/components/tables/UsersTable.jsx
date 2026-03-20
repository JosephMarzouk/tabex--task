import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import mockData from '../../data/mockData.json';

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i}>
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          </td>
          <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
          <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
          <td className="px-4 py-3"><Skeleton className="h-6 w-16 rounded-full" /></td>
          <td className="px-4 py-3"><Skeleton className="h-8 w-8 rounded" /></td>
        </tr>
      ))}
    </>
  );
}

function UserRow({ user }) {
  const [expanded, setExpanded] = useState(false);
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <>
      <tr className="border-b border-zinc-100 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 transition-colors">
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium shrink-0">
              {initials}
            </div>
            <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
              {user.name}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
          {user.email}
        </td>
        <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
          {user.role}
        </td>
        <td className="px-4 py-3">
          <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>
            {user.status}
          </Badge>
        </td>
        <td className="px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-zinc-50 dark:bg-zinc-800/30">
          <td colSpan={5} className="px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Phone</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.phone}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Department</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.department}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Join Date</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {new Date(user.joinDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Last Login</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.lastLogin}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function UsersTable() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(mockData.users);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              All Users
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {loading ? 'Loading...' : `${filtered.length} users found`}
            </p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="Search by name, email, role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              {['Name', 'Email', 'Role', 'Status', ''].map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonRows />
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-zinc-500">
                  No users found matching &quot;{search}&quot;
                </td>
              </tr>
            ) : (
              filtered.map((user) => <UserRow key={user.id} user={user} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
