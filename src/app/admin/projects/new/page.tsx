"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAddData, useFetchData } from "@/src/hooks/useApi";
import { toast } from "sonner";
import { CalendarIcon, Upload, X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Checkbox } from "@/src/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Calendar } from "@/src/components/ui/calendar";
import { cn } from "@/src/lib/utils";

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    overview: "",
    description: "",
    liveDemo: "",
    githubLink: "",
    featured: false,
    status: "DRAFT",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    technologyIds: "",
    images: [] as File[],
  });

  const { data: technologies, isLoading } = useFetchData(
    ["technologies"],
    "/api/technology"
  );

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Use the add mutation hook
  const addMutation = useAddData(["projects"], "/api/projects");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));

      // Create preview URLs
      const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          // Handle file uploads
          formData.images.forEach((file) => {
            formDataToSend.append("images", file);
          });
        } else if (key === "startDate" || key === "endDate") {
          // Handle date fields
          if (value) {
            formDataToSend.append(key, String(value));
          }
        } else {
          formDataToSend.append(key, value as string);
        }
      });

      await addMutation.mutateAsync(formDataToSend);

      toast.success("Project Created", {
        description: "The project has been successfully created.",
      });

      router.push("/admin/projects");
      router.refresh();
    } catch (error: any) {
      toast.error("Error", {
        description:
          error.message || "Failed to create project. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <Button
          variant="outline"
          className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground"
          asChild
        >
          <Link href="/admin/projects">← Back to Projects</Link>
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter project name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="slug">Slug (URL-friendly) *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  placeholder="my-awesome-project"
                />
              </div>
            </div>

            {/* Descriptions */}
            <div className="grid gap-2">
              <Label htmlFor="overview">Short Overview *</Label>
              <Textarea
                id="overview"
                name="overview"
                value={formData.overview}
                onChange={handleInputChange}
                required
                rows={3}
                placeholder="Brief description of your project..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={7}
                placeholder="Detailed description of your project..."
              />
            </div>

            {/* Image Upload */}
            <div className="grid gap-2">
              <Label htmlFor="images">Project Images</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Label
                  htmlFor="images"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </Label>
              </div>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* URLs */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="liveDemo">Live Demo URL</Label>
                <Input
                  id="liveDemo"
                  name="liveDemo"
                  type="url"
                  value={formData.liveDemo}
                  onChange={handleInputChange}
                  placeholder="https://livedemo.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="githubLink">GitHub URL</Label>
                <Input
                  id="githubLink"
                  name="githubLink"
                  type="url"
                  value={formData.githubLink}
                  onChange={handleInputChange}
                  placeholder="https://github.com/my-repo"
                />
              </div>
            </div>

            {/* Technologies */}
            <div className="grid gap-2">
              <Label htmlFor="technologyIds">Technologies</Label>

              {isLoading ? (
                <p className="text-sm text-muted-foreground">
                  Loading technologies...
                </p>
              ) : (
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      technologyIds: value, // store selected technology id
                    }))
                  }
                  value={formData.technologyIds}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select technology" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {technologies?.map((tech: { id: string; name: string }) => (
                      <SelectItem key={tech.id} value={String(tech.id)}>
                        {tech.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Status and Featured */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "DRAFT" | "PUBLISHED" | "ARCHIVED") =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Featured Project
                </Label>
              </div>
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? (
                        format(formData.startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, startDate: date }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? (
                        format(formData.endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, endDate: date }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-accent-primary hover:bg-accent-secondary"
              disabled={addMutation.isPending}
            >
              {addMutation.isPending ? "Adding Project..." : "Add Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
