import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowUpRightFromSquare, FaGithub } from "react-icons/fa6";
import CaseStudyModal from "./CaseStudyModal";
import { projects, Project } from "../data/projects";

// Converts a project title into a URL-friendly slug, e.g. "Shrutika" -> "shrutika"
function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Auto-open a project's case study if the URL has ?project=<slug>
  // e.g. https://yourportfolio.vercel.app/?project=StoryVerse
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectSlug = params.get("project");
    if (!projectSlug) return;

    const match = projects.find(
      (p) => slugify(p.title) === slugify(projectSlug),
    );

    if (match && match.caseStudy) {
      setSelectedProject(match);

      // Scroll the projects section into view so the modal opens in context
      const section = document.getElementById("projects");
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="chip inline-block mb-4 text-flame-400 border-flame-500/25 bg-flame-500/5">
            selected work
          </p>
          <h2 className="font-syne font-800 text-3xl sm:text-4xl lg:text-5xl">
            Featured <span className="text-gradient-flame">projects</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-3xl border border-white/8 bg-white/[0.02] hover:border-flame-500/30 transition-all duration-500 overflow-hidden p-7 sm:p-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-syne font-800 text-2xl sm:text-3xl text-white">
                      {p.title}
                    </h3>
                    <span
                      className={`chip text-[0.65rem] ${
                        p.status === "Live"
                          ? "text-green-400 border-green-500/25 bg-green-500/5"
                          : "text-flame-400 border-flame-500/25 bg-flame-500/5"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-gray-400 font-inter text-sm sm:text-base">
                    {p.tagline} · {p.period}
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-flame inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
                    >
                      Live Demo <FaArrowUpRightFromSquare size={15} />
                    </a>
                  )}

                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-white/12 text-gray-300 hover:text-flame-400 hover:border-flame-500/30 transition-colors"
                  >
                    <FaGithub size={15} /> Code
                  </a>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
                {p.description}
              </p>

              <ul className="grid sm:grid-cols-2 gap-3 mb-7">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-flame-500 mt-1">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="chip text-[0.68rem]">
                    {s}
                  </span>
                ))}
              </div>

              {p.caseStudy && (
                <button
                  onClick={() => setSelectedProject(p)}
                  className="text-sm text-flame-400 hover:text-flame-300 transition-colors font-syne font-700 mt-5 inline-block"
                >
                  Read full case study →
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
