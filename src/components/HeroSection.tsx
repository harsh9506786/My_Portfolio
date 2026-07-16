import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";

function HeroSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const textRef = useRef(null);
  const inView = useInView(textRef, { once: true });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // ===== CORE: wireframe icosahedron (code/tech signature) =====
    const coreGeo = new THREE.IcosahedronGeometry(1, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const innerGlowGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(innerGlowGeo, innerGlowMat));

    // ===== NEURAL NETWORK NODES (data / systems motif) =====
    const neuralPoints: THREE.Vector3[] = [];
    for (let i = 0; i < 70; i++) {
      const phi = Math.acos(-1 + (2 * i) / 70);
      const theta = Math.sqrt(70 * Math.PI) * phi;
      const r = 1.5 + Math.random() * 0.5;
      neuralPoints.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
    }
    const linePositions: number[] = [];
    for (let i = 0; i < neuralPoints.length; i++) {
      for (let j = i + 1; j < neuralPoints.length; j++) {
        const dist = neuralPoints[i].distanceTo(neuralPoints[j]);
        if (dist < 0.8) {
          linePositions.push(
            neuralPoints[i].x, neuralPoints[i].y, neuralPoints[i].z,
            neuralPoints[j].x, neuralPoints[j].y, neuralPoints[j].z
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0xff8c00, transparent: true, opacity: 0.25 });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(neuralPoints.flatMap((p) => [p.x, p.y, p.z]));
    nodeGeo.setAttribute("position", new THREE.Float32BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({ color: 0xff9500, size: 0.025, transparent: true, opacity: 0.8 });
    group.add(new THREE.Points(nodeGeo, nodeMat));

    // ===== ORBIT RINGS =====
    const ringConfigs = [
      { radius: 1.9, tube: 0.007, rot: [Math.PI / 2, 0, 0], speed: 0.003 },
      { radius: 2.2, tube: 0.005, rot: [Math.PI / 4, Math.PI / 6, 0], speed: -0.002 },
      { radius: 2.5, tube: 0.004, rot: [0, Math.PI / 3, Math.PI / 5], speed: 0.0015 },
    ];
    const rings: { mesh: THREE.Mesh; speed: number }[] = [];
    ringConfigs.forEach(({ radius, tube, rot, speed }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 8, 120);
      const mat = new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.45 });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.set(rot[0], rot[1], rot[2]);
      group.add(ring);
      rings.push({ mesh: ring, speed });
    });

    // ===== PARTICLES =====
    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: THREE.Vector3[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.8;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      const dir = new THREE.Vector3(
        particlePositions[i * 3], particlePositions[i * 3 + 1], particlePositions[i * 3 + 2]
      ).normalize();
      particleVelocities.push(dir.multiplyScalar(0.0015 + Math.random() * 0.0025));
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.Float32BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0xff9500, size: 0.016, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // ===== LIGHTS =====
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const orangeLight = new THREE.PointLight(0xff6b00, 3, 5);
    group.add(orangeLight);
    const fillLight = new THREE.PointLight(0xff9500, 1, 8);
    fillLight.position.set(2, 2, 2);
    scene.add(fillLight);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frameId: number;
    let time = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.01;

      rings.forEach(({ mesh, speed }) => {
        mesh.rotation.z += speed * 0.7;
        mesh.rotation.x += speed * 0.5;
      });

      core.rotation.x += 0.0025;
      core.rotation.y += 0.0035;
      const scale = 1 + Math.sin(time * 2) * 0.02;
      core.scale.set(scale, scale, scale);

      const targetX = mouseRef.current.y * 0.2;
      const targetY = mouseRef.current.x * 0.2;
      group.rotation.x += (targetX - group.rotation.x) * 0.04;
      group.rotation.y += (targetY - group.rotation.y) * 0.04 + 0.0015;

      const pos = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        pos.array[i * 3] += particleVelocities[i].x;
        pos.array[i * 3 + 1] += particleVelocities[i].y;
        pos.array[i * 3 + 2] += particleVelocities[i].z;
        const dist = Math.sqrt(pos.array[i * 3] ** 2 + pos.array[i * 3 + 1] ** 2 + pos.array[i * 3 + 2] ** 2);
        if (dist > 2.2) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 0.7;
          pos.array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          pos.array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pos.array[i * 3 + 2] = r * Math.cos(phi);
          const dir = new THREE.Vector3(pos.array[i * 3], pos.array[i * 3 + 1], pos.array[i * 3 + 2]).normalize();
          particleVelocities[i] = dir.multiplyScalar(0.002 + Math.random() * 0.003);
        }
      }
      pos.needsUpdate = true;

      orangeLight.intensity = 2.5 + Math.sin(time * 3) * 0.5;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full items-center overflow-hidden pt-28 lg:pt-32"
      style={{ background: "linear-gradient(135deg, #080808 0%, #0d0d0d 50%, #0a0500 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(255,107,0,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-6 pb-16 px-5 sm:px-8">
        <motion.div
          ref={textRef}
          className="w-full lg:flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="chip mb-6 text-flame-400 border-flame-500/25 bg-flame-500/5">
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
            Full Stack Developer building fast, scalable web &amp; mobile products with{" "}
            <span className="text-white font-medium">React, Next.js, React Native</span> and{" "}
            <span className="text-white font-medium">Node.js</span> — deployed on AWS &amp; Docker,
            shipped with CI/CD.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            {["React.js", "Next.js", "React Native", "Node.js", "MongoDB", "AWS"].map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center sm:items-start justify-center lg:justify-start"
          >
            <motion.button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
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
              style={{ color: "#E5E5E5", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}
            >
              <Mail size={16} />
              Get in touch
            </motion.a>
          </motion.div>
        </motion.div>

        <div
          className="flex-shrink-0 relative w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[460px] lg:h-[460px] xl:w-[600px] xl:h-[600px] mx-auto lg:mx-0 lg:-translate-y-16 xl:-translate-y-16"
        >
          <div ref={mountRef} className="absolute inset-0" />

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
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 60%, rgba(11,11,11,0.35) 100%)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        onClick={() => document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" })}
        animate={inView ? { opacity: 1 } : {}}
        initial={{ opacity: 0 }}
        transition={{ delay: 1.2 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gray-500 hover:text-flame-400 transition-colors"
      >
        <span className="text-xs font-mono tracking-widest2">SCROLL</span>
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}

export default HeroSection;