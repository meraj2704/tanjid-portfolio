// "use client";

// import { useActionState } from "react";
// import Link from "next/link";
// import { notFound, useRouter } from "next/navigation";
// import { Button } from "@/src/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/ui/card";
// import { Label } from "@/src/components/ui/label";
// import { Input } from "@/src/components/ui/input";
// import { Textarea } from "@/src/components/ui/textarea";
// import { projectsData } from "@/src/lib/projects-data"; // ✅ import local data

// interface AdminEditProjectPageProps {
//   params: {
//     id: string;
//   };
// }

// export default function AdminEditProjectPage({
//   params,
// }: AdminEditProjectPageProps) {
//   const projectId = params.id;
//   const router = useRouter();
//   const project = projectsData.find((p) => String(p.id) === String(projectId));
//   const initialState = { success: undefined, error: undefined };
//   // const [state, formAction, isPending] = useActionState(async (prevState: typeof initialState, formData: FormData) => {
//   //   // Call the server action with the project ID
//   //   const result = await editProject(params.id, formData);
//   //   return result;
//   // }, initialState);

//   if (!project) {
//     notFound(); // Redirect to 404 if project not found
//   }

//   const defaultValues = {
//     title: project.title,
//     description: project.description,
//     longDescription: project.longDescription,
//     imageUrl: project.imageUrl,
//     images: project.images.join(", "), // Convert array to comma-separated string
//     demoUrl: project.demoUrl || "",
//     githubUrl: project.githubUrl || "",
//     technologies: project.technologies.join(", "), // Convert array to comma-separated string
//     resources: project.resources ? JSON.stringify(project.resources) : "", // Convert array to JSON string
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Edit Project: {project.title}</h1>
//         <Button
//           variant="outline"
//           className="border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-accent-primary-foreground"
//         >
//           <Link href="/admin/projects">← Back to Projects</Link>
//         </Button>
//       </div>

//       <Card className="bg-card border-border">
//         <CardHeader>
//           <CardTitle>Project Details</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form className="grid gap-6">
//             <div className="grid gap-2">
//               <Label htmlFor="title">Project Title</Label>
//               <Input
//                 id="title"
//                 name="title"
//                 defaultValue={defaultValues.title}
//                 required
//                 className="bg-input border-border text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="description">Short Description</Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 defaultValue={defaultValues.description}
//                 required
//                 rows={3}
//                 className="bg-input border-border text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="longDescription">Full Description</Label>
//               <Textarea
//                 id="longDescription"
//                 name="longDescription"
//                 defaultValue={defaultValues.longDescription}
//                 required
//                 rows={7}
//                 className="bg-input border-border text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="imageUrl">Thumbnail Image URL</Label>
//               <Input
//                 id="imageUrl"
//                 name="imageUrl"
//                 type="url"
//                 defaultValue={defaultValues.imageUrl}
//                 placeholder="/placeholder.svg"
//                 required
//                 className="bg-input border-border text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="images">
//                 Carousel Image URLs (comma-separated)
//               </Label>
//               <Textarea
//                 id="images"
//                 name="images"
//                 defaultValue={defaultValues.images}
//                 placeholder="/image1.png, /image2.png"
//                 rows={4}
//                 className="bg-input border-border text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="demoUrl">Live Demo URL (Optional)</Label>
//               <Input
//                 id="demoUrl"
//                 name="demoUrl"
//                 type="url"
//                 defaultValue={defaultValues.demoUrl}
//                 placeholder="https://livedemo.com"
//                 className="bg-input border-border text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
//               <Input
//                 id="githubUrl"
//                 name="githubUrl"
//                 type="url"
//                 defaultValue={defaultValues.githubUrl}
//                 placeholder="https://github.com/my-repo"
//                 className="bg-input border-border text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="technologies">
//                 Technologies (comma-separated)
//               </Label>
//               <Input
//                 id="technologies"
//                 name="technologies"
//                 defaultValue={defaultValues.technologies}
//                 placeholder="Next.js, React, Tailwind CSS"
//                 required
//                 className="bg-input border-border text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="resources">
//                 Resources (JSON format: `{"{"}name: "Doc", url: "url"{"}"}`)
//                 (Optional)
//               </Label>
//               <Textarea
//                 id="resources"
//                 name="resources"
//                 defaultValue={defaultValues.resources}
//                 placeholder='[{"name": "Vercel", "url": "https://vercel.com"}]'
//                 rows={4}
//                 className="bg-input border-border text-foreground placeholder:text-muted-foreground"
//               />
//             </div>
//             <Button
//               type="submit"
//               className="w-full bg-accent-primary hover:bg-accent-secondary"
//             >
//               Update Project
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>
      
    </div>
  )
}
