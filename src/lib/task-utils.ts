
import { Calendar, BookOpen, FileText, Beaker, PenTool, GraduationCap, FileCode, Clock } from "lucide-react";

export function getTaskIcon(title: string) {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("study") || lowerTitle.includes("book") || lowerTitle.includes("read")) {
    return BookOpen;
  } else if (lowerTitle.includes("lab") || lowerTitle.includes("experiment")) {
    return Beaker;
  } else if (lowerTitle.includes("assignment") || lowerTitle.includes("essay")) {
    return FileText;
  } else if (lowerTitle.includes("writing") || lowerTitle.includes("note")) {
    return PenTool;
  } else if (lowerTitle.includes("exam") || lowerTitle.includes("test") || lowerTitle.includes("quiz")) {
    return GraduationCap;
  } else if (lowerTitle.includes("code") || lowerTitle.includes("project") || lowerTitle.includes("program")) {
    return FileCode;
  } else if (lowerTitle.includes("due") || lowerTitle.includes("deadline")) {
    return Clock;
  }
  
  // Default icon
  return Calendar;
}
