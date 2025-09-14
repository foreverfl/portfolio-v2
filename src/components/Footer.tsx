import React from "react";
import { Instagram, Github, FileText } from "@geist-ui/icons";

const Footer: React.FC = () => {
  return (
    <footer className="text-gray-500 dark:text-gray-400 container mx-auto px-4 flex flex-col justify-between h-auto md:h-[400px] py-10 md:py-0" role="contentinfo">
      {/* First Footer */}
      <div className="font-text text-sm md:text-base my-10 md:my-20 text-center md:text-left">
        Built with React (Vite), deployed on GitHub Pages. Designed and developed in VS Code.
      </div>

      {/* Second Footer */}
      <div className="flex justify-center md:justify-end items-center pb-10 md:pb-20">
        {/* Social Icons */}
        <div className="flex space-x-4 md:space-x-6">
          {/* GitHub */}
          <a
            href="https://github.com/foreverfl"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="Visit GitHub profile"
          >
            <Github className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/foreverfl/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="Visit Instagram profile"
          >
            <Instagram className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
          </a>

          {/* Website */}
          <a
            href="https://mogumogu.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="Visit personal website"
          >
            <FileText className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
