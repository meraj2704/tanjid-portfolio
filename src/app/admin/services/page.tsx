"use client";

import { useTransition, useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { getAllServicesData, LucideIcons } from "@/src/lib/services-data";
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
import { toast } from "sonner";

export default function AdminServicesPage() {
  const [isPending, startTransition] = useTransition();
  const services = getAllServicesData(); // Get current in-memory services

  const handleDelete = async (serviceId: string) => {
    startTransition(async () => {
      // await deleteService(serviceId)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Services</h1>
        <Link href="/admin/services/new">
          <Button className="bg-accent-primary hover:bg-accent-secondary">
            <PlusCircle className="h-4 w-4 mr-2" /> Add New Service
          </Button>
        </Link>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>All Services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No services found. Add your first service!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Short Description</TableHead>
                    <TableHead className="w-[150px] text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => {
                    const IconComponent = LucideIcons[service.icon];
                    return (
                      <TableRow key={service.id}>
                        <TableCell>
                          {IconComponent && (
                            <IconComponent className="h-5 w-5 text-accent-primary" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {service.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {service.shortDescription}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link href={`/admin/services/${service.id}/edit`}>
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
                                    permanently delete your service "
                                    {service.title}" from the in-memory data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="border-border text-foreground hover:bg-muted">
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(service.id)}
                                    className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                    disabled={isPending}
                                  >
                                    {isPending ? "Deleting..." : "Delete"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
