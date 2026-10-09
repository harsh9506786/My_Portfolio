import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaCheck,
} from "react-icons/fa6";

const WHATSAPP_NUMBER = "917225037332";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi Harshvardhan, I'm ${form.name} (${form.email}).\n\n${form.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="chip inline-block mb-4 text-flame-400 border-flame-500/25 bg-flame-500/5">
            get in touch
          </p>
          <h2 className="font-syne font-800 text-3xl sm:text-4xl mb-5">
            Let's talk <span className="text-gradient-flame">shop.</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
            Whether it's a full-time role, freelance work, or just a technical
            chat — my inbox is open.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:sharmaharshvardhan2805@gmail.com"
              className="flex items-center gap-3 text-gray-300 hover:text-flame-400 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center">
                <FaEnvelope size={17} />
              </span>
              sharmaharshvardhan2805@gmail.com
            </a>
            <a
              href="tel:+917225037332"
              className="flex items-center gap-3 text-gray-300 hover:text-flame-400 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center">
                <FaPhone size={17} />
              </span>
              +91 72250 37332
            </a>
            <a
              href="https://github.com/harsh9506786"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-flame-400 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center">
                <FaGithub size={17} />
              </span>
              github.com/harsh9506786
            </a>
            <a
              href="https://www.linkedin.com/in/harshvardhan-sharma-9782a7189"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-flame-400 transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center">
                <FaLinkedin size={17} />
              </span>
              linkedin.com/in/harshvardhan-sharma
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-7 sm:p-8 rounded-3xl border border-white/8 bg-white/[0.02] space-y-5"
        >
          <div>
            <label className="text-xs font-mono text-gray-500 tracking-widest2">
              NAME
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-flame-500/50 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-gray-500 tracking-widest2">
              EMAIL
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mt-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-flame-500/50 transition-colors"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-gray-500 tracking-widest2">
              MESSAGE
            </label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full mt-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-flame-500/50 transition-colors resize-none"
              placeholder="Tell me about the role or project..."
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-flame w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm"
          >
            {status === "sent" ? (
              <>
                <FaCheck size={16} /> Opening WhatsApp...
              </>
            ) : (
              <>
                <FaPaperPlane size={16} /> Send Message
              </>
            )}
          </motion.button>
          {status === "sent" && (
            <p className="text-xs text-green-400 text-center -mt-2">
              Your message is ready in WhatsApp, just hit send.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
