
import { AppSidebar } from "@/components/AppSidebar";
import { CalendarView } from "@/components/CalendarView";
import { mockTasks } from "@/lib/mock-data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Task } from "@/lib/types";
import TaskForm from "@/components/TaskForm";
import { toast } from "@/hooks/use-toast";

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
    setIsDialogOpen(false);
    toast({
      title: "Task created",
      description: "Your task has been created successfully",
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground mt-1">
            View your deadlines, exams, and schedule
          </p>
        </div>
        
        <Button onClick={() => setIsDialogOpen(true)}>Add Task</Button>
      </header>

      <div className="mt-6 max-w-lg mx-auto">
        <CalendarView tasks={tasks} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
          </DialogHeader>
          <TaskForm 
            initialData={{ 
              id: "",
              title: "",
              description: "",
              deadline: new Date(),
              priority: "medium",
              completed: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            }} 
            onSubmit={addTask} 
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
