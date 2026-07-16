import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const points = [
  "Built and shipped features for both web and mobile applications using React.js, Next.js, React Native, Node.js, and Express.js — working across the full stack from UI to backend APIs.",
  "Contributed directly to live, production-grade projects — writing, testing, and deploying code that real users interacted with, not just isolated demos or prototypes.",
  "Implemented JWT-based authentication and secure REST APIs, handling session management, protected routes, and role-based access across both web and mobile clients.",
  "Worked across the complete development lifecycle — frontend UI, backend integration, database design, and production optimization for performance and reliability.",
  "Containerized services with Docker and deployed applications on AWS, ensuring consistent environments from local development through to production.",
  "Built and maintained CI/CD pipelines using GitHub Actions to automate testing and deployment, reducing manual release effort and catching issues before they reached production.",
  "Collaborated closely with cross-functional teams (design, backend, and product) in an agile workflow to plan, build, and ship scalable features on schedule.",
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="chip inline-block mb-4 text-flame-400 border-flame-500/25 bg-flame-500/5">
            experience
          </p>
          <h2 className="font-syne font-800 text-3xl sm:text-4xl lg:text-5xl">
            Where I've <span className="text-gradient-flame">worked</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/8 bg-white/[0.02] p-7 sm:p-10 relative overflow-hidden"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-flame-500/10 flex items-center justify-center shrink-0">
              <Briefcase className="text-flame-400" size={22} />
            </div>
            <div>
              <h3 className="font-syne font-700 text-xl sm:text-2xl text-white">
                Full Stack Developer Intern
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Printonia soft · Pune (Remote) · July 2025 – Present
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                <span className="text-flame-500 mt-1 shrink-0">▸</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}