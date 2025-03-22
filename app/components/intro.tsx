"use client";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
const titles = [
  "A Full Stack Dev",
  "An Automation Engr",
  "A Software Architect",
  "A Cloud Expert",
  "A Web Perf Guru",
  "A Scalable Backend Dev",
  "An AI Enthusiast",
  "An API Specialist",
  "A UI/UX Dev",
  "A Web3 Innovator",
  "A DevOps Specialist"
];

function Intro() {
  return (
    <section
      id="intro"
      className="relative container m-auto  flex flex-col justify-center items-center min-h-screen"
    >
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between px-12">
        <div className="text-center md:text-left md:pl-[3vw]">
          <div className=" uppercase text-sm tracking-widest font-medium text-[var(--color-btn-primary-hover)] pt-3  inline-block pb-1 px-3">
            &lt;Hello World /&gt;
          </div>
          <h1 className="hoverable text-4xl md:text-8xl lg:text-8xl  text-[var(--color-text-dark)]   font-bold leading-tight mt-4 md:pr-[5vw]">
            I am Habeeb, <br />{" "}
            <span className="hoverable text-[var(--color-btn-primary)] ">
              <Typewriter
                words={titles}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>
        </div>

        <ul className="hidden md:flex flex-col items-center space-y-6 absolute right-6 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-bottom-left uppercase text-xs tracking-[.3em]">
          <li>
            <a
              href="https://github.com/icekid35"
              className="text-[var(--color-text-light)] hover:text-white transition-colors"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/javascriptpro1"
              className="text-[var(--color-text-light)] hover:text-white transition-colors"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>

      <a
        href="#about"
        className="absolute bottom-12 right-14 flex justify-center items-center w-12 h-12"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path
            className="fill-white hover:fill-indigo-500 transition-colors"
            d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"
          />
        </svg>
      </a>
    </section>
  );
}

export default Intro;
