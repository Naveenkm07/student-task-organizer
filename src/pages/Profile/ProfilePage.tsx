
import { useState } from "react";
import { currentUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ProfilePage() {
  const [user, setUser] = useState(currentUser);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [calendarSync, setCalendarSync] = useState(false);

  const saveChanges = () => {
    const updatedUser = {
      ...user,
      name,
      email
    };
    
    setUser(updatedUser);
    // In a real app, this would save to an API
    alert("Profile updated successfully");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your personal details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center py-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveChanges} className="w-full">
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Manage your notification and application settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email reminders about upcoming deadlines
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="calendar-sync">Calendar Sync</Label>
                <p className="text-sm text-muted-foreground">
                  Sync tasks with your external calendar
                </p>
              </div>
              <Switch
                id="calendar-sync"
                checked={calendarSync}
                onCheckedChange={setCalendarSync}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>
              Update your password and security settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="••••••••"
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Update Password
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
