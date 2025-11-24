import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// GET /api/admin/dashboard
export async function GET() {
  try {
    // total users
    const totalUsers = await prisma.user.count();

    // total projects
    const totalProjects = await prisma.project.count();

    // projects by status
    const projectsByStatus = await prisma.project.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    // recent projects with resources and technologies
    const recentProjects = await prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        Resource: true,
        Technology: true,
      },
    });

    // recent users
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalProjects,
        projectsByStatus,
        recentProjects,
        recentUsers,
      },
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
