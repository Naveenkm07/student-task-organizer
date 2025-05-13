
import { format } from "date-fns";
import { Task } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { getTaskIcon } from "@/lib/task-utils";

interface TaskMiniCardProps {
  task: Task;
  className?: string;
}

export function TaskMiniCard({ task, className }: TaskMiniCardProps) {
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
  const Icon = getTaskIcon(task.title);

  return (
    <Card className={`shadow-soft w-64 ${className || ""}`}>
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className="mt-1">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <h3 className={`font-medium text-sm ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </h3>
              <Badge className={getPriorityBadgeClass(task.priority)} variant="outline">
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </div>
            
            <div className="pt-1">
              <p className={`text-xs ${isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                {format(new Date(task.deadline), "p")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
