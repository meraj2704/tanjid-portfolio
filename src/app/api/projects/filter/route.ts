import { ProjectStatus } from "@/src/generated/prisma";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get("status");

    // Validate and convert the status parameter to the correct enum type
    let status: ProjectStatus | undefined;
    if (
      statusParam &&
      Object.values(ProjectStatus).includes(statusParam as ProjectStatus)
    ) {
      status = statusParam as ProjectStatus;
    }

    const projects = await prisma.project.findMany({
      where: status ? { status } : {},
      include: { Technology: true },
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to filter projects" },
      { status: 500 }
    );
  }
}
