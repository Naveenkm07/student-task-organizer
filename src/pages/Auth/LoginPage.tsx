
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password, rememberMe });
    // For demo, we'll just navigate to dashboard
    navigate("/dashboard");
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
            Manage your academic tasks efficiently
          </p>
        </div>

        <Card className="rounded-2xl shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Login to your account</CardTitle>
            <CardDescription>
              Enter your email and password to access your tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="#" 
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => 
                    setRememberMe(checked as boolean)
                  }
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none"
                >
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-primary underline-offset-4 hover:underline"
              >
                Register
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
