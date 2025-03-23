"use client"
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import {
  FaJs,
  FaNodeJs,
  FaReact,
  FaGit,
  FaGithub,
  FaDocker,
  FaCss3Alt,
  FaPython
} from "react-icons/fa";
import {
  TbBrandNextjs,
  TbBrandTailwind,
  TbBrandVercel,
  TbBrandWordpress,
  TbBrandMongodb,
  TbMarkdown,
  TbSeo,
  TbBrandReactNative
} from "react-icons/tb";
import {
  SiTypescript,
  SiExpress,
  SiSass,
  SiFigma,
  SiTensorflow,
  SiPostman,
  SiPuppeteer,
  SiAppium,
  SiMysql,
  SiPostgresql,
  SiNginx,
  SiNetlify,
  SiRedis,
  SiGraphql,
  SiFirebase,
  SiGoogleauthenticator,
  SiPrisma,
  SiWebrtc,
  SiThreedotjs,
  SiEslint,
  SiClerk,
  SiD3Dotjs,
} from "react-icons/si";

// Dynamically import the GLBViewer component (3d.js) only on the client-side.
const GLBViewer = dynamic(() => import("./3d"), { ssr: false });

const technologies = [
  // Core Languages & Frameworks
  { name: "JavaScript", icon: <FaJs /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Python", icon: <FaPython /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "React", icon: <FaReact /> },
  { name: "React Native", icon: <TbBrandReactNative /> },
  { name: "Next.js", icon: <TbBrandNextjs /> },
  { name: "Three.js", icon: <SiThreedotjs /> },

  // Backend & Databases
  { name: "Express.js", icon: <SiExpress /> },
  { name: "MongoDB", icon: <TbBrandMongodb /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "MySQL", icon: <SiMysql /> },
  { name: "Redis", icon: <SiRedis /> },
  { name: "GraphQL", icon: <SiGraphql /> },
  { name: "Firebase", icon: <SiFirebase /> },

  // Styling & UI
  { name: "Tailwind CSS", icon: <TbBrandTailwind /> },
  { name: "SCSS", icon: <SiSass /> },
  { name: "CSS", icon: <FaCss3Alt /> },

  // DevOps & Deployment
  { name: "Docker", icon: <FaDocker /> },
  { name: "Nginx", icon: <SiNginx /> },
  { name: "Vercel", icon: <TbBrandVercel /> },
  { name: "Netlify", icon: <SiNetlify /> },

  // Version Control & Collaboration
  { name: "Git", icon: <FaGit /> },
  { name: "GitHub", icon: <FaGithub /> },

  // Testing & Automation
  { name: "Puppeteer", icon: <SiPuppeteer /> },
  { name: "Appium", icon: <SiAppium /> },
  { name: "Postman", icon: <SiPostman /> },

  // CMS & Design
  { name: "WordPress", icon: <TbBrandWordpress /> },
  { name: "Figma", icon: <SiFigma /> },

  // AI & Data Science
  { name: "TensorFlow", icon: <SiTensorflow /> },
  { name: "D3.js", icon: <SiD3Dotjs /> },

  // Other Utilities
  { name: "Markdown", icon: <TbMarkdown /> },
  { name: "ESLint", icon: <SiEslint /> },
  { name: "Google Oauth", icon: <SiGoogleauthenticator /> },
  { name: "Clerk", icon: <SiClerk /> },
  { name: "Web RTC", icon: <SiWebrtc /> },
  { name: "SEO", icon: <TbSeo /> },
  { name: "Prisma", icon: <SiPrisma /> }
];

function About() {
  return (
    <section id="about" className="py-16 text-white">
      {/* About Info Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center md:px-8 lg:px-8 px-2">
        {/* 3D Viewer */}
        <div className="md:w-1/2 overflow-hidden shadow-amber-500 rounded-lg shadow h-[400px] md:h-[500px] max-w-[95vw] md:max-w-screen w-full mb-6 md:mb-0">
          <GLBViewer />
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 w-full md:pl-10">
          <h2 className="text-lg text-gray-400 uppercase tracking-widest">About</h2>
          <div className="mt-4 text-lg leading-relaxed">
            Hey there! I'm Bello Habeebullahi, a passionate Full Stack Developer, Automation Engineer, and Web3 Innovator with a deep love for crafting high-performance web applications. With expertise in JavaScript, TypeScript, Node.js, React, Next.js, and cutting-edge technologies, I specialize in building scalable, efficient, and user-centric solutions.
            <p className="mt-2">
              From developing powerful backends with Node.js & GraphQL to creating visually stunning UIs with Tailwind CSS & Three.js, I enjoy tackling complex challenges and delivering seamless digital experiences. My work isn't just about writing code—it's about engineering solutions that scale, automating workflows, and optimizing performance for real-world impact.
            </p>
            <p className="mt-2">
              Beyond coding, I explore AI, blockchain, and automation to push the boundaries of what's possible on the web. Whether it's deploying microservices with Docker & Nginx, building intelligent automation tools, or crafting interactive Web3 experiences, I'm always eager to experiment, learn, and innovate.
            </p>
            <p className="mt-2">
              🚀 Let's connect and build something amazing!
            </p>
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="container mx-auto mt-16 md:px-8 lg:px-8 px-2">
        <h2 className="text-lg text-gray-400 uppercase tracking-widest">Technologies</h2>
        <ul className="mt-4 text-2xl flex flex-wrap gap-3">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="hoverable flex cursor-pointer hover:shadow-amber-50 items-center space-x-3 bg-inherit p-4 rounded-lg text-[var(--color-text-dark)] shadow-amber-500 shadow hover:shadow-2xl"
            >
              <span className="text-3xl text-[var(--color-btn-primary)]">{tech.icon}</span>
              <span className="text-lg">{tech.name}</span>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default About;
