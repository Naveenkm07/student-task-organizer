
import React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Task } from "@/lib/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getTaskIcon, getPriorityColor } from "@/lib/task-utils";

interface TaskTimetableProps {
  tasks: Task[];
}

export const TaskTimetable: React.FC<TaskTimetableProps> = ({ tasks }) => {
  // Sort tasks by deadline
  const sortedTasks = [...tasks].sort((a, b) => {
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });

  // Group tasks by day
  const tasksByDay = sortedTasks.reduce((acc: Record<string, Task[]>, task) => {
    const day = format(new Date(task.deadline), 'EEEE'); // Monday, Tuesday, etc.
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(task);
    return acc;
  }, {});

  // Days of the week in order
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Day</TableHead>
            <TableHead>Morning</TableHead>
            <TableHead>Afternoon</TableHead>
            <TableHead>Evening</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {daysOfWeek.map((day) => {
            const dayTasks = tasksByDay[day] || [];
            const morningTasks = dayTasks.filter(task => {
              const hour = new Date(task.deadline).getHours();
              return hour >= 5 && hour < 12;
            });
            const afternoonTasks = dayTasks.filter(task => {
              const hour = new Date(task.deadline).getHours();
              return hour >= 12 && hour < 18;
            });
            const eveningTasks = dayTasks.filter(task => {
              const hour = new Date(task.deadline).getHours();
              return hour >= 18 || hour < 5;
            });

            return (
              <TableRow key={day}>
                <TableCell className="font-medium">{day}</TableCell>
                <TableCell>{renderTaskCells(morningTasks)}</TableCell>
                <TableCell>{renderTaskCells(afternoonTasks)}</TableCell>
                <TableCell>{renderTaskCells(eveningTasks)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

function renderTaskCells(tasks: Task[]) {
  if (tasks.length === 0) {
    return <div className="h-12 flex items-center text-muted-foreground">No tasks</div>;
  }
  
  return (
    <div className="space-y-2">
      {tasks.map((task) => {
        const Icon = getTaskIcon(task.title);
        return (
          <div key={task.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/30">
            <div className={cn("rounded-full p-1", getPriorityColor(task.priority))}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={cn("text-sm font-medium", task.completed && "line-through opacity-60")}>
                  {task.title}
                </span>
                <Badge variant="outline" className="text-xs">
                  {format(new Date(task.deadline), "h:mm a")}
                </Badge>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
