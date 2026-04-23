import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const tech = await prisma.technology.update({
    where: { id },
    data: {
      name: body.name,
      iconKey: body.iconKey || body.name,
      category: body.category || "Other",
      order: body.order ?? 0,
    },
  });
  return NextResponse.json(tech);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.technology.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
