
import { Calendar, BookOpen, FileText, Beaker, PenTool, GraduationCap, FileCode, Clock, CheckSquare, ClipboardCheck, FileCheck, ListCheck } from "lucide-react";

export function getTaskIcon(title: string) {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("assignment") || lowerTitle.includes("homework")) {
    return FileCheck;
  } else if (lowerTitle.includes("study") || lowerTitle.includes("book") || lowerTitle.includes("read")) {
    return BookOpen;
  } else if (lowerTitle.includes("lab") || lowerTitle.includes("experiment")) {
    return Beaker;
  } else if (lowerTitle.includes("essay")) {
    return FileText;
  } else if (lowerTitle.includes("writing") || lowerTitle.includes("note")) {
    return PenTool;
  } else if (lowerTitle.includes("exam") || lowerTitle.includes("test") || lowerTitle.includes("quiz")) {
    return GraduationCap;
  } else if (lowerTitle.includes("code") || lowerTitle.includes("project") || lowerTitle.includes("program")) {
    return FileCode;
  } else if (lowerTitle.includes("due") || lowerTitle.includes("deadline")) {
    return Clock;
  } else if (lowerTitle.includes("task") || lowerTitle.includes("todo") || lowerTitle.includes("to-do")) {
    return CheckSquare;
  } else if (lowerTitle.includes("check") || lowerTitle.includes("review")) {
    return ClipboardCheck;
  } else if (lowerTitle.includes("list")) {
    return ListCheck;
  }
  
  // Default icon
  return Calendar;
}

// Function to get color based on task priority
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "low":
      return "text-priority-low";
    case "medium":
      return "text-priority-medium";
    case "high":
      return "text-priority-high";
    case "urgent":
      return "text-priority-urgent";
    default:
      return "";
  }
}
