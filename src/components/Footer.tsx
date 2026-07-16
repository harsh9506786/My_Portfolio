import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-10 px-5 sm:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-syne font-700 text-white">
          Harshvardhan<span className="text-flame-500">.</span>
        </p>
        <p className="text-xs text-gray-500 font-mono order-3 sm:order-2">
          © {new Date().getFullYear()} Harshvardhan Sharma. Built with React &amp; a lot of coffee.
        </p>
        <div className="flex items-center gap-4 order-2 sm:order-3">
          <a href="https://github.com/harsh9506786" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-flame-400 transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/harshvardhan-sharma-9782a7189" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-flame-400 transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:sharmaharshvardhan2805@gmail.com" className="text-gray-400 hover:text-flame-400 transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
