"use client"
import React, { useState } from "react";
import Link from "next/link";

const Heading: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[50] bg-[var(--color-body)] shadow-[0_1px_1px_rgba(0,0,0,0.06),0_2px_2px_rgba(0,0,0,0.06),0_4px_4px_rgba(0,0,0,0.06),0_8px_8px_rgba(0,0,0,0.06)] border-b border-[var(--color-border)]">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-[var(--vspace-1)] py-[var(--vspace-0_75)] border-b border-[var(--color-border)]">
        <Link href="/" className="text-white font-bold" style={{ fontSize: "var(--text-lg)" }}>
          iCEKID.
        </Link>
        <button
          className={`mobile-menu-toggle flex flex-col gap-2 cursor-pointer ${menuOpen ? "is-clicked" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-[1px] bg-white relative  transition-all"></span>
          <span className="block w-6 h-[1px] bg-white relative  transition-all"></span>
          <span className="block w-6 h-[1px] bg-white relative  transition-all"></span>
        </button>
      </div>
      
      {/* Navigation */}
      <nav className={`main-nav-wrap ${menuOpen ? "flex justify-center" : "hidden"} md:flex md:justify-center md:bg-transparent md:border-none md:py-[var(--vspace-0_5)]`}>
        <ul className="main-nav flex flex-col md:flex-row text-white text-[10px] tracking-[0.35em] uppercase w-[100%]j md:justify-around font-light border-b border-[var(--color-border)] md:border-none">

          <li className="md:border-r border-[var(--color-border)] last:border-none">
            <a href="#intro" className="block py-[var(--vspace-0_5)] px-[2.8rem] hover:text-[var(--color-1)] transition-colors">
              Intro
            </a>
          </li>
          <li className="md:border-r border-[var(--color-border)] last:border-none">
            <a href="#about" className="block py-[var(--vspace-0_5)] px-[2.8rem] hover:text-[var(--color-1)] transition-colors">
              About
            </a>
          </li>
          <li className="md:border-r border-[var(--color-border)] last:border-none">
            <a href="#works" className="block py-[var(--vspace-0_5)] px-[2.8rem] hover:text-[var(--color-1)] transition-colors">
              Works
            </a>
          </li>
          <li className="md:border-r border-[var(--color-border)] last:border-none">
            <a href="#contact" className="block py-[var(--vspace-0_5)] px-[2.8rem] hover:text-[var(--color-1)] transition-colors">
              Say Hello
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Heading;
