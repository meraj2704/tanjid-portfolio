// File: /app/api/projects/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/src/lib/prisma";
import { supabase } from "@/src/lib/supabase";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        Technology: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract text fields
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const overview = formData.get("overview") as string;
    const description = formData.get("description") as string;
    const liveDemo = formData.get("liveDemo") as string;
    const githubLink = formData.get("githubLink") as string;
    const featured = formData.get("featured") === "true";
    const status = formData.get("status") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;

    // Extract technologies (comma-separated string of technology IDs)
    const technologyIds = formData.get("technologyIds") as string;
    const technologyIdsArray = technologyIds
      ? technologyIds
          .split(",")
          .map((id) => parseInt(id.trim()))
          .filter((id) => !isNaN(id))
      : [];

    // Handle file uploads
    const images = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    for (const image of images) {
      if (image.size > 0 && image.name !== "undefined") {
        // Check file size (50MB limit)
        if (image.size > 50 * 1024 * 1024) {
          return NextResponse.json(
            { error: `File ${image.name} exceeds the 50MB size limit` },
            { status: 400 }
          );
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const ext = image.name.split(".").pop();
        const filename = `${slug}-${timestamp}.${ext}`;
        const filePath = `projects/${filename}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from("project-images")
          .upload(filePath, buffer, {
            contentType: image.type,
            upsert: false,
          });

        if (error) {
          console.error("Supabase upload error:", error);
          throw new Error(`Failed to upload image: ${error.message}`);
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("project-images").getPublicUrl(filePath);

        imageUrls.push(publicUrl);
      }
    }
    const now = new Date();

    // Create project in database with related technologies
    // Use the unchecked approach to avoid TypeScript errors
    const project = await prisma.project.create({
      data: {
        name,
        slug,
        overview,
        description: description || null,
        liveDemo: liveDemo || null,
        githubLink: githubLink || null,
        thumbnail: imageUrls[0] || "",
        images: imageUrls,
        featured,
        status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        updatedAt: now,
        // For the many-to-many relation, we need to use the join table approach
        Technology: {
          connect: technologyIdsArray.map((id) => ({ id })),
        },
      } as any, // Use type assertion to bypass TypeScript validation
      include: {
        Technology: true,
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Upload error:", error);

    // Handle unique constraint violation (duplicate slug)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
