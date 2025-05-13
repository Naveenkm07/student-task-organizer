
import { Task, User } from "./types";

export const currentUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@university.edu",
  avatar: "https://ui-avatars.com/api/?name=John+Doe&background=0077ff&color=fff",
};

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Complete Java Assignment",
    description: "Finish the implementation of the linked list data structure.",
    deadline: new Date(2025, 4, 15),
    priority: "high",
    completed: false,
    createdAt: new Date(2025, 4, 10),
    updatedAt: new Date(2025, 4, 10),
  },
  {
    id: "task-2",
    title: "Study for Database Exam",
    description: "Review normalization, SQL queries, and transaction management.",
    deadline: new Date(2025, 4, 20),
    priority: "urgent",
    completed: false,
    createdAt: new Date(2025, 4, 8),
    updatedAt: new Date(2025, 4, 8),
  },
  {
    id: "task-3",
    title: "Read Software Engineering Chapter",
    description: "Read chapter 5 on agile development methodology.",
    deadline: new Date(2025, 4, 18),
    priority: "medium",
    completed: false,
    createdAt: new Date(2025, 4, 9),
    updatedAt: new Date(2025, 4, 9),
  },
  {
    id: "task-4",
    title: "Prepare Presentation",
    description: "Create slides for the Web Development project presentation.",
    deadline: new Date(2025, 4, 25),
    priority: "low",
    completed: true,
    createdAt: new Date(2025, 4, 7),
    updatedAt: new Date(2025, 4, 12),
  },
  {
    id: "task-5",
    title: "Submit Research Paper Outline",
    description: "Complete and submit the outline for the research methodology paper.",
    deadline: new Date(2025, 4, 30),
    priority: "medium",
    completed: false,
    createdAt: new Date(2025, 4, 5),
    updatedAt: new Date(2025, 4, 5),
  },
];
