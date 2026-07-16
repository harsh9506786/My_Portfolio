import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Download } from "lucide-react";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-[900] transition-all duration-300 ${
        scrolled ? "bg-dark-900/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
        <button
          onClick={() => scrollTo("hero")}
          className="font-syne font-800 text-xl tracking-tighter text-white"
        >
          Harshvardhan<span className="text-flame-500">.</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-inter text-gray-300 hover:text-flame-400 transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="https://github.com/harsh9506786"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-flame-400 transition-colors"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>
          <a
            href="https://www.linkedin.com/in/harshvardhan-sharma-9782a7189"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-flame-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={19} />
          </a>
          <a
            href="/Harshvardhan_Sharma_Resume.pdf"
            download="Harshvardhan_Sharma_Resume.pdf"
            className="btn-flame flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
          >
            <Download size={15} />
            Resume
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-dark-900/95 backdrop-blur-md border-b border-white/5"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {links.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  className="text-left text-gray-300 hover:text-flame-400 transition-colors py-1"
                >
                  {l.label}
                </button>
              ))}
              <a
                href="/Harshvardhan_Sharma_Resume.pdf"
                download="Harshvardhan_Sharma_Resume.pdf"
                onClick={() => setOpen(false)}
                className="btn-flame flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm w-full"
              >
                <Download size={15} />
                Download Resume
              </a>

              <div className="flex items-center gap-5 pt-2">
                <a href="https://github.com/harsh9506786" target="_blank" rel="noreferrer" className="text-gray-300">
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/harshvardhan-sharma-9782a7189"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}