
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b bg-background px-4 lg:h-[60px]">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 block lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="flex flex-1 items-center justify-between">
            <div className="lg:hidden">
              <h1 className="text-lg font-semibold">Student Task Organizer</h1>
            </div>
            <div className="flex items-center gap-2">
              {/* Profile or other header actions could go here */}
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
