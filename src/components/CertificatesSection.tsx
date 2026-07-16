import React from "react";
import { motion } from "framer-motion";
import { Award, Layout, Smartphone, Cloud, Network } from "lucide-react";

const achievements = [
  {
    icon: Award,
    text: "Active LeetCode practitioner — solved 100s of problems",
  },
  {
    icon: Layout,
    text: "Can build responsive, production-ready websites",
  },
  {
    icon: Smartphone,
    text: "Ships scalable, cross-platform mobile apps",
  },
  {
    icon: Cloud,
    text: "Builds, deploys and hosts apps on AWS with Docker + CI/CD",
  },
  {
    icon: Network,
    text: "Applies System Design fundamentals — caching, load balancing, scalability",
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-16 sm:py-20 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="chip inline-block mb-4 text-flame-400 border-flame-500/25 bg-flame-500/5">
            achievements
          </p>
          <h2 className="font-syne font-800 text-3xl sm:text-4xl lg:text-5xl">
            What I've <span className="text-gradient-flame">achieved</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-3">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.text}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -3, borderColor: "rgba(255,90,0,0.3)" }}
                className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.02] transition-colors duration-300"
              >
                <span className="w-9 h-9 rounded-lg bg-flame-500/10 flex items-center justify-center shrink-0">
                  <Icon className="text-flame-400" size={17} />
                </span>
                <p className="text-sm text-gray-300 leading-snug">{a.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}