import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    title: "DriveGo",
    tagline: "AI-Powered Car Rental Platform",
    period: "06/2026",
    status: "Live",
    description:
      "A full-stack car rental platform with role-based access, vehicle management, and booking — plus a Gemini AI-powered assistant that gives users personalized car recommendations based on natural-language filters.",
    highlights: [
      "Role-based access, vehicle management & booking flow built on Next.js + Express.js",
      "JWT authentication and REST APIs across a Next.js frontend and Node.js backend",
      "Gemini AI integration for personalized, filter-aware car recommendations",
      "Deployed on Vercel (frontend) + Railway (backend)",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Cloudinary", "Gemini AI", "Railway", "Vercel"],
    live: "https://car-rental-application-gray.vercel.app/",
    github: "https://github.com/harsh9506786",
  },
  {
    title: "StoryVerse",
    tagline: "Cross-Platform Story Reading & Writing App",
    period: "06/2026 – Current",
    status: "In Progress",
    description:
      "A React Native (Expo) app for reading and publishing stories, built for a smooth, native-feeling experience across Android and iOS — with a Node.js/Express backend handling auth, content and search.",
    highlights: [
      "Cross-platform mobile app built with React Native (Expo) + Expo Router",
      "Authentication, story publishing, search and bookmarks",
      "Backend API integration with Node.js, Express.js and MongoDB",
      "Ongoing performance, navigation and state-management improvements",
    ],
    stack: ["React Native", "Expo Router", "Node.js", "Express.js", "MongoDB"],
    live: null,
    github: "https://github.com/harsh9506786",
  },
];

export default function ProjectsSection() {
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
                    <h3 className="font-syne font-800 text-2xl sm:text-3xl text-white">{p.title}</h3>
                    <span
                      className={`chip text-[0.65rem] ${
                        p.status === "Live" ? "text-green-400 border-green-500/25 bg-green-500/5" : "text-flame-400 border-flame-500/25 bg-flame-500/5"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-gray-400 font-inter text-sm sm:text-base">{p.tagline} · {p.period}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-flame inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
                    >
                      Live Demo <ArrowUpRight size={15} />
                    </a>
                  )}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-white/12 text-gray-300 hover:text-flame-400 hover:border-flame-500/30 transition-colors"
                  >
                    <Github size={15} /> Code
                  </a>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">{p.description}</p>

              <ul className="grid sm:grid-cols-2 gap-3 mb-7">
                {p.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-flame-500 mt-1">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="chip text-[0.68rem]">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
