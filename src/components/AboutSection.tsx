import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Code2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="chip inline-block mb-4 text-flame-400 border-flame-500/25 bg-flame-500/5">
            about me
          </p>
          <h2 className="font-syne font-800 text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Code that ships,
            <br />
            <span className="text-gradient-flame">not just compiles.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6"
        >
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            I'm a Full Stack Developer who builds and deploys scalable web and mobile applications
            end-to-end — React and Next.js on the frontend, Node.js and Express on the backend,
            MongoDB for data, and AWS/Docker to ship it all in production. I care about clean
            authentication flows, thoughtful API design, and systems that hold up under real load.
          </p>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Alongside product work, I've solved 150+ problems on LeetCode and keep a solid grip on
            Data Structures & Algorithms and System Design — load balancing, caching, sharding,
            replication, and the CAP theorem aren't just interview terms to me, they inform how I
            architect real applications.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
              <GraduationCap className="text-flame-400 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-white font-medium">B.Tech, Information Technology</p>
                <p className="text-xs text-gray-500 mt-0.5">RGPV, Bhopal · 2022 – 2026 · CGPA 7.11/10</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
              <MapPin className="text-flame-400 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-white font-medium">Based in India</p>
                <p className="text-xs text-gray-500 mt-0.5">Available remote / relocation-ready</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02] sm:col-span-2">
              <Code2 className="text-flame-400 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-white font-medium">Currently: Full Stack Developer Intern @ Printonia LLC</p>
                <p className="text-xs text-gray-500 mt-0.5">Remote · July 2025 – Present</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
