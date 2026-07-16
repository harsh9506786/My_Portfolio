import React from "react";
import { motion } from "framer-motion";

const stack = [
  "React.js", "Next.js", "React Native", "TypeScript", "Node.js", "Express.js",
  "MongoDB", "MySQL", "Redis", "AWS", "Docker", "GitHub Actions", "GraphQL", "Tailwind CSS",
];

export function TechMarquee() {
  const loop = [...stack, ...stack];
  return (
    <section id="stack" className="py-10 sm:py-14 overflow-hidden">
      <p className="text-center font-mono text-xs tracking-widest2 text-gray-500 mb-6">
        TECHNOLOGIES I WORK WITH
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-16 sm:w-32 bg-gradient-to-r from-dark-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-16 sm:w-32 bg-gradient-to-l from-dark-900 to-transparent z-10" />
        <motion.div
          className="flex gap-4 sm:gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {loop.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="chip whitespace-nowrap text-sm px-4 py-2 text-gray-300"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
