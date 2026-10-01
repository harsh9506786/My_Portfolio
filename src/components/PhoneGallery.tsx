import React from "react";
import { motion } from "framer-motion";
import IPhoneFrame from "./IPhoneFrame";
import { AppScreenshot } from "../data/projects";

interface PhoneGalleryProps {
  title: string;
  screenshots: AppScreenshot[];
}

/** Horizontal, swipeable row of iPhone-framed app screenshots. */
export default function PhoneGallery({
  title,
  screenshots,
}: PhoneGalleryProps) {
  return (
    <div className="mb-8 rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent px-4 pt-6 sm:px-8">
      <div className="mb-5 flex items-center justify-between">
        <p className="chip inline-block text-flame-400 border-flame-500/25 bg-flame-500/5">
          app screens
        </p>
        <span className="font-inter text-xs text-gray-500">
          {screenshots.length} screens · swipe →
        </span>
      </div>

      <div className="flame-scrollbar flex snap-x snap-mandatory gap-7 overflow-x-auto px-1 pb-8 pt-2">
        {screenshots.map((shot, i) => (
          <motion.figure
            key={shot.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.08 }}
            whileHover={{ y: -8 }}
            className="shrink-0 snap-center"
          >
            <IPhoneFrame
              src={shot.src}
              alt={`${title} - ${shot.caption}`}
              statusBg={shot.statusBg}
              statusTone={shot.statusTone}
            />
            <figcaption className="mt-5 text-center font-inter text-xs text-gray-400">
              {shot.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  );
}
