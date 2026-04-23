import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { createHash } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const visitorId = createHash("sha256")
      .update(ip)
      .digest("hex")
      .slice(0, 16);

    await prisma.pageView.create({
      data: {
        path: body.path || "/",
        visitorId,
        userAgent: request.headers.get("user-agent") || null,
        referrer: body.referrer || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
