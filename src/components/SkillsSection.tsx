import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, Database, Cloud, Network, Terminal, Sparkles } from "lucide-react";

const groups = [
  {
    icon: Layout,
    title: "Frontend",
    items: ["React.js", "Next.js", "React Native", "HTML/CSS", "Tailwind CSS"],
  },
  {
    icon: Server,
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "GraphQL", "Firebase"],
  },
  {
    icon: Sparkles,
    title: "AI / GenAI",
    items: ["Gemini API", "RAG", "Embeddings", "Vector Search", "Prompt Engineering"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["MongoDB", "MySQL", "Redis"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    items: ["AWS (EC2, S3, IAM, CloudFront)", "Docker", "GitHub Actions", "Vercel", "Railway", "Render"],
  },
  {
    icon: Network,
    title: "System Design",
    items: ["Load Balancing", "Caching", "DB Sharding", "Replication", "CAP Theorem"],
  },
  {
    icon: Terminal,
    title: "Languages",
    items: ["JavaScript", "TypeScript", "C++"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="chip inline-block mb-4 text-flame-400 border-flame-500/25 bg-flame-500/5">
            skills
          </p>
          <h2 className="font-syne font-800 text-3xl sm:text-4xl lg:text-5xl">
            The full <span className="text-gradient-flame">stack</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-flame-500/30 hover:shadow-flame transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-flame-500/10 flex items-center justify-center mb-4">
                  <Icon className="text-flame-400" size={20} />
                </div>
                <h3 className="font-syne font-700 text-lg text-white mb-3">{g.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span key={item} className="chip text-[0.68rem] py-1.5">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}