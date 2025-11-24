"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Badge } from "@/src/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { useFetchData, useDeleteData } from "@/src/hooks/useApi"; // Import your hooks
import { toast } from "sonner"; // Import toast

interface Project {
  id: string;
  name: string;
  slug: string;
  overview: string;
  description?: string;
  thumbnail: string;
  images: string[];
  liveDemo?: string;
  githubLink?: string;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  Technology: {
    id: number;
    name: string;
  }[];
}

export default function AdminProjectsPage() {
  const [isPending, startTransition] = useTransition();

  // Fetch projects from API
  const {
    data: projects = [],
    isLoading,
    error,
    refetch,
  } = useFetchData<Project[]>(["projects"], "/api/projects");

  // Delete mutation
  const deleteMutation = useDeleteData(["projects"], "/api/projects");

  const handleDelete = async (projectId: string) => {
    startTransition(async () => {
      try {
        await deleteMutation.mutateAsync(projectId);
        toast.success("Project Deleted", {
          description: "The project has been successfully removed.",
        });
        refetch(); // Refresh the list
      } catch (error) {
        toast.error("Error", {
          description: "Failed to delete the project. Please try again.",
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">
          Error loading projects. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link href="/admin/projects/new">
          <Button className="bg-accent-primary hover:bg-accent-secondary">
            <PlusCircle className="h-4 w-4 mr-2" /> Add New Project
          </Button>
        </Link>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Projects ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No projects found. Add your first project!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[150px] text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        {project.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {project.Technology.map((tech) => (
                            <Badge
                              key={tech.id}
                              variant="outline"
                              className="text-muted-foreground"
                            >
                              {tech.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === "PUBLISHED"
                              ? "default"
                              : project.status === "DRAFT"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/projects/${project.id}/edit`}>
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground"
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="icon">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-card border-border text-foreground">
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-muted-foreground">
                                  This action cannot be undone. This will
                                  permanently delete your project "
                                  {project.name}" from the database.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-border text-foreground hover:bg-muted">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(project.id)}
                                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                  disabled={
                                    isPending || deleteMutation.isPending
                                  }
                                >
                                  {isPending || deleteMutation.isPending
                                    ? "Deleting..."
                                    : "Delete"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
