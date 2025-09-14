import React from "react";
import { Instagram, Github, FileText } from "@geist-ui/icons";

const Footer: React.FC = () => {
  return (
    <div className="text-gray-500 dark:text-gray-400 container mx-auto flex flex-col justify-between h-[400px]">
      {/* First Footer */}
      <div className="font-text my-20">
        Built with React (Vite), deployed on GitHub Pages. Designed and developed in VS Code.
      </div>

      {/* Second Footer */}
      <div className="flex justify-end items-center pb-20">
        {/* Social Icons */}
        <div className="flex space-x-6">
          {/* GitHub */}
          <a
            href="https://github.com/foreverfl"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <Github className="w-10 h-10" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/foreverfl/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <Instagram className="w-10 h-10" />
          </a>

          {/* Website */}
          <a
            href="https://mogumogu.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <FileText className="w-10 h-10" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
