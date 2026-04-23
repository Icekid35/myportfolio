"use client";

import { useState, useEffect } from "react";
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
  FaExpand,
} from "react-icons/fa";
import {
  TbBrandNextjs,
  TbBrandTailwind,
  TbBrandVercel,
  TbBrandWordpress,
  TbBrandMongodb,
  TbMarkdown,
  TbSeo,
  TbBrandReactNative,
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
  { name: "Prisma", icon: <SiPrisma /> },
];

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  modalImage: string;
  link?: string | null;
  code?: string | null;
  stack: string[];
};

function SkeletonCard() {
  return (
    <div className="bg-inherit rounded-lg p-0 md:p-4 overflow-hidden flex w-full animate-pulse">
      <div className="w-1/2 bg-gray-800 rounded-lg min-h-[140px]" />
      <div className="px-4 w-1/2 space-y-3">
        <div className="h-5 bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-800 rounded w-1/2" />
        <div className="flex gap-2 mt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 w-5 bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalImageLoaded(false);
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

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-gray-500 text-lg">No projects yet.</p>
          <p className="text-gray-600 text-sm mt-2">Check back soon.</p>
        </div>
      ) : (
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
                  unoptimized
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
                            (t) => t.name.toLowerCase() == tech.toLowerCase(),
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
      )}

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
            <div className="relative w-full rounded-lg overflow-hidden min-h-[220px] bg-gray-800/60 flex items-center justify-center">
              {!modalImageLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-800/80 rounded-lg z-10">
                  <svg
                    className="animate-spin text-gray-400"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span className="text-xs text-gray-400">
                    Loading preview...
                  </span>
                </div>
              )}
              <img
                src={selectedProject.modalImage}
                alt={selectedProject.title}
                className={`w-full rounded-lg transition-opacity duration-300 ${modalImageLoaded ? "opacity-100" : "opacity-0"}`}
                loading="lazy"
                onLoad={() => setModalImageLoaded(true)}
                onError={() => setModalImageLoaded(true)}
              />
            </div>
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
                        (t) => t.name.toLowerCase() == tag.toLowerCase(),
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
