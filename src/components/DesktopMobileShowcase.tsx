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

/** Desktop (browser frame) and mobile (iPhone frame) screenshots side by side in one card. */
export default function DesktopMobileShowcase({
  title,
  desktop,
  mobile,
  url,
}: DesktopMobileShowcaseProps) {
  return (
    <div className="mb-8 rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent px-4 pb-8 pt-6 sm:px-8">
      <p className="chip mb-6 inline-block text-flame-400 border-flame-500/25 bg-flame-500/5">
        desktop &amp; mobile
      </p>

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:justify-center">
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex w-full max-w-2xl flex-col lg:flex-1"
        >
          <div className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0f0f12] shadow-2xl shadow-black/40 lg:flex-1">
            <div className="flex items-center gap-3 border-b border-white/8 bg-white/[0.04] px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              </div>
              {url && (
                <div className="flex-1 truncate rounded-md bg-black/30 px-3 py-1 text-center font-inter text-[0.7rem] text-gray-500">
                  {url}
                </div>
              )}
            </div>
            <div className="lg:relative lg:flex-1">
              <img
                src={desktop.src}
                alt={`${title} - ${desktop.caption}`}
                loading="lazy"
                className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover lg:object-top"
              />
            </div>
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
          />
          <figcaption className="mt-5 text-center font-inter text-xs text-gray-400">
            {mobile.caption}
          </figcaption>
        </motion.figure>
      </div>
    </div>
  );
}