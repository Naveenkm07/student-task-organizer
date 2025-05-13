
import { useState } from "react";
import { format } from "date-fns";
import { Task } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import TaskForm from "./TaskForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export default function TaskItem({ task, onUpdate, onDelete, onToggleComplete }: TaskItemProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "task-priority-low";
      case "medium":
        return "task-priority-medium";
      case "high":
        return "task-priority-high";
      case "urgent":
        return "task-priority-urgent";
      default:
        return "";
    }
  };

  const isOverdue = new Date(task.deadline) < new Date() && !task.completed;

  return (
    <Card className={`shadow-soft ${task.completed ? "opacity-70" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1"
          />
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </h3>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityBadgeClass(task.priority)} variant="outline">
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <span className="sr-only">Open menu</span>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-destructive focus:text-destructive"
                      onClick={() => onDelete(task.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {task.description}
            </p>
            
            <div className="pt-2">
              <p className={`text-xs ${isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                {isOverdue ? "Overdue: " : "Due: "}
                {format(new Date(task.deadline), "PPP")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task
            </DialogDescription>
          </DialogHeader>
          <TaskForm 
            initialData={task} 
            onSubmit={onUpdate} 
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
