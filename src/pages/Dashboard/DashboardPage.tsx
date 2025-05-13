
import { useState } from "react";
import { format } from "date-fns";
import { mockTasks } from "@/lib/mock-data";
import { Task, PriorityLevel } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components/TaskForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [task, ...prevTasks]);
    setIsDialogOpen(false);
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

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const upcomingTasks = incompleteTasks
    .filter((task) => {
      const deadlineDate = new Date(task.deadline);
      const currentDate = new Date();
      const diffTime = deadlineDate.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  const countByPriority = (priority: PriorityLevel) => {
    return incompleteTasks.filter((task) => task.priority === priority).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your tasks and deadlines
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to keep track of your assignments
              </DialogDescription>
            </DialogHeader>
            <TaskForm onSubmit={addTask} onCancel={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {incompleteTasks.length} active, {completedTasks.length} completed
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Priority: Urgent</CardTitle>
            <Badge className="task-priority-urgent">
              {countByPriority("urgent")}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countByPriority("urgent")}</div>
            <p className="text-xs text-muted-foreground">
              urgent tasks require immediate attention
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Priority: High</CardTitle>
            <Badge className="task-priority-high">
              {countByPriority("high")}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{countByPriority("high")}</div>
            <p className="text-xs text-muted-foreground">
              high priority tasks need attention soon
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Coming up soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              tasks due in the next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4 mt-4">
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onToggleComplete={toggleCompleted}
              />
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p>No tasks found. Add your first task to get started!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onToggleComplete={toggleCompleted}
              />
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p>No upcoming tasks due in the next 7 days.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4 mt-4">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onToggleComplete={toggleCompleted}
              />
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <p>No completed tasks yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
