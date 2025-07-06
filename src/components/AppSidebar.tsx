import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/mock-data";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Calendar, List, File, User, Clock, LogOut, Home, BookOpen, Target, Settings, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  
  const navItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/dashboard",
      description: "Overview & Analytics",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Calendar",
      icon: Calendar,
      href: "/calendar",
      description: "Schedule & Events",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Timetable",
      icon: Clock,
      href: "/timetable",
      description: "Daily Schedule",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Tasks",
      icon: Target,
      href: "/tasks",
      description: "Task Management",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Profile",
      icon: User,
      href: "/profile",
      description: "Account Settings",
      color: "from-indigo-500 to-purple-500"
    },
  ];
  
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 flex w-80 flex-col border-r bg-gradient-to-b from-slate-50 via-white to-slate-100/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/50 backdrop-blur-xl transition-all duration-300 ease-in-out lg:static lg:transition-none shadow-2xl",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 px-6 lg:h-[70px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl ring-4 ring-white/20 dark:ring-slate-800/20">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Student Task Organizer
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Manage your academic life
            </p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 overflow-auto py-6">
        <nav className="grid gap-3 px-4">
          <div className="mb-4">
            <h2 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-3 mb-3 flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              Navigation
            </h2>
          </div>
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "group relative flex h-14 items-center justify-start gap-4 px-4 py-3 text-start transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                  isActive 
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500 shadow-xl scale-[1.02]" 
                    : "hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 dark:hover:from-slate-800 dark:hover:to-slate-700"
                )}
                onClick={() => {
                  navigate(item.href);
                  if (typeof window !== "undefined" && window.innerWidth < 1024) {
                    setOpen(false);
                  }
                }}
              >
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 shadow-lg",
                  isActive 
                    ? `bg-gradient-to-br ${item.color} text-white shadow-xl ring-2 ring-white/20` 
                    : "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 group-hover:shadow-xl"
                )}>
                  <item.icon className="h-5 w-5" />
                </div>
                
                <div className="flex flex-col items-start">
                  <span className={cn(
                    "font-semibold transition-colors",
                    isActive ? "text-blue-700 dark:text-blue-300" : "group-hover:text-slate-700 dark:group-hover:text-slate-300"
                  )}>
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                    {item.description}
                  </span>
                </div>
                
                {isActive && (
                  <div className="absolute right-3 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse shadow-lg" />
                )}
              </Button>
            );
          })}
        </nav>
      </div>
      
      {/* User Profile & Actions */}
      <div className="border-t bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900/50 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-12 w-12 rounded-full overflow-hidden ring-4 ring-white/20 dark:ring-slate-800/20 shadow-xl">
                <img 
                  alt={currentUser.name} 
                  src={currentUser.avatar} 
                  className="h-full w-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 border-3 border-white dark:border-slate-800 shadow-lg" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{currentUser.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                {currentUser.email}
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        
        <div className="grid gap-3">
          <Button 
            variant="outline" 
            className="w-full justify-start gap-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 dark:hover:from-blue-950/20 dark:hover:to-purple-950/20 dark:hover:text-blue-300 transition-all duration-300 border-slate-200 dark:border-slate-700"
            onClick={() => navigate("/profile")}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 dark:hover:from-red-950/20 dark:hover:to-pink-950/20 dark:hover:text-red-400 transition-all duration-300"
            onClick={() => navigate("/login")}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
