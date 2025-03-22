import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative text-gray-400 py-6 text-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Copyright Section */}
        <div className="text-sm space-x-4">
          <span>© Copyright Habeeb 2025</span>
          <span>
            Design by{" "}
            <a
              href="https://www.github.com/icekid35"
              className="text-[var(--color-btn-primary)] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Icekid
            </a>
          </span>
        </div>

        {/* Back to Top Button */}
        <div className="absolute top-[-1rem] right-6">
          <a
            href="#intro"
            title="Back to Top"
            className="flex items-center justify-center w-10 h-10 fill-white hover:fill-black rounded-full bg-gray-800 border border-gray-500 hover:bg-white hover:border-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-5 h-5 transition "
            >
              <path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
