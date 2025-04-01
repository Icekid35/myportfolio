"use client";

import { useState } from "react";
import Modal from "react-modal";
import React from "react";
import {
  FaJs,
  FaNodeJs,
  FaReact,
  FaGit,
  FaGithub,
  FaDocker,
  FaCss3Alt,
  FaPython,
  FaLink,
  FaExpand
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
  SiD3Dotjs
} from "react-icons/si";
import { FaArrowTrendUp, FaX } from "react-icons/fa6";
import Image from "next/image";

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
const projects = [
  {
    id: "modal-01",
    category: "Ecommerce",
    title: "Next.js Commerce Platform",
    image: "/images/ecormmerce.jpg",
    modalImage: "/images/ecormmerce.gif",
    description:
      "A feature-rich e-commerce platform built with Next.js, TypeScript, and Tailwind CSS. It includes Google OAuth for user authentication and Prisma for database management, It also has a dedicated admin dashboard.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Google OAuth"],
    link: "https://ecormmerce-psi.vercel.app/",
    code: "https://github.com/Icekid35/ecormmerce"
  },
  {
    id: "modal-02",
    category: "Admin Dashboard",
    title: "E-Commerce Admin Dashboard",
    image: "/images/iceadmin.jpg",
    modalImage: "/images/iceadmin.gif",
    description:
      "A comprehensive e-commerce admin dashboard built with Next.js, Tailwind CSS, and Clerk for authentication. Features include analytics, product management, and seamless integration with monnify for payment management.Modified  to Fit modern Ecormmerce Standard",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Clerk", "Prisma"],
    link: "https://iceadmin.vercel.app/",
    code: "https://github.com/Icekid35/iceadmin"
  },

  {
    id: "modal-04",
    category: "Automation",
    title: "Twitter Bot",
    image: "/images/twitterbot.jpg",
    modalImage: "/images/twitterbot.gif",
    description:
      "A Multipurpose twitter bot that allows user to add account and automate actions like liking, commenting, bookmarking and Retweeting, from all the account at the same time just by Pasting a Link to the required and the bot will automatically Perform the required action on all the account.",
    stack: ["Node.js", "Puppeteer", "HTML", "CSS"],
    code: "https://github.com/Icekid35/twitterbot"
  },
  {
    id: "modal-08",
    category: "Attendance Tracking",
    title: "QR Attendance Tracking PWA",
    image: "/images/qr-attendance.jpg",
    modalImage: "/images/qr-attendance.gif",
    description:
      "A Progressive Web Application (PWA) for attendance tracking using QR codes. It allows students to mark attendance by scanning QR codes, while admins manage sessions, track attendance, and generate reports. Features include access control, QR code generation, and PDF export functionality.",
    stack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "HTML5 QR Code",
      "JSPDF"
    ],
    link: "https://ice-qr.vercel.app/",
    code: "https://github.com/Icekid35/ice-qr"
  },
  {
    id: "modal-05",
    category: "E-Commerce",
    title: "React E-Commerce Platform",
    image: "/images/icecomerce.jpg",
    modalImage: "/images/icecomerce.gif",
    description:
      "A sleek and functional e-commerce platform built with React, featuring Paystack payment integration, dynamic routing, and a user-friendly interface. It utilizes modern libraries for enhanced interactivity and performance.",
    stack: [
      "React",
      "React Router DOM",
      "Tailwind CSS",
      "Paystack",
      "React Helmet",
      "Swiper",
      "JWT Decode"
    ],
    link: "https://icecommerce-jet.vercel.app/",
    code: "https://github.com/Icekid35/icecommerce"
  },
  {
    id: "modal-06",
    category: "portfolio",
    title: "Wordpress UI/UX Portfolio site",
    image: "/images/wordpress-portfolio.jpg",
    modalImage: "/images/wordpress-portfolio.gif",
    description:
      "A mordern, asthetic portfolio website built with wordpress, consisting of awesome fonts, multiple pages and a dedicated Blog. ",
    stack: ["Wordpress", "WP Form", "XAMPP"]
  },

  {
    id: "modal-07",
    category: "portfolio",
    title: "Old Portfolio Website",
    image: "/images/oldportfolio.jpg",
    modalImage: "/images/oldportfolio.gif",
    description:
      "A minimalist Portfolio website that includes appealing scroll animation.",
    stack: ["HTML", "CSS", "PWA"],
    link: "https://bellohabeeb.vercel.app/",
    code: "https://github.com/Icekid35/portfolio"
  },
  {
    id: "modal-03",
    category: "Website",
    title: "Steve Jobs Tribute Website",
    image: "/images/steve-bio.jpg",
    modalImage: "/images/steve-bio.gif",
    description:
      "A minimalist tribute website honoring Steve Jobs, designed with pure HTML and CSS. Inspired by Apple's design principles, the site features a clean black-and-white aesthetic, structured biography, achievements timeline, and an interactive image gallery.",
    stack: ["HTML", "CSS", "Responsive Design"],
    link: "https://steve-bio.vercel.app/",
    code: "https://github.com/Icekid35/steve-bio"
  },
  // Add more projects as needed
];

export default function Works() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const openModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="works" className="container py-16 px-2  mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-xl text-left text-gray-400 uppercase tracking-widest">
          Works
        </h2>

        <p className="text-7xl text-left font-semibold ml-2 mt-3 text-gray-400">
          Check out some of my latest projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-16 w-full  justify-between">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-inherit  rounded-lg shadow-sm  p-0 md:p-4   overflow-hidden flex cursor-pointer w-full"
            onClick={() => openModal(project)}
          >
            <div className="w-1/2 relative flex h-full object-cover ">
              <Image
                src={project.image}
                alt={project.title}
                className="w-full max-w-full h-full  bg-gray-800  object-cover"
                fill
              />
            </div>
            <div className="md:px-4 lg:px-4 px-2 w-1/2 gap-4  h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-text-dark)]">
                  {project.title}
                </h3>
                <span className="text-[12px] italic text-gray-400">
                  {project.category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xl text-[var(--color-btn-primary-hover)] shadow-2xl"
                    >
                      {
                        technologies.find(
                          (t) => t.name.toLowerCase() == tech.toLowerCase()
                        )?.icon
                      }
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <button
                  title="View details"
                  className=" hover:bg-amber-500 flex gap-1 md:w-full justify-center max-w-[200px] px-4 py-1 bg-[var(--color-btn-primary-hover)]  rounded-lg text-[var(--color-text-dark)] text-sm font-semibold"
                >
                  Expand <FaExpand />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        contentLabel="Project Details"
        className=" bg-[var(--color-body)] text-[var(--color-text-dark)] flex flex-col rounded-lg max-h-screen max-w-lg  lg:min-h-0 m-auto border-[var(--color-btn-primary)] shadow-[var(--color-btn-primry)]"
        overlayClassName="fixed z-51 inset-0 backdrop-blur-lg bg-black/50 flex justify-center items-center"
      >
        {selectedProject && (
          <div className="max-h-screen flex flex-col p-6">
            <button
              onClick={closeModal}
              title="Close modal"
              className="text-right text-2xl mb-3 mt-3 flex w-full justify-end  cursor-pointer text-red-500  "
            >
              <FaX />
            </button>
            <img
              src={selectedProject.modalImage}
              alt={selectedProject.title}
              className="w-full rounded-lg flex-1 bg-gray-800 min-h-30 h-full"
              loading="lazy"
            />
            <div>
              <h3 className="text-2xl font-bold mt-4">
                {selectedProject.title}
              </h3>
              <p className="text-gray-400 mt-2">
                {selectedProject.description}
              </p>
              <ul className="flex flex-wrap space-x-2 gap-2 mt-3">
                {selectedProject.stack.map((tag, index) => (
                  <li
                    key={index}
                    title={tag}
                    className="bg-[var(--color-btn-primary)] flex text-[var(--color-body)] font-semibold px-2 py-1 uppercase rounded text-[12px]"
                  >
                    {
                      technologies.find(
                        (t) => t.name.toLowerCase() == tag.toLowerCase()
                      )?.icon
                    }{" "}
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                {selectedProject.code && (
                  <a
                    href={selectedProject.code}
                    className="text-[var(--color-btn-primary)] flex font-semibold mt-4 mb-6 "
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Go to site"
                  >
                    View code <FaLink />
                  </a>
                )}
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    className="text-[var(--color-btn-primary)] flex font-semibold mt-4 mb-6 "
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Go to site"
                  >
                    View Project <FaArrowTrendUp />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
