import { Bell } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const HeaderNotficationDropdown = ({ unreadCount, notifications, readIds, markRead }) => {
  return (
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
                  <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                )}
                <span className={`font-medium text-sm ${isRead ? 'text-muted' : 'text-foreground'}`}>
                  {n.title}
                </span>
                <span className="ml-auto text-xs text-muted">{n.time}</span>
              </div>
              <p className="text-xs text-muted pl-4">{n.message}</p>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderNotficationDropdown;
