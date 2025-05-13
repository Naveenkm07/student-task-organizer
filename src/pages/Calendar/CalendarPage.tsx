
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { TaskMiniCard } from "@/components/TaskMiniCard";
import { getTaskIcon } from "@/lib/task-utils";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

export default function CalendarPage() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<Date | null>(null);
  const [calendarView, setCalendarView] = useState<"month" | "week">("month");
  
  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum distance required to start drag
      },
    })
  );
  
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
    toast({
      title: "Task created",
      description: "Your task has been created successfully",
    });
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully",
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted successfully",
    });
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
  
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const taskId = active.id;
      const newDate = new Date(over.id);
      
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, deadline: newDate, updatedAt: new Date() }
            : task
        )
      );
      
      toast({
        title: "Task rescheduled",
        description: `Task moved to ${format(newDate, "MMMM d, yyyy")}`,
      });
    }
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
              <div className="border-l h-8 mx-2"></div>
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={calendarView === "month" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCalendarView("month")}
                  className="rounded-none"
                >
                  Month
                </Button>
                <Button
                  variant={calendarView === "week" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setCalendarView("week")}
                  className="rounded-none"
                >
                  Week
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Calendar Grid */}
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToWindowEdges]}
          onDragEnd={handleDragEnd}
        >
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
              const isHovered = hoveredDay && isSameDay(day, hoveredDay);
              
              return (
                <Popover key={day.toString()} open={isHovered} onOpenChange={() => {}}>
                  <PopoverTrigger asChild>
                    <Button
                      id={day.toISOString()}
                      variant="outline"
                      className={cn(
                        "h-24 md:h-28 flex flex-col gap-1 p-2 hover:bg-accent rounded-2xl",
                        isEqual(day, selectedDay) && "bg-primary/10 border-primary",
                        isToday(day) && "border-2 border-primary",
                        !isSameMonth(day, firstDayCurrentMonth) && "text-muted-foreground bg-secondary/30"
                      )}
                      onClick={() => setSelectedDay(day)}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
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
                          <div className="flex gap-1 flex-wrap items-center">
                            {hasUrgentTask && (
                              <div className="w-2 h-2 rounded-full bg-priority-urgent"></div>
                            )}
                            {hasHighTask && (
                              <div className="w-2 h-2 rounded-full bg-priority-high"></div>
                            )}
                            
                            {/* Display task icons */}
                            <div className="flex gap-1 overflow-hidden">
                              {dayTasks.slice(0, 3).map((task) => {
                                const Icon = getTaskIcon(task.title);
                                return (
                                  <Icon key={task.id} className="h-3.5 w-3.5 text-muted-foreground" data-task-id={task.id} />
                                );
                              })}
                              {dayTasks.length > 3 && (
                                <span className="text-xs font-medium">+{dayTasks.length - 3}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  
                  <PopoverContent align="center" sideOffset={5} className="w-auto p-0 border-none shadow-lg">
                    {dayTasks.length > 0 ? (
                      <div className="flex flex-col gap-2 p-2 max-h-64 overflow-y-auto">
                        {dayTasks.map((task) => (
                          <TaskMiniCard key={task.id} task={task} />
                        ))}
                      </div>
                    ) : (
                      <Card className="w-64">
                        <CardContent className="p-3 text-center">
                          <p className="text-sm text-muted-foreground">No tasks for this day</p>
                        </CardContent>
                      </Card>
                    )}
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </DndContext>
        
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
