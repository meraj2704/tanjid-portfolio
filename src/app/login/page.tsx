"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { useAddData } from "@/src/hooks/useApi";
import { setCookie } from "cookies-next/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // point to `/api/auth/login` → matches our Next.js API route
  const login = useAddData(["login"], "/api/auth/login");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    login.mutate(
      { email, password },
      {
        onSuccess: (response: any) => {
          // toast({
          //   title: "Login Successful",
          //   description: "Redirecting to admin dashboard.",
          // });
          setCookie("portfolio-token", response?.data?.accessToken);

          router.push("/admin/dashboard");
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.error ||
            error?.message ||
            "Please check your credentials.";
          // toast({
          //   title: "Login Failed",
          //   description: message,
          //   variant: "destructive",
          // });
        },
        onSettled: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-sm bg-card border-border">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              className="w-full bg-accent-primary hover:bg-accent-secondary"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
