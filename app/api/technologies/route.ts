import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export async function GET() {
  const techs = await prisma.technology.findMany({
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(techs);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const tech = await prisma.technology.create({
    data: {
      name: body.name,
      iconKey: body.iconKey || body.name,
      category: body.category || "Other",
      order: body.order || 0,
    },
  });
  return NextResponse.json(tech);
}
