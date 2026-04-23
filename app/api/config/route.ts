import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_token")?.value;
  if (!token) return false;
  return verifyAdminToken(token);
}

export async function GET() {
  const configs = await prisma.siteConfig.findMany();
  const result: Record<string, string> = {};
  for (const c of configs) result[c.key] = c.value;
  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as Record<string, string>;

  for (const [key, value] of Object.entries(body)) {
    await prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
  return NextResponse.json({ success: true });
}
