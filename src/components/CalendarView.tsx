
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { getTaskIcon, getPriorityColor } from "@/lib/task-utils";

interface CalendarViewProps {
  tasks: Task[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ tasks }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Get tasks for the selected date
  const selectedDateTasks = tasks.filter(task => {
    if (!date || !task.deadline) return false;
    return format(new Date(task.deadline), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
  });

  // Function to highlight days with tasks
  const isDayWithTask = (day: Date) => {
    return tasks.some(task => {
      if (!task.deadline) return false;
      return format(new Date(task.deadline), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
    });
  };

  // Custom day rendering to show task indicators
  const renderDay = (day: Date, cellProps: any) => {
    const tasksForDay = tasks.filter(task => {
      if (!task.deadline) return false;
      return format(new Date(task.deadline), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
    });
    
    const hasUrgentTask = tasksForDay.some(t => t.priority === "urgent" && !t.completed);
    const hasHighTask = tasksForDay.some(t => t.priority === "high" && !t.completed);
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="z-10">{cellProps.children}</div>
        
        {tasksForDay.length > 0 && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
            {hasUrgentTask && <div className="w-1.5 h-1.5 rounded-full bg-priority-urgent"></div>}
            {hasHighTask && <div className="w-1.5 h-1.5 rounded-full bg-priority-high"></div>}
            {tasksForDay.length > (hasUrgentTask ? 1 : 0) + (hasHighTask ? 1 : 0) && 
              <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            }
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            components={{
              Day: ({ date, ...props }) => renderDay(date, props)
            }}
          />
        </CardContent>
      </Card>

      {date && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">
            Tasks for {format(date, "MMMM d, yyyy")}
          </h3>
          
          {selectedDateTasks.length > 0 ? (
            <div className="space-y-3">
              {selectedDateTasks.map(task => {
                const Icon = getTaskIcon(task.title);
                return (
                  <Card key={task.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "rounded-full p-2",
                          getPriorityColor(task.priority),
                          task.completed && "opacity-50"
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={cn("font-medium", task.completed && "line-through opacity-60")}>{task.title}</h4>
                            <Badge variant={task.completed ? "outline" : "default"}>
                              {task.completed ? "Completed" : task.priority}
                            </Badge>
                          </div>
                          {task.description && (
                            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No tasks for this day</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
