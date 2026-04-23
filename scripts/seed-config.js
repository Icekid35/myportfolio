const { PrismaClient } = require("@prisma/client");
const { PrismaNeon } = require("@prisma/adapter-neon");
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const keys = [
    {
      key: "about_bio",
      value:
        "Hey there! I'm Bello Habeebullahi Ajetola, a passionate Full Stack Developer, Automation Engineer, and Web3 Innovator with a deep love for crafting high-performance web applications.\n\nFrom developing powerful backends with Node.js & GraphQL to creating visually stunning UIs with Tailwind CSS & Three.js, I enjoy tackling complex challenges and delivering seamless digital experiences.\n\nBeyond coding, I explore AI, blockchain, and automation to push the boundaries of what's possible on the web.\n\n🚀 Let's connect and build something amazing!",
    },
    { key: "footer_projects", value: "50+" },
    { key: "footer_clients", value: "30+" },
    { key: "footer_years", value: "5+" },
  ];
  for (const { key, value } of keys) {
    await prisma.siteConfig.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    console.log("seeded:", key);
  }
  await prisma.$disconnect();
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
