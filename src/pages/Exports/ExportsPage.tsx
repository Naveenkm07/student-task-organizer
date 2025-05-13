
import { useState } from "react";
import { mockTasks } from "@/lib/mock-data";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export default function ExportsPage() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf">("csv");

  const handleExport = () => {
    if (exportFormat === "csv") {
      exportToCSV(tasks);
    } else {
      // In a real implementation, this would generate a PDF
      alert("PDF export would be implemented with a backend service");
    }
  };

  const exportToCSV = (tasks: Task[]) => {
    // Create CSV header
    const header = ["Title", "Description", "Deadline", "Priority", "Status"];
    
    // Create CSV data rows
    const dataRows = tasks.map((task) => [
      task.title,
      task.description,
      format(new Date(task.deadline), "yyyy-MM-dd"),
      task.priority,
      task.completed ? "Completed" : "Pending"
    ]);
    
    // Combine header and data
    const csvContent = [
      header.join(","),
      ...dataRows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tasks-export-${format(new Date(), "yyyy-MM-dd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Export Tasks</h1>
        <p className="text-muted-foreground">
          Export your tasks for backup or sharing
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Export Format</CardTitle>
            <CardDescription>
              Choose the format in which you want to export your tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={exportFormat}
              onValueChange={(value) => setExportFormat(value as "csv" | "pdf")}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="csv" id="csv" />
                <div className="flex flex-col gap-1">
                  <Label htmlFor="csv" className="font-medium">CSV Format</Label>
                  <p className="text-sm text-muted-foreground">
                    Export as a comma-separated values file. Compatible with Excel, Google Sheets, and other spreadsheet applications.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="pdf" id="pdf" />
                <div className="flex flex-col gap-1">
                  <Label htmlFor="pdf" className="font-medium">PDF Format</Label>
                  <p className="text-sm text-muted-foreground">
                    Export as a PDF document. Ideal for printing or sharing with others.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button onClick={handleExport} className="w-full">
              Export {tasks.length} Tasks
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Task Summary</CardTitle>
            <CardDescription>
              A quick overview of your tasks before exporting
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-xl font-medium">{tasks.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-medium">
                  {tasks.filter(task => task.completed).length}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-medium">
                  {tasks.filter(task => !task.completed).length}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Urgent</p>
                <p className="text-xl font-medium text-priority-urgent">
                  {tasks.filter(task => task.priority === "urgent" && !task.completed).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
