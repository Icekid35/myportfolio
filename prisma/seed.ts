import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter } as ConstructorParameters<
  typeof PrismaClient
>[0]);

const projects = [
  {
    title: "Next.js Commerce Platform",
    category: "Ecommerce",
    description:
      "A feature-rich e-commerce platform built with Next.js, TypeScript, and Tailwind CSS. It includes Google OAuth for user authentication and Prisma for database management, It also has a dedicated admin dashboard.",
    image: "/images/ecormmerce.jpg",
    modalImage: "/images/ecormmerce.gif",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Google OAuth"],
    link: "https://ecormmerce-psi.vercel.app/",
    code: "https://github.com/Icekid35/ecormmerce",
    order: 1,
    featured: true,
  },
  {
    title: "E-Commerce Admin Dashboard",
    category: "Admin Dashboard",
    description:
      "A comprehensive e-commerce admin dashboard built with Next.js, Tailwind CSS, and Clerk for authentication. Features include analytics, product management, and seamless integration with monnify for payment management. Modified to Fit modern Ecommerce Standard",
    image: "/images/iceadmin.jpg",
    modalImage: "/images/iceadmin.gif",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Prisma"],
    link: "https://iceadmin.vercel.app/",
    code: "https://github.com/Icekid35/iceadmin",
    order: 2,
    featured: true,
  },
  {
    title: "Twitter Bot",
    category: "Automation",
    description:
      "A Multipurpose twitter bot that allows user to add account and automate actions like liking, commenting, bookmarking and Retweeting, from all the account at the same time just by Pasting a Link to the required and the bot will automatically Perform the required action on all the account.",
    image: "/images/twitterbot.jpg",
    modalImage: "/images/twitterbot.gif",
    stack: ["Node.js", "Puppeteer", "HTML", "CSS"],
    code: "https://github.com/Icekid35/twitterbot",
    order: 3,
    featured: false,
  },
  {
    title: "QR Attendance Tracking PWA",
    category: "Attendance Tracking",
    description:
      "A Progressive Web Application (PWA) for attendance tracking using QR codes. It allows students to mark attendance by scanning QR codes, while admins manage sessions, track attendance, and generate reports. Features include access control, QR code generation, and PDF export functionality.",
    image: "/images/qr-attendance.jpg",
    modalImage: "/images/qr-attendance.gif",
    stack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "HTML5 QR Code",
      "JSPDF",
    ],
    link: "https://ice-qr.vercel.app/",
    code: "https://github.com/Icekid35/ice-qr",
    order: 4,
    featured: false,
  },
  {
    title: "React E-Commerce Platform",
    category: "E-Commerce",
    description:
      "A sleek and functional e-commerce platform built with React, featuring Paystack payment integration, dynamic routing, and a user-friendly interface. It utilizes modern libraries for enhanced interactivity and performance.",
    image: "/images/icecomerce.jpg",
    modalImage: "/images/icecomerce.gif",
    stack: [
      "React",
      "React Router DOM",
      "Tailwind CSS",
      "Paystack",
      "React Helmet",
      "Swiper",
      "JWT Decode",
    ],
    link: "https://icecommerce-jet.vercel.app/",
    code: "https://github.com/Icekid35/icecommerce",
    order: 5,
    featured: false,
  },
  {
    title: "Wordpress UI/UX Portfolio site",
    category: "Portfolio",
    description:
      "A modern, aesthetic portfolio website built with wordpress, consisting of awesome fonts, multiple pages and a dedicated Blog.",
    image: "/images/wordpress-portfolio.jpg",
    modalImage: "/images/wordpress-portfolio.gif",
    stack: ["WordPress", "WP Form", "XAMPP"],
    order: 6,
    featured: false,
  },
  {
    title: "Old Portfolio Website",
    category: "Portfolio",
    description:
      "A minimalist Portfolio website that includes appealing scroll animation.",
    image: "/images/oldportfolio.jpg",
    modalImage: "/images/oldportfolio.gif",
    stack: ["HTML", "CSS", "PWA"],
    link: "https://bellohabeeb.vercel.app/",
    code: "https://github.com/Icekid35/portfolio",
    order: 7,
    featured: false,
  },
  {
    title: "Steve Jobs Tribute Website",
    category: "Website",
    description:
      "A minimalist tribute website honoring Steve Jobs, designed with pure HTML and CSS. Inspired by Apple's design principles, the site features a clean black-and-white aesthetic, structured biography, achievements timeline, and an interactive image gallery.",
    image: "/images/steve-bio.jpg",
    modalImage: "/images/steve-bio.gif",
    stack: ["HTML", "CSS", "Responsive Design"],
    link: "https://steve-bio.vercel.app/",
    code: "https://github.com/Icekid35/steve-bio",
    order: 8,
    featured: false,
  },
];

const galleryImages = [
  { original: "/me/me.jpg", thumbnail: "/me/me.jpg", order: 1 },
  { original: "/me/profile.JPG", thumbnail: "/me/profile.JPG", order: 2 },
  { original: "/me/profile2.JPG", thumbnail: "/me/profile2.JPG", order: 3 },
  { original: "/me/profile3.jpg", thumbnail: "/me/profile3.jpg", order: 4 },
  { original: "/me/profile4.jpg", thumbnail: "/me/profile4.jpg", order: 5 },
  { original: "/me/profile5.JPG", thumbnail: "/me/profile5.JPG", order: 6 },
];

const technologies = [
  {
    name: "JavaScript",
    iconKey: "FaJs",
    category: "Core Languages & Frameworks",
    order: 1,
  },
  {
    name: "TypeScript",
    iconKey: "SiTypescript",
    category: "Core Languages & Frameworks",
    order: 2,
  },
  {
    name: "Python",
    iconKey: "FaPython",
    category: "Core Languages & Frameworks",
    order: 3,
  },
  {
    name: "Node.js",
    iconKey: "FaNodeJs",
    category: "Core Languages & Frameworks",
    order: 4,
  },
  {
    name: "React",
    iconKey: "FaReact",
    category: "Core Languages & Frameworks",
    order: 5,
  },
  {
    name: "React Native",
    iconKey: "TbBrandReactNative",
    category: "Core Languages & Frameworks",
    order: 6,
  },
  {
    name: "Next.js",
    iconKey: "TbBrandNextjs",
    category: "Core Languages & Frameworks",
    order: 7,
  },
  {
    name: "Three.js",
    iconKey: "SiThreedotjs",
    category: "Core Languages & Frameworks",
    order: 8,
  },
  {
    name: "Express.js",
    iconKey: "SiExpress",
    category: "Backend & Databases",
    order: 9,
  },
  {
    name: "MongoDB",
    iconKey: "TbBrandMongodb",
    category: "Backend & Databases",
    order: 10,
  },
  {
    name: "PostgreSQL",
    iconKey: "SiPostgresql",
    category: "Backend & Databases",
    order: 11,
  },
  {
    name: "MySQL",
    iconKey: "SiMysql",
    category: "Backend & Databases",
    order: 12,
  },
  {
    name: "Redis",
    iconKey: "SiRedis",
    category: "Backend & Databases",
    order: 13,
  },
  {
    name: "GraphQL",
    iconKey: "SiGraphql",
    category: "Backend & Databases",
    order: 14,
  },
  {
    name: "Firebase",
    iconKey: "SiFirebase",
    category: "Backend & Databases",
    order: 15,
  },
  {
    name: "Tailwind CSS",
    iconKey: "TbBrandTailwind",
    category: "Styling & UI",
    order: 16,
  },
  { name: "SCSS", iconKey: "SiSass", category: "Styling & UI", order: 17 },
  { name: "CSS", iconKey: "FaCss3Alt", category: "Styling & UI", order: 18 },
  {
    name: "Docker",
    iconKey: "FaDocker",
    category: "DevOps & Deployment",
    order: 19,
  },
  {
    name: "Nginx",
    iconKey: "SiNginx",
    category: "DevOps & Deployment",
    order: 20,
  },
  {
    name: "Vercel",
    iconKey: "TbBrandVercel",
    category: "DevOps & Deployment",
    order: 21,
  },
  {
    name: "Netlify",
    iconKey: "SiNetlify",
    category: "DevOps & Deployment",
    order: 22,
  },
  {
    name: "Git",
    iconKey: "FaGit",
    category: "Version Control & Collaboration",
    order: 23,
  },
  {
    name: "GitHub",
    iconKey: "FaGithub",
    category: "Version Control & Collaboration",
    order: 24,
  },
  {
    name: "Puppeteer",
    iconKey: "SiPuppeteer",
    category: "Testing & Automation",
    order: 25,
  },
  {
    name: "Appium",
    iconKey: "SiAppium",
    category: "Testing & Automation",
    order: 26,
  },
  {
    name: "Postman",
    iconKey: "SiPostman",
    category: "Testing & Automation",
    order: 27,
  },
  {
    name: "WordPress",
    iconKey: "TbBrandWordpress",
    category: "CMS & Design",
    order: 28,
  },
  { name: "Figma", iconKey: "SiFigma", category: "CMS & Design", order: 29 },
  {
    name: "TensorFlow",
    iconKey: "SiTensorflow",
    category: "AI & Data Science",
    order: 30,
  },
  {
    name: "D3.js",
    iconKey: "SiD3Dotjs",
    category: "AI & Data Science",
    order: 31,
  },
  { name: "Markdown", iconKey: "TbMarkdown", category: "Other", order: 32 },
  { name: "ESLint", iconKey: "SiEslint", category: "Other", order: 33 },
  {
    name: "Google OAuth",
    iconKey: "SiGoogleauthenticator",
    category: "Other",
    order: 34,
  },
  { name: "Clerk", iconKey: "SiClerk", category: "Other", order: 35 },
  { name: "Web RTC", iconKey: "SiWebrtc", category: "Other", order: 36 },
  { name: "SEO", iconKey: "TbSeo", category: "Other", order: 37 },
  {
    name: "Prisma",
    iconKey: "SiPrisma",
    category: "Backend & Databases",
    order: 38,
  },
];

const siteConfig = [
  { key: "intro_name", value: "Habeeb" },
  {
    key: "intro_titles",
    value:
      "A Full Stack Dev,An Automation Engr,A Software Architect,A Cloud Expert,A Web Perf Guru,A Scalable Backend Dev,An AI Enthusiast,An API Specialist,A UI/UX Dev,A Web3 Innovator,A DevOps Specialist",
  },
  { key: "intro_github", value: "https://github.com/icekid35" },
  { key: "intro_instagram", value: "https://instagram.com/javascriptpro1" },
  { key: "contact_email", value: "bellohabeeb35@gmail.com" },
  {
    key: "meta_title",
    value:
      "Bello Habeebullahi Ajetola - Full-Stack Developer & Blockchain Enthusiast",
  },
];

async function main() {
  console.log("Seeding database...");

  // Seed projects
  for (const project of projects) {
    await prisma.project.upsert({
      where: {
        id: project.title.replace(/\s+/g, "-").toLowerCase().slice(0, 25),
      },
      update: project,
      create: {
        ...project,
        id: project.title.replace(/\s+/g, "-").toLowerCase().slice(0, 25),
      },
    });
  }
  console.log(`✓ Seeded ${projects.length} projects`);

  // Seed gallery
  const existingGallery = await prisma.galleryImage.count();
  if (existingGallery === 0) {
    await prisma.galleryImage.createMany({ data: galleryImages });
    console.log(`✓ Seeded ${galleryImages.length} gallery images`);
  } else {
    console.log(`✓ Gallery already has ${existingGallery} images, skipping`);
  }

  // Seed technologies
  for (const tech of technologies) {
    await prisma.technology.upsert({
      where: { name: tech.name },
      update: tech,
      create: tech,
    });
  }
  console.log(`✓ Seeded ${technologies.length} technologies`);

  // Seed site config
  for (const config of siteConfig) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    });
  }
  console.log(`✓ Seeded ${siteConfig.length} site configs`);

  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
