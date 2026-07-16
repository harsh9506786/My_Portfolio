import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 150, suffix: "+", label: "LeetCode Problems Solved" },
  { value: 2, suffix: "", label: "Full-Stack Products Shipped" },
  { value: 1, suffix: "", label: "Live Internship Experience" },
  { value: 10, suffix: "+", label: "Technologies in Production Use" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-syne font-800 text-4xl sm:text-5xl lg:text-6xl text-white">
      {display}
      <span className="text-flame-500">{suffix}</span>
    </span>
  );
}

export function ImpactNumbers() {
  return (
    <section className="py-16 sm:py-20 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center lg:text-left"
          >
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-gray-400 text-xs sm:text-sm font-inter leading-snug">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
