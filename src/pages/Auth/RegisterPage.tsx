
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt with:", { name, email, password });
    // For demo, we'll just navigate to login
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      <div className="absolute right-4 top-4 md:right-8 md:top-8">
        <ThemeToggle />
      </div>
      
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Student Task Organizer</h1>
          <p className="text-sm text-muted-foreground">
            Create an account to manage your academic tasks
          </p>
        </div>

        <Card className="rounded-2xl shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details to register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@university.edu" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
