import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center rounded-3xl border border-flame-500/20 bg-gradient-to-br from-flame-500/10 via-transparent to-transparent p-10 sm:p-16 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,90,0,0.12), transparent 60%)" }}
        />
        <h2 className="font-syne font-800 text-3xl sm:text-4xl lg:text-5xl mb-4 relative">
          Let's build something <span className="text-gradient-flame">that scales.</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 relative">
          Looking for a Full Stack Developer who can take a feature from database to deployment?
          Let's talk about your team.
        </p>
        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=sharmaharshvardhan2805@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Harshvardhan%2C%0A%0A"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-flame relative inline-flex items-center gap-2 px-9 py-4 rounded-full text-base pulse-glow"
        >
          <Mail size={17} />
          Get in touch
        </motion.a>
      </motion.div>
    </section>
  );
}