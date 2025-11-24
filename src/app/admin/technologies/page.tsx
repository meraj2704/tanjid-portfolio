// File: /src/app/admin/technologies/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFetchData, useAddData, useDeleteData } from "@/src/hooks/useApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { Loader2, Plus, MoreVertical, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

// Form validation schema
const technologyFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().optional(),
  category: z.string().optional(),
});

type TechnologyFormValues = z.infer<typeof technologyFormSchema>;

interface Technology {
  id: number;
  name: string;
  icon: string | null;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  projectCount: number;
}

export default function TechnologiesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);

  // Fetch technologies
  const {
    data: technologies = [],
    isLoading,
    error,
    refetch,
  } = useFetchData<Technology[]>(["technologies"], "/api/technology");

  // Add technology mutation
  const addMutation = useAddData(["technologies"], "/api/technology");

  // Delete technology mutation
  const deleteMutation = useDeleteData(["technologies"], "/api/technology");

  // Initialize form
  const form = useForm<TechnologyFormValues>({
    resolver: zodResolver(technologyFormSchema),
    defaultValues: {
      name: "",
      icon: "",
      category: "",
    },
  });

  const onSubmit = async (data: TechnologyFormValues) => {
    try {
      await addMutation.mutateAsync(data);
      form.reset();
      setIsDialogOpen(false);
      toast.success("Technology created successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to create technology");
    }
  };

  const handleDeleteClick = (tech: Technology) => {
    setSelectedTech(tech);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTech) return;

    try {
      await deleteMutation.mutateAsync(selectedTech.id.toString());
      toast.success("Technology deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedTech(null);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete technology");
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-600">
              Error loading technologies. Please try again.
            </div>
            <div className="text-center mt-4">
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Technologies</h1>
          <p className="text-muted-foreground mt-2">
            Manage your technology stack
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent-primary hover:bg-accent-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Add Technology
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                Add New Technology
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Add a new technology to your stack.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., React, Node.js"
                          {...field}
                          className="bg-input border-border text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Icon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., ⚛️, 🟢"
                          {...field}
                          className="bg-input border-border text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Frontend, Backend"
                          {...field}
                          className="bg-input border-border text-foreground"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="border-border text-foreground"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={addMutation.isPending}
                    className="bg-accent-primary hover:bg-accent-secondary"
                  >
                    {addMutation.isPending && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    Add Technology
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-accent-primary" />
        </div>
      ) : technologies.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No technologies found.
              </p>
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="mt-4 bg-accent-primary hover:bg-accent-secondary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Technology
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">
              Technology Stack ({technologies.length})
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              All technologies used in your projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icon</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {technologies.map((tech) => (
                  <TableRow key={tech.id}>
                    <TableCell>
                      {tech.icon ? (
                        <span className="text-2xl">{tech.icon}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {tech.name}
                    </TableCell>
                    <TableCell>
                      {tech.category ? (
                        <Badge variant="secondary">{tech.category}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tech.projectCount}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(tech.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(tech)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This will permanently delete the technology "
              {selectedTech?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setDeleteDialogOpen(false)}
              className="border-border text-foreground"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive hover:bg-destructive/90"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}