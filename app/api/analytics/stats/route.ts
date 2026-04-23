import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

function parseDevice(ua: string | null): "Desktop" | "Mobile" | "Tablet" {
  if (!ua) return "Desktop";
  const u = ua.toLowerCase();
  if (/tablet|ipad/.test(u)) return "Tablet";
  if (/mobile|android|iphone|ipod|blackberry|windows phone/.test(u))
    return "Mobile";
  return "Desktop";
}

function parseBrowser(ua: string | null): string {
  if (!ua) return "Other";
  if (/edg\//i.test(ua)) return "Edge";
  if (/opr\//i.test(ua)) return "Opera";
  if (/chrome/i.test(ua) && !/chromium/i.test(ua)) return "Chrome";
  if (/firefox/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  return "Other";
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("admin_token")?.value;
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalViews,
    viewsLast30Days,
    viewsLast7Days,
    viewsToday,
    rawDailyViews,
    uniqueVisitors,
    topReferrers,
    recentViews,
  ] = await Promise.all([
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: last30Days } } }),
    prisma.pageView.count({ where: { createdAt: { gte: last7Days } } }),
    prisma.pageView.count({ where: { createdAt: { gte: today } } }),
    prisma.$queryRaw<{ date: string; count: bigint }[]>`
      SELECT DATE("createdAt")::text as date, COUNT(*)::bigint as count
      FROM "PageView"
      WHERE "createdAt" >= ${last30Days}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
    prisma.pageView.findMany({
      where: { createdAt: { gte: last30Days } },
      select: { visitorId: true },
      distinct: ["visitorId"],
    }),
    prisma.pageView.groupBy({
      by: ["referrer"],
      _count: { referrer: true },
      where: { referrer: { not: null }, createdAt: { gte: last30Days } },
      orderBy: { _count: { referrer: "desc" } },
      take: 5,
    }),
    prisma.pageView.findMany({
      where: { createdAt: { gte: last30Days } },
      select: { userAgent: true },
    }),
  ]);

  // Build full 30-day array (fill missing days with 0)
  const dailyMap: Record<string, number> = {};
  for (const d of rawDailyViews) dailyMap[d.date] = Number(d.count);

  const dailyViews: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().split("T")[0];
    dailyViews.push({ date: key, count: dailyMap[key] ?? 0 });
  }

  // Device breakdown
  const deviceCount: Record<string, number> = {
    Desktop: 0,
    Mobile: 0,
    Tablet: 0,
  };
  const browserCount: Record<string, number> = {};
  for (const v of recentViews) {
    const device = parseDevice(v.userAgent);
    deviceCount[device] = (deviceCount[device] || 0) + 1;
    const browser = parseBrowser(v.userAgent);
    browserCount[browser] = (browserCount[browser] || 0) + 1;
  }

  const devices = Object.entries(deviceCount).map(([name, count]) => ({
    name,
    count,
  }));
  const browsers = Object.entries(browserCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json({
    totalViews,
    viewsLast30Days,
    viewsLast7Days,
    viewsToday,
    uniqueVisitorsLast30Days: uniqueVisitors.length,
    dailyViews,
    devices,
    browsers,
    topReferrers: topReferrers.map((r) => ({
      referrer: r.referrer || "Direct",
      count: r._count.referrer,
    })),
  });
}
