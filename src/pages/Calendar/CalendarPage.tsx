
import { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfDay,
  startOfToday,
} from "date-fns";
import { Task } from "@/lib/types";
import { mockTasks } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";

export default function CalendarPage() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });
  
  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
  }
  
  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  
  const selectedDayTasks = tasks.filter((task) =>
    isSameDay(parseISO(task.deadline.toString()), selectedDay)
  );
  
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
    setIsAddTaskDialogOpen(false);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleCompleted = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const getTasksForDay = (day: Date) => {
    return tasks.filter((task) => isSameDay(parseISO(task.deadline.toString()), day));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            View and manage your tasks in calendar view
          </p>
        </div>
        <Button onClick={() => setIsAddTaskDialogOpen(true)}>
          Add Task
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {/* Calendar Header */}
        <div className="col-span-5 md:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={previousMonth}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCurrentMonth(format(today, "MMM-yyyy"));
                  setSelectedDay(today);
                }}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextMonth}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <div className="col-span-5 md:col-span-7 grid grid-cols-7 gap-2 mt-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-medium text-sm py-2">
              {day}
            </div>
          ))}
          
          {/* Empty cells for days of the week before the first day of the month */}
          {Array.from({ length: getDay(firstDayCurrentMonth) }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="bg-secondary/50 rounded-2xl p-2 h-24 md:h-28"
            />
          ))}
          
          {/* Calendar days */}
          {days.map((day) => {
            const dayTasks = getTasksForDay(day);
            const hasUrgentTask = dayTasks.some(task => task.priority === "urgent" && !task.completed);
            const hasHighTask = dayTasks.some(task => task.priority === "high" && !task.completed);
            
            return (
              <Button
                key={day.toString()}
                variant="outline"
                className={cn(
                  "h-24 md:h-28 flex flex-col gap-1 p-2 hover:bg-accent rounded-2xl",
                  isEqual(day, selectedDay) && "bg-primary/10 border-primary",
                  isToday(day) && "border-2 border-primary",
                  !isSameMonth(day, firstDayCurrentMonth) && "text-muted-foreground bg-secondary/30"
                )}
                onClick={() => setSelectedDay(day)}
              >
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className={cn(
                    "ml-auto font-semibold",
                    isToday(day) && "bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center"
                  )}
                >
                  {format(day, "d")}
                </time>
                <div className="w-full flex flex-col gap-1 mt-auto items-start">
                  {dayTasks.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {hasUrgentTask && (
                        <div className="w-2 h-2 rounded-full bg-priority-urgent"></div>
                      )}
                      {hasHighTask && (
                        <div className="w-2 h-2 rounded-full bg-priority-high"></div>
                      )}
                      {dayTasks.length > 0 && (
                        <span className="text-xs font-medium">
                          {dayTasks.length} {dayTasks.length === 1 ? "task" : "tasks"}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
        
        {/* Selected Day Tasks */}
        <div className="col-span-5 md:col-span-7 mt-4">
          <h3 className="font-semibold text-lg mb-4">
            Tasks for {format(selectedDay, "MMMM d, yyyy")}
          </h3>
          
          {selectedDayTasks.length > 0 ? (
            <div className="space-y-4">
              {selectedDayTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                  onToggleComplete={toggleCompleted}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p>No tasks scheduled for this day</p>
                <Button 
                  className="mt-4" 
                  onClick={() => setIsAddTaskDialogOpen(true)}
                >
                  Add Task
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <TaskForm 
            initialData={{ 
              id: "",
              title: "",
              description: "",
              deadline: selectedDay,
              priority: "medium",
              completed: false,
              createdAt: new Date(),
              updatedAt: new Date(),
            }} 
            onSubmit={addTask} 
            onCancel={() => setIsAddTaskDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Helper function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
