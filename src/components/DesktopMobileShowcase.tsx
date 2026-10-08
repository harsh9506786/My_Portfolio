import React from "react";
import { motion } from "framer-motion";
import IPhoneFrame from "./IPhoneFrame";
import { AppScreenshot } from "../data/projects";

interface DesktopMobileShowcaseProps {
  title: string;
  desktop: AppScreenshot;
  mobile: AppScreenshot;
  url?: string;
}

/** Desktop and mobile (iPhone frame) screenshots side by side in one card. */
export default function DesktopMobileShowcase({
  title,
  desktop,
  mobile,
}: DesktopMobileShowcaseProps) {
  return (
    <div className="mb-8 rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent px-4 pb-8 pt-6 sm:px-8">
      <p className="chip mb-6 inline-block text-flame-400 border-flame-500/25 bg-flame-500/5">
        desktop &amp; mobile
      </p>

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center">
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl lg:flex-1"
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0f0f12] shadow-2xl shadow-black/40">
            <img
              src={desktop.src}
              alt={`${title} - ${desktop.caption}`}
              loading="lazy"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-5 text-center font-inter text-xs text-gray-400">
            {desktop.caption}
          </figcaption>
        </motion.figure>

        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="shrink-0"
        >
          <IPhoneFrame
            src={mobile.src}
            alt={`${title} - ${mobile.caption}`}
            statusBg={mobile.statusBg}
            statusTone={mobile.statusTone}
            bottomBg={mobile.bottomBg}
          />
          <figcaption className="mt-5 text-center font-inter text-xs text-gray-400">
            {mobile.caption}
          </figcaption>
        </motion.figure>
      </div>
    </div>
  );
}