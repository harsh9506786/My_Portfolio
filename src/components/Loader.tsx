import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 18;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 300);
          setTimeout(onComplete, 900);
          return 100;
        }
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[10000] bg-dark-900 flex flex-col items-center justify-center gap-6"
        >
          <div className="font-syne text-2xl sm:text-3xl tracking-tighter">
            <span className="text-white">HS</span>
            <span className="text-flame-500">.</span>
            <span className="text-gray-500 text-sm font-mono ml-2 align-middle">
              dev
            </span>
          </div>
          <div className="w-48 sm:w-64 h-[2px] bg-dark-500 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-flame-500 to-flame-700"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <p className="font-mono text-xs text-gray-500 tracking-widest2">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
