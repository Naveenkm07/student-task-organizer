
import { useState } from "react";
import { sampleClasses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TimetableGrid, ClassSession } from "@/components/TimetableGrid";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TimetablePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewType, setViewType] = useState<"weekly" | "daily">("weekly");
  const [classes, setClasses] = useState<ClassSession[]>(sampleClasses);

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timetable</h1>
          <p className="text-muted-foreground mt-1">
            View your weekly schedule and classes
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={viewType} onValueChange={(v: "weekly" | "daily") => setViewType(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly View</SelectItem>
              <SelectItem value="daily">Daily View</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsDialogOpen(true)}>Add Class</Button>
        </div>
      </header>

      <div className="mt-6">
        <TimetableGrid classes={classes} />
      </div>

      {/* Add Class Dialog (placeholder) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Class</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-muted-foreground">
              Class creation form would go here in a full implementation
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
