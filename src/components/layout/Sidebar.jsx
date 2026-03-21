import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', to: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
];

function NavItem({ item, collapsed }) {
  const location = useLocation();
  const isActive =
    item.to === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(item.to);

  return (
    <NavLink
      to={item.to}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
        isActive
          ? 'bg-primary text-white'
          : 'text-zinc-400 hover:text-white hover:bg-zinc-700/60'
      )}
    >
      <item.icon className="h-5 w-5 shrink-0" />
      {!collapsed && (
        <span className="transition-opacity duration-200">{item.label}</span>
      )}
    </NavLink>
  );
}

function SidebarContent({ collapsed, onToggleCollapse }) {
  return (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-zinc-700/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-white text-lg">Tabex</span>
          )}
        </div>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="text-zinc-400 hover:text-white transition-colors p-1 rounded"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-700/50">
        <p className={cn('text-xs text-zinc-500', collapsed && 'text-center')}>
          {collapsed ? 'v1' : 'Tabex v1.0.0'}
        </p>
      </div>
    </div>
  );
}

function Sidebar({ mobileOpen, onMobileClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      if (w >= 1024) setCollapsed(false);
      else if (w >= 768) setCollapsed(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile: Sheet drawer
  if (windowWidth < 768) {
    return (
      <Sheet open={mobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="p-0 w-72 bg-sidebar border-zinc-700">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <SidebarContent collapsed={false} />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop/Tablet: static sidebar
  return (
    <div
      className={cn(
        'hidden md:flex flex-col h-screen sticky top-0 border-r border-zinc-700/50 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <SidebarContent
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
      />
    </div>
  );
}

export default Sidebar;
