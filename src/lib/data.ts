
import { Task } from "@/lib/types";
import { ClassSession } from "@/components/TimetableGrid";
import { addDays } from "date-fns";

// Generate a random ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

// Sample tasks for the calendar
export const sampleTasks: Task[] = [
  {
    id: generateId(),
    title: "Math Assignment",
    description: "Complete exercises 1-10 from Chapter 5",
    deadline: addDays(new Date(), 2).toISOString(),
    priority: "high",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Physics Lab Report",
    description: "Write up results from the pendulum experiment",
    deadline: addDays(new Date(), 1).toISOString(),
    priority: "urgent",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "English Essay",
    description: "1500 words on Shakespeare's use of irony",
    deadline: addDays(new Date(), 5).toISOString(),
    priority: "medium",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Computer Science Project",
    description: "Implement a binary search tree in Java",
    deadline: new Date().toISOString(),
    priority: "high",
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "History Presentation",
    description: "Prepare slides on the Industrial Revolution",
    deadline: addDays(new Date(), -1).toISOString(),
    priority: "medium",
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Sample classes for the timetable
export const sampleClasses: ClassSession[] = [
  {
    id: generateId(),
    title: "Mathematics",
    instructor: "Dr. Smith",
    location: "Room 101",
    startTime: "9:00",
    endTime: "10:30",
    day: "monday",
    color: "bg-blue-100",
  },
  {
    id: generateId(),
    title: "Physics",
    instructor: "Prof. Johnson",
    location: "Lab 3",
    startTime: "11:00",
    endTime: "13:00",
    day: "monday",
    color: "bg-green-100",
  },
  {
    id: generateId(),
    title: "Computer Science",
    instructor: "Dr. Williams",
    location: "Tech Hub",
    startTime: "14:00",
    endTime: "16:00",
    day: "monday",
    color: "bg-purple-100",
  },
  {
    id: generateId(),
    title: "English Literature",
    instructor: "Prof. Davis",
    location: "Room 205",
    startTime: "9:00",
    endTime: "11:00",
    day: "tuesday",
    color: "bg-yellow-100",
  },
  {
    id: generateId(),
    title: "Biology",
    instructor: "Dr. Miller",
    location: "Lab 2",
    startTime: "13:00",
    endTime: "15:00",
    day: "tuesday",
    color: "bg-red-100",
  },
  {
    id: generateId(),
    title: "History",
    instructor: "Prof. Wilson",
    location: "Room 304",
    startTime: "9:00",
    endTime: "11:00",
    day: "wednesday",
    color: "bg-orange-100",
  },
  {
    id: generateId(),
    title: "Chemistry",
    instructor: "Dr. Brown",
    location: "Lab 1",
    startTime: "13:00",
    endTime: "15:00",
    day: "wednesday",
    color: "bg-teal-100",
  },
  {
    id: generateId(),
    title: "Statistics",
    instructor: "Prof. Taylor",
    location: "Room 102",
    startTime: "10:00",
    endTime: "12:00",
    day: "thursday",
    color: "bg-indigo-100",
  },
  {
    id: generateId(),
    title: "Psychology",
    instructor: "Dr. Anderson",
    location: "Room 201",
    startTime: "14:00",
    endTime: "16:00",
    day: "thursday",
    color: "bg-pink-100",
  },
  {
    id: generateId(),
    title: "Economics",
    instructor: "Prof. Thomas",
    location: "Room 305",
    startTime: "9:00",
    endTime: "11:00",
    day: "friday",
    color: "bg-cyan-100",
  },
  {
    id: generateId(),
    title: "Art History",
    instructor: "Dr. Martin",
    location: "Art Studio",
    startTime: "13:00",
    endTime: "15:00",
    day: "friday",
    color: "bg-emerald-100",
  }
];
