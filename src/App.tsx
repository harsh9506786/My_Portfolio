import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import { TechMarquee } from "./components/TechMarquee";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import CertificatesSection from "./components/CertificatesSection";
import WhyHireMe from "./components/WhyHireMe";
import FinalCTA from "./components/FinalCTA";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { Loader } from "./components/Loader";

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    let raf: number;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}

export function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <div className="film-grain" aria-hidden="true" />
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <div className="sep" />
        <TechMarquee />

        <div className="sep" />
        <AboutSection />
        <div className="sep" />
        <SkillsSection />
        <div className="sep" />
        <ProjectsSection />
        <div className="sep" />
        <ExperienceSection />
        <div className="sep" />
        <CertificatesSection />
     
        <div className="sep" />
        <WhyHireMe />
        <div className="sep" />
        <FinalCTA />
        <div className="sep" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
