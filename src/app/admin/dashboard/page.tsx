"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useFetchData } from "@/src/hooks/useApi";
import { Folder, FileText, User } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useFetchData(
    ["dashboard"],
    "/api/admin/dashboard"
  );

  if (isLoading) return <div>Loading dashboard...</div>;
  if (isError) return <div>Failed to load dashboard data</div>;

  const dashboard = data?.data;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/projects">
          <Card className="bg-card border-border hover:shadow-[0_0_20px_rgba(18,247,214,0.3)] hover:border-accent-primary hover:scale-[1.01] transition-all duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
              <Folder className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboard?.totalProjects || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +{dashboard?.recentProjects?.length || 0} new projects this
                month
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/services">
          <Card className="bg-card border-border hover:shadow-[0_0_20px_rgba(18,247,214,0.3)] hover:border-accent-primary hover:scale-[1.01] transition-all duration-300 cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Services
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboard?.totalProjects || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                +1 new service added
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins Online</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard?.totalUsers || 0}
            </div>
            <p className="text-xs text-muted-foreground">Currently logged in</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/projects/new">
            <Button className="w-full bg-accent-primary hover:bg-accent-secondary">
              Add New Project
            </Button>
          </Link>
          <Link href="/admin/services/new">
            <Button className="w-full bg-accent-primary hover:bg-accent-secondary">
              Add New Service
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground"
          >
            View Public Site
          </Button>
        </div>
      </div>
    </div>
  );
}
