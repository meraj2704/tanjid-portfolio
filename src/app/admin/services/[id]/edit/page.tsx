"use client";

import { useActionState } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { getServiceById, LucideIcons } from "@/src/lib/services-data";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";


interface AdminEditServicePageProps {
  params: {
    id: string;
  };
}

export default function AdminEditServicePage({
  params,
}: AdminEditServicePageProps) {
  const service = getServiceById(params.id);
  const router = useRouter();

  const initialState = { success: undefined, error: undefined };
  // const [state, formAction, isPending] = useActionState(async (prevState: typeof initialState, formData: FormData) => {
  //   // const result = await editService(params.id, formData);
  //   return result;
  // }, initialState);



  if (!service) {
    notFound();
  }

  // if (state?.success === true) {
  //   toast({
  //     title: 'Service Updated',
  //     description: 'The service has been successfully updated.',
  //     variant: 'success',
  //   });
  //   router.push('/admin/services');
  // } else if (state?.success === false) {
  //   toast({
  //     title: 'Error Updating Service',
  //     description: state.error || 'Something went wrong.',
  //     variant: 'destructive',
  //   });
  // }

  const iconNames = Object.keys(LucideIcons); // Get available icon names

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Service: {service.title}</h1>
        <Button
          variant="outline"
          className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground"
        >
          <Link href="/admin/services">← Back to Services</Link>
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Service Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={service.title}
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Textarea
                id="shortDescription"
                name="shortDescription"
                defaultValue={service.shortDescription}
                required
                rows={3}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="longDescription">Full Description</Label>
              <Textarea
                id="longDescription"
                name="longDescription"
                defaultValue={service.longDescription}
                required
                rows={7}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">
                Icon Name (from Lucide React, e.g., "Server", "Layers")
              </Label>
              <Input
                id="icon"
                name="icon"
                defaultValue={service.icon}
                placeholder="Server"
                required
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                list="icon-suggestions"
              />
              <datalist id="icon-suggestions">
                {iconNames.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
              <p className="text-sm text-muted-foreground">
                Choose an icon from{" "}
                <Link
                  href="https://lucide.dev/icons/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-accent-primary"
                >
                  Lucide React
                </Link>{" "}
                (use PascalCase name, e.g., "Server", "Layers").
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-accent-primary hover:bg-accent-secondary"
            >
              Update Service
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
