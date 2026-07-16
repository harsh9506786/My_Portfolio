import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const points = [
  "Contributed to the development and deployment of web and mobile applications using React.js, Next.js, React Native, Node.js, and Express.js.",
  "Implemented JWT-based authentication and worked across the complete development lifecycle — frontend, backend integration, and production optimization.",
  "Deployed applications on AWS, containerized services with Docker, built CI/CD pipelines using GitHub Actions, and collaborated with cross-functional teams to deliver scalable applications.",
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
                Printonia LLC · Pune (Remote) · July 2025 – Present
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
