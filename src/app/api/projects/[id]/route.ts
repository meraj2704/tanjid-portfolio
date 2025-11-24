// File: /src/app/api/projects/[id]/route.ts
import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        Technology: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Extract technologies
    const technologyIds = formData.get("technologyIds") as string;
    const technologyIdsArray = technologyIds
      ? technologyIds
          .split(",")
          .map((id) => parseInt(id.trim()))
          .filter((id) => !isNaN(id))
      : [];

    // Handle file uploads if any new images are provided
    const images = formData.getAll("images") as File[];
    let imageUrls: string[] = [];

    for (const image of images) {
      if (image.size > 0 && image.name !== "undefined") {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        try {
          await fs.access(uploadsDir);
        } catch {
          await fs.mkdir(uploadsDir, { recursive: true });
        }

        const timestamp = Date.now();
        const ext = path.extname(image.name);
        const filename = `${slug}-${timestamp}${ext}`;
        const filepath = path.join(uploadsDir, filename);

        await fs.writeFile(filepath, buffer);
        imageUrls.push(`/uploads/${filename}`);
      }
    }

    // Get existing project to preserve existing images if no new ones are uploaded
    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(params.id) },
    });

    const updateData: any = {
      name,
      slug,
      overview,
      description: description || null,
      liveDemo: liveDemo || null,
      githubLink: githubLink || null,
      featured,
      status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      Technology: {
        set: technologyIdsArray.map((id) => ({ id })),
      },
    };

    // Only update images if new ones were uploaded
    if (imageUrls.length > 0) {
      updateData.thumbnail = imageUrls[0];
      updateData.images = imageUrls;
    }

    const project = await prisma.project.update({
      where: { id: parseInt(params.id) },
      data: updateData,
      include: {
        Technology: true,
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("Error updating project:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A project with this slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting project:", error);

    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: error.message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
