import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaArrowDown, FaEnvelope } from "react-icons/fa6";

// three.js is big, so the 3D orb is split into its own chunk and only mounted
// after the page has painted (keeps first load + scrolling smooth on phones).
const HeroScene = lazy(() => import("./HeroScene"));

function HeroSection() {
  const textRef = useRef(null);
  const inView = useInView(textRef, { once: true });
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showScene, setShowScene] = useState(false);

  // mount the 3D scene once the browser is idle
  useEffect(() => {
    const w = window as any;
    const mount = () => setShowScene(true);
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(mount, { timeout: 1200 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(mount, 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setHasScrolled(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full items-center overflow-hidden pt-28 lg:pt-32"
      style={{
        background:
          "linear-gradient(135deg, #080808 0%, #0d0d0d 50%, #0a0500 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(255,107,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-6 pb-16 px-5 sm:px-8">
        <motion.div
          ref={textRef}
          className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="chip mb-6 text-flame-400 border-flame-500/25 bg-flame-500/5"
          >
            open to full-time opportunities
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-syne text-white font-800 leading-[0.98] text-[2.6rem] sm:text-[3.6rem] lg:text-[4.6rem] xl:text-[5.2rem]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Harshvardhan
            <br />
            <span className="text-gradient-flame">Sharma</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 font-inter text-gray-400 max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed"
          >
            Full Stack Developer building fast, scalable web &amp; mobile
            products with{" "}
            <span className="text-white font-medium">
              React, Next.js, React Native
            </span>{" "}
            and <span className="text-white font-medium">Node.js</span> —
            deployed on AWS &amp; Docker, shipped with CI/CD.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            {[
              "React.js",
              "Next.js",
              "React Native",
              "Node.js",
              "MongoDB",
              "AWS",
            ].map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center sm:items-start justify-center lg:justify-start"
          >
            <motion.button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-flame w-full sm:w-auto justify-center inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-syne pulse-glow"
            >
              View Projects
            </motion.button>
            <motion.a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sharmaharshvardhan2805@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Harshvardhan%2C%0A%0A"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:text-flame-400 hover:border-flame-500 hover:bg-flame-500/5 text-center inline-flex items-center justify-center gap-2"
              style={{
                color: "#E5E5E5",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <FaEnvelope size={16} />
              Get in touch
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="flex-shrink-0 relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] xl:w-[600px] xl:h-[600px] mx-auto lg:mx-0 lg:-translate-y-16 xl:-translate-y-16">
          {showScene && (
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="relative w-[62%] h-[62%] rounded-full overflow-hidden"
              style={{
                border: "2px solid rgba(255,107,0,0.35)",
                boxShadow:
                  "0 0 40px rgba(255,90,0,0.35), 0 0 80px rgba(255,90,0,0.15), inset 0 0 30px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src="/myimg.png"
                alt="Harshvardhan Sharma"
                width={600}
                height={600}
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(11,11,11,0.35) 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() =>
          document
            .getElementById("stack")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        initial={{ opacity: 0 }}
        animate={
          inView
            ? hasScrolled
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: [0, 8, 0] }
            : {}
        }
        transition={
          hasScrolled
            ? { duration: 0.3 }
            : {
                opacity: { delay: 1.2 },
                y: {
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                  delay: 1.2,
                },
              }
        }
        className="hidden sm:flex absolute bottom-16 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gray-500 hover:text-flame-400 transition-colors"
      >
        <span className="text-xs font-mono tracking-widest2">SCROLL</span>
        <FaArrowDown size={16} />
      </motion.button>
    </section>
  );
}

export default HeroSection;
