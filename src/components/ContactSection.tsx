import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send, Check, Loader2 } from "lucide-react";

// Sign up at https://formspree.io (free), create a form, and paste your endpoint below.
// It looks like: https://formspree.io/f/xxxxabcd
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
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
            Whether it's a full-time role, freelance work, or just a technical chat — my inbox
            is open.
          </p>

          <div className="space-y-4">
            <a href="mailto:sharmaharshvardhan2805@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-flame-400 transition-colors">
              <span className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center">
                <Mail size={17} />
              </span>
              sharmaharshvardhan2805@gmail.com
            </a>
            <a href="tel:7225037332" className="flex items-center gap-3 text-gray-300 hover:text-flame-400 transition-colors">
              <span className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center">
                <Phone size={17} />
              </span>
              +91 72250 37332
            </a>
            <a href="https://github.com/harsh9506786" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-flame-400 transition-colors">
              <span className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center">
                <Github size={17} />
              </span>
              github.com/harsh9506786
            </a>
            <a href="https://www.linkedin.com/in/harshvardhan-sharma-9782a7189" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-flame-400 transition-colors">
              <span className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/8 flex items-center justify-center">
                <Linkedin size={17} />
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
            <label className="text-xs font-mono text-gray-500 tracking-widest2">NAME</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-flame-500/50 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-gray-500 tracking-widest2">EMAIL</label>
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
            <label className="text-xs font-mono text-gray-500 tracking-widest2">MESSAGE</label>
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
            disabled={status === "sending"}
            whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
            whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
            className="btn-flame w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm disabled:opacity-70"
          >
            {status === "sending" && (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending...
              </>
            )}
            {status === "sent" && (
              <>
                <Check size={16} /> Message sent!
              </>
            )}
            {status === "error" && (
              <>
                <Send size={16} /> Couldn't send — try again
              </>
            )}
            {status === "idle" && (
              <>
                <Send size={16} /> Send Message
              </>
            )}
          </motion.button>
          {status === "sent" && (
            <p className="text-xs text-green-400 text-center -mt-2">
              Thanks! I'll get back to you soon.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}