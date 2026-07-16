import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";

const certificates = [
  {
    title: "50 Days Badge",
    issuer: "LeetCode",
    date: "2026",
    type: "Achievement",
    image: "https://placehold.co/600x420/141414/ff7a30?text=LeetCode+50+Day+Badge",
    credentialUrl: "#",
  },
  {
    title: "Full Stack Web Development (MERN)",
    issuer: "Udemy",
    date: "2026",
    type: "Certification",
    image: "https://placehold.co/600x420/141414/ff7a30?text=MERN+Stack+Certificate",
    credentialUrl: "#",
  },
  {
    title: "JavaScript Certification",
    issuer: "Udemy",
    date: "2026",
    type: "Certification",
    image: "https://placehold.co/600x420/141414/ff7a30?text=JavaScript+Certificate",
    credentialUrl: "#",
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="chip inline-block mb-4 text-flame-400 border-flame-500/25 bg-flame-500/5">
            certificates &amp; achievements
          </p>
          <h2 className="font-syne font-800 text-3xl sm:text-4xl lg:text-5xl">
            Courses & badges  <span className="text-gradient-flame">I've completed</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden hover:border-flame-500/30 hover:shadow-flame transition-all duration-300"
            >
              <div className="relative aspect-[6/4.2] overflow-hidden">
                <img
                  src={c.image}
                  alt={`${c.title} certificate`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 chip text-[0.65rem] flex items-center gap-1 text-flame-400 border-flame-500/25 bg-dark-900/70">
                  {c.type === "Achievement" ? <Award size={12} /> : <BadgeCheck size={12} />}
                  {c.type}
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-syne font-700 text-white text-base leading-snug">
                  {c.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1 font-mono">
                  {c.issuer} · {c.date}
                </p>
                <a
                  href={c.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs text-gray-300 hover:text-flame-400 transition-colors"
                >
                  View Credential <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}