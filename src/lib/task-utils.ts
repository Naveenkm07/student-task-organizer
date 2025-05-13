import { AlertCircle, Book, Calendar, Check, File, FileCheck, FileText, HelpCircle, ListTodo } from "lucide-react";

export function getTaskIcon(title: string) {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('assignment') || lowerTitle.includes('homework')) {
    return FileCheck;
  }
  
  if (lowerTitle.includes('essay') || lowerTitle.includes('report')) {
    return FileText;
  }
  
  if (lowerTitle.includes('exam') || lowerTitle.includes('test') || lowerTitle.includes('quiz')) {
    return AlertCircle;
  }
  
  if (lowerTitle.includes('read') || lowerTitle.includes('book')) {
    return Book;
  }
  
  if (lowerTitle.includes('meeting') || lowerTitle.includes('appointment')) {
    return Calendar;
  }
  
  if (lowerTitle.includes('todo') || lowerTitle.includes('task')) {
    return ListTodo;
  }
  
  if (lowerTitle.includes('project')) {
    return File;
  }
  
  if (lowerTitle.includes('done') || lowerTitle.includes('complete')) {
    return Check;
  }
  
  return HelpCircle;
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case 'urgent':
      return 'bg-priority-urgent text-white';
    case 'high':
      return 'bg-priority-high text-white';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-secondary text-secondary-foreground';
  }
}
