
import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const technology = await prisma.technology.delete({
      where: { id: parseInt(params.id) },
    });

    return NextResponse.json({ message: "Technology deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting technology:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Technology not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to delete technology" },
      { status: 500 }
    );
  }
}
