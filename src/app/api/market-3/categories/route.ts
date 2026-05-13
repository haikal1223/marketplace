import { NextResponse } from "next/server";
import { prisma } from "lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { parentId: null },
    orderBy: { name: "asc" },
    take: 12
  });

  return NextResponse.json(categories);
}
