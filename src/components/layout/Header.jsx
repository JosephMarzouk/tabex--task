import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import ThemeToggle from "../common/ThemeToggle";
import mockData from "../../data/mockData.json";
import HeaderProfileDropdown from "./HeaderProfileDropdown";
import HeaderNotficationDropdown from "./HeaderNotficationDropdown";
const pageTitle = {
  "/dashboard": "Dashboard",
  "/dashboard/users": "Users",
  "/dashboard/analytics": "Analytics",
  "/dashboard/settings": "Settings",
};

function Header({ user, onLogout, onMobileMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [readIds, setReadIds] = useState([]);

  const notifications = mockData.notifications;
  const unreadCount = notifications.filter(
    (n) => !n.read && !readIds.includes(n.id),
  ).length;
  const title = pageTitle[location.pathname] || "Dashboard";

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const markRead = (id) => {
    if (!readIds.includes(id)) setReadIds([...readIds, id]);
  };

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-4 border-b border-border bg-background-blur backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuOpen}
          className="md:hidden h-9 w-9"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Notifications Dropdown */}

        <HeaderNotficationDropdown
          unreadCount={unreadCount}
          notifications={notifications}
          readIds={readIds}
          markRead={markRead}
        />
        {/* Profile  Dropdown */}
       <HeaderProfileDropdown user={user} handleLogout={handleLogout} />
      </div>
    </header>
  );
}

export default Header;
