import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Project } from "../data/projects";



interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({
  project,
  onClose,
}: CaseStudyModalProps) {
  if (!project || !project.caseStudy) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0b0b0f] p-7 sm:p-10"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full border border-white/10 text-gray-400 hover:text-flame-400 hover:border-flame-500/30 transition-colors"
          >
            <X size={18} />
          </button>

          <h3 className="font-syne font-800 text-2xl sm:text-3xl text-white mb-1">
            {project.title} — Case Study
          </h3>
          <p className="text-gray-400 font-inter text-sm mb-8">
            {project.tagline}
          </p>

          {project.caseStudy.map((section) => (
            <div key={section.heading} className="mb-8">
              <h4 className="text-flame-400 font-syne font-700 text-sm uppercase tracking-wider mb-3">
                {section.heading}
              </h4>

              {section.diagram && (
                <pre className="bg-white/[0.03] border border-white/8 rounded-xl p-4 text-xs text-gray-300 overflow-x-auto mb-4 font-mono leading-relaxed">
                  {section.diagram}
                </pre>
              )}

              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-gray-300 text-sm leading-relaxed mb-3"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          {project.extraLinks && project.extraLinks.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/8">
              {project.extraLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-300 hover:text-flame-400 transition-colors border border-white/12 rounded-full px-4 py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        {project.demoVideo && (
            <div className="rounded-xl border border-white/8 bg-white/[0.02] p-8 text-center mb-5">
              <p className="text-gray-500 text-sm italic">
                🎥 Demo video coming soon
              </p>
            </div>
          )}

          {project.qrCode && (
            <div className="flex flex-col items-center gap-3 py-6 border-t border-white/8">
              <img
                src={project.qrCode}
                alt={`Scan to preview ${project.title} on Expo Go`}
                className="w-40 h-40 bg-white rounded-xl p-2"
              />
              <p className="text-xs text-gray-400 text-center max-w-xs">
                {project.qrCaption ||
                  "Scan with the Expo Go app to preview this app on your phone"}
              </p>
            </div>
          )}

          {project.note && (
            <p className="text-xs text-gray-500 italic mt-5 pt-4 border-t border-white/8">
              {project.note}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}