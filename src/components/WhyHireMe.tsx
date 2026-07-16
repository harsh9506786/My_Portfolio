import React from "react";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Gauge } from "lucide-react";

const reasons = [
  {
    icon: Rocket,
    title: "Ships end-to-end",
    desc: "From database schema to deployment pipeline — I own features across the full stack, not just one layer.",
  },
  {
    icon: ShieldCheck,
    title: "Production discipline",
    desc: "JWT auth, role-based access, Docker, CI/CD with GitHub Actions — built with real deployment constraints in mind.",
  },
  {
    icon: Gauge,
    title: "Systems-level thinking",
    desc: "Solid grip on DSA and System Design — caching, sharding, replication, load balancing — so apps scale, not just run.",
  },
];

export default function WhyHireMe() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="chip inline-block mb-4 text-flame-400 border-flame-500/25 bg-flame-500/5">
            why work with me
          </p>
          <h2 className="font-syne font-800 text-3xl sm:text-4xl lg:text-5xl">
            Built for <span className="text-gradient-flame">production</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-2xl border border-white/8 bg-white/[0.02] text-center sm:text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-flame-500/10 flex items-center justify-center mb-5 mx-auto sm:mx-0">
                  <Icon className="text-flame-400" size={22} />
                </div>
                <h3 className="font-syne font-700 text-lg text-white mb-2">{r.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
