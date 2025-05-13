
import { useState } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { Task, PriorityLevel } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

export default function TaskForm({ initialData, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [deadline, setDeadline] = useState<Date>(
    initialData?.deadline ? new Date(initialData.deadline) : new Date()
  );
  const [priority, setPriority] = useState<PriorityLevel>(
    initialData?.priority || "medium"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const task: Task = {
      id: initialData?.id || uuidv4(),
      title,
      description,
      deadline,
      priority,
      completed: initialData?.completed || false,
      createdAt: initialData?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about your task"
          className="resize-none"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !deadline && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={(date) => date && setDeadline(date)}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label>Priority</Label>
        <RadioGroup 
          defaultValue={priority} 
          onValueChange={(value) => setPriority(value as PriorityLevel)}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low" id="low" />
            <Label htmlFor="low" className="text-priority-low">Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium" className="text-priority-medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high" id="high" />
            <Label htmlFor="high" className="text-priority-high">High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="urgent" id="urgent" />
            <Label htmlFor="urgent" className="text-priority-urgent">Urgent</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update" : "Create"} Task
        </Button>
      </div>
    </form>
  );
}
