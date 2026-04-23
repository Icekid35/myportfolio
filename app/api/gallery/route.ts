import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyAdminToken } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await req.json();
  const image = await prisma.galleryImage.create({ data });
  return NextResponse.json(image, { status: 201 });
}
