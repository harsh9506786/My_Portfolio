import React from "react";

interface BrowserFrameProps {
  src: string;
  alt: string;
  url?: string;
}

/** Desktop screenshot inside a simple browser-window frame. */
export default function BrowserFrame({ src, alt, url }: BrowserFrameProps) {
  return (
    <div className="mb-8 rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.035] to-transparent px-4 pb-6 pt-6 sm:px-8">
      <p className="chip mb-5 inline-block text-flame-400 border-flame-500/25 bg-flame-500/5">
        desktop view
      </p>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-[#0f0f12] shadow-2xl shadow-black/40">
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
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
      </div>
    </div>
  );
}