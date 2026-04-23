import { defineConfig } from "prisma/config";
import { PrismaNeon } from "@prisma/adapter-neon";

// Direct URL (unpooled) for migrations/push — pooled for runtime
const DIRECT_URL =
  "postgresql://neondb_owner:npg_8YUImne6RTOA@ep-falling-waterfall-am4ygx2t.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: DIRECT_URL,
  },
});
