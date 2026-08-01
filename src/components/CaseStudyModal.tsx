import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle } from "lucide-react";
import { Project } from "../data/projects";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

function LazyVideo({ src, title }: { src: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Load the video source once it's near the viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto play only the first time the video comes into view.
  // Once paused (by scrolling away), it won't auto-resume — user taps play manually.
  useEffect(() => {
    if (!shouldLoad) return;
    const el = containerRef.current;
    const videoEl = videoRef.current;
    if (!el || !videoEl) return;

    let hasAutoPlayed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!hasAutoPlayed) {
            hasAutoPlayed = true;
            videoEl.play().catch(() => {
              // Autoplay can be blocked in some cases; user can tap play manually
            });
          }
        } else {
          videoEl.pause();
        }
      },
      { threshold: [0, 0.5] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div className="flex flex-col items-center py-6 border-t border-white/8">
      <div className="flex items-center gap-2 mb-5">
        <PlayCircle size={16} className="text-flame-400" />
        <h4 className="text-flame-400 font-syne font-700 text-sm uppercase tracking-wider">
          Project Demo
        </h4>
      </div>

      {/* Phone-frame styled container for mobile screen recording */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[280px] aspect-[9/19.5] rounded-[2rem] border-[6px] border-white/10 bg-black overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)]"
      >
        {/* Notch detail for realism */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-b-xl z-10" />

        {shouldLoad ? (
          <video
            ref={videoRef}
            src={src}
            controls
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover bg-black"
            aria-label={`Demo video for ${title}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500 text-xs italic px-6 text-center">
              🎥 Loading demo preview…
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CaseStudyModal({
  project,
  onClose,
}: CaseStudyModalProps) {
  if (!project || !project.caseStudy) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-0 sm:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full h-full sm:h-auto max-w-3xl sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-3xl border-0 sm:border sm:border-white/10 bg-[#0b0b0f] p-6 sm:p-10"
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
            <LazyVideo src={project.demoVideo} title={project.title} />
          )}

          {project.note && (
            <p className="text-xs text-gray-500 italic mt-5 pt-4 border-t border-white/8">
              {project.note}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
