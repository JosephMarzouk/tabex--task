import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Menu, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import ThemeToggle from '../common/ThemeToggle';
import mockData from '../../data/mockData.json';

const pageTitle = {
  '/dashboard': 'Dashboard',
  '/dashboard/users': 'Users',
  '/dashboard/analytics': 'Analytics',
  '/dashboard/settings': 'Settings',
};

function Header({ user, onLogout, onMobileMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [readIds, setReadIds] = useState([]);

  const notifications = mockData.notifications;
  const unreadCount = notifications.filter(
    (n) => !n.read && !readIds.includes(n.id)
  ).length;
  const title = pageTitle[location.pathname] || 'Dashboard';

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const markRead = (id) => {
    if (!readIds.includes(id)) setReadIds([...readIds, id]);
  };

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-4 border-b border-zinc-200 bg-white/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuOpen}
          className="md:hidden h-9 w-9"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="danger" className="text-xs">
                  {unreadCount} unread
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((n) => {
              const isRead = n.read || readIds.includes(n.id);
              return (
                <DropdownMenuItem
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className="flex-col items-start gap-1 py-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2 w-full">
                    {!isRead && (
                      <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                    )}
                    <span className={`font-medium text-sm ${isRead ? 'text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'}`}>
                      {n.title}
                    </span>
                    <span className="ml-auto text-xs text-zinc-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-zinc-500 pl-4">{n.message}</p>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 h-9">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs">{user?.avatar || 'U'}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                  {user?.name}
                </span>
                <span className="text-xs text-zinc-500">{user?.role}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name}</span>
                <span className="text-xs text-zinc-500 font-normal">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600 hover:text-red-600 dark:text-red-400"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
