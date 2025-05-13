
export type PriorityLevel = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: PriorityLevel;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
