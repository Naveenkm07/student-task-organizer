
import React from "react";
import { cn } from "@/lib/utils";

export interface ClassSession {
  id: string;
  title: string;
  instructor: string;
  location: string;
  startTime: string;
  endTime: string;
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  color?: string;
}

interface TimetableGridProps {
  classes: ClassSession[];
}

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
];

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export const TimetableGrid: React.FC<TimetableGridProps> = ({ classes }) => {
  // Helper to position classes in the grid
  const getClassPosition = (startTime: string) => {
    const time = startTime.split(":")[0];
    const hour = parseInt(time);
    const position = hour - 8; // 8 AM is the first slot (0-indexed)
    return position >= 0 ? position : 0;
  };
  
  const getClassDuration = (startTime: string, endTime: string) => {
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]);
    return endHour - startHour;
  };
  
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header row with days */}
        <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-1 mb-1">
          <div className="h-12 flex items-center justify-center font-medium"></div>
          {daysOfWeek.map((day) => (
            <div key={day} className="h-12 flex items-center justify-center bg-muted rounded-md font-medium capitalize">
              {day}
            </div>
          ))}
        </div>
        
        {/* Time slots and classes */}
        {timeSlots.map((time, timeIndex) => (
          <div key={time} className="grid grid-cols-[100px_1fr_1fr_1fr_1fr_1fr] gap-1 mb-1">
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              {time}
            </div>
            
            {daysOfWeek.map((day) => {
              const classesForDayAndTime = classes.filter(
                (c) => c.day === day && getClassPosition(c.startTime) === timeIndex
              );
              
              return (
                <div key={`${day}-${time}`} className="h-16 bg-muted/30 rounded-md relative">
                  {classesForDayAndTime.map((classItem) => {
                    const duration = getClassDuration(classItem.startTime, classItem.endTime);
                    const height = `${Math.max(1, duration) * 100}%`;
                    
                    return (
                      <div
                        key={classItem.id}
                        className={cn(
                          "absolute inset-x-0 top-0 m-0.5 rounded p-2 overflow-hidden",
                          classItem.color || "bg-primary/15 text-primary-foreground"
                        )}
                        style={{ height, zIndex: 10 }}
                      >
                        <div className="font-medium text-sm truncate">{classItem.title}</div>
                        <div className="text-xs opacity-80 truncate">{classItem.location}</div>
                        <div className="text-xs opacity-80 truncate">{classItem.instructor}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
