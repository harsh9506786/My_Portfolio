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
            I am a passionate and results-driven Development Engineer with a
            solid full-stack background, building everything from clean,
            user-friendly interfaces to fast, scalable backends. I enjoy working
            in collaborative, Agile teams, and my corporate experience has
            sharpened my adaptability and problem-solving. I’m always keen to
            keep learning and take on challenges that push what’s possible.
          </p>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            I started at Printonia Soft as a Full Stack Developer Intern in July
            2025 and moved into a full-time Full Stack Developer role in July
            2026. Working remotely with the team has taught me to own my
            features end to end, communicate clearly, and ship reliably.
          </p>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Outside of work, I learn by building. My projects include DriveGo,
            an AI-powered car rental platform, DocChat (a RAG-based app for
            asking questions over PDFs), Brew &amp; Bliss, a Flutter coffee-shop
            app, and Shrutika, a cross-platform React Native app for reading and
            writing stories. Together they cover web, mobile, and AI-driven
            features, and I’m steadily growing into a well-rounded full-stack
            and mobile developer.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
              <GraduationCap
                className="text-flame-400 shrink-0 mt-0.5"
                size={20}
              />
              <div>
                <p className="text-sm text-white font-medium">
                  B.Tech, Information Technology
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  RGPV, Bhopal · 2022 – 2026 · CGPA 7.11/10
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02]">
              <MapPin className="text-flame-400 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-white font-medium">Based in India</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Open to Remote, Hybrid & Relocation
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02] sm:col-span-2">
              <Code2 className="text-flame-400 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-white font-medium">
                  Currently: Full Stack Developer @ Printonia Soft
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Remote · July 2026 – Present (Intern: July 2025 – June 2026)
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
