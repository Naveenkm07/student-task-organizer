
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/mock-data";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Calendar, List, Calendar as CalendarIcon, File, User, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    {
      title: "Dashboard",
      icon: List,
      href: "/dashboard",
    },
    {
      title: "Calendar",
      icon: Calendar,
      href: "/calendar",
    },
    {
      title: "Exports",
      icon: File,
      href: "/exports",
    },
    {
      title: "Profile",
      icon: User,
      href: "/profile",
    },
  ];
  
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 flex w-72 flex-col border-r bg-background transition-transform duration-300 ease-in-out lg:static lg:transition-none",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
        <span className="font-semibold">Student Task Organizer</span>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={location.pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "flex items-center justify-start gap-2 px-3 py-2 text-start",
                location.pathname === item.href && "bg-secondary"
              )}
              onClick={() => {
                navigate(item.href);
                if (typeof window !== "undefined" && window.innerWidth < 1024) {
                  setOpen(false);
                }
              }}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Button>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img 
                alt={currentUser.name} 
                src={currentUser.avatar} 
                className="h-full w-full object-cover" 
              />
            </div>
            <div>
              <p className="text-sm font-medium">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[140px]">
                {currentUser.email}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        
        <Button 
          variant="ghost" 
          className="mt-4 w-full justify-start gap-2"
          onClick={() => navigate("/login")}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
