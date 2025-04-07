import React from "react";
import { CopyrightIcon, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a192f] text-white py-6">
      <div className="container flex flex-col items-center justify-between px-4 mx-auto space-y-4 md:flex-row md:space-y-0">
        {/* Copyright Section */}
        <div className="flex items-center text-sm">
          <CopyrightIcon className="w-5 h-5 mr-2 text-gray-400" />
          <span>{new Date().getFullYear()} S3 AI. All Rights Reserved.</span>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/sam-sam-bull/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-indigo-500"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/sam_sam_bul/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-indigo-500"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
