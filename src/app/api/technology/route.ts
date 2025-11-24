// File: /app/api/technologies/route.ts

import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        Project: true,
      },
    });
    return NextResponse.json(technologies);
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return NextResponse.json(
      { error: "Failed to fetch technologies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, icon, category } = body;
    const date = new Date();

    const technology = await prisma.technology.create({
      data: {
        name,
        icon: icon || null,
        category: category || null,
        updatedAt: date,
      } as any, // Use type assertion to bypass TypeScript validation
    });

    return NextResponse.json(technology);
  } catch (error: any) {
    console.error("Error creating technology:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A technology with this name already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create technology" },
      { status: 500 }
    );
  }
}
