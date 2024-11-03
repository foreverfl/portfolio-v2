import React from "react";
import { Instagram, Github, FileText } from "@geist-ui/icons";

const Footer: React.FC = () => {
  return (
    <div className="text-gray-500 container mx-auto flex flex-col justify-between h-[400px]">
      {/* First Footer */}
      <div className="font-text my-20">
        Loosely designed in Visual Studio Code and coded by yours truly. Built
        with React and deployed with GitHub Pages.
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
            className="transition-transform transform hover:scale-110 hover:text-blue-500"
          >
            <Github className="w-10 h-10" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/foreverfl/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110 hover:text-blue-500"
          >
            <Instagram className="w-10 h-10" />
          </a>

          {/* Website */}
          <a
            href="https://mogumogu.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110 hover:text-blue-500"
          >
            <FileText className="w-10 h-10" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
