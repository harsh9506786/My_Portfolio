import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The 3D wireframe orb behind the hero photo.
 *
 * Loaded lazily (see HeroSection) so three.js doesn't block first paint, and
 * tuned so it never fights scrolling on a phone:
 *   - lighter geometry + no antialias + pixel ratio 1 on touch devices
 *   - rendering pauses when the hero is off-screen or the tab is hidden
 *   - ~30fps cap on touch devices
 *   - no lights (every material used is a "Basic" one and ignores lights)
 */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const lowPower =
      isTouch ||
      (navigator.hardwareConcurrency || 8) <= 4 ||
      ((navigator as any).deviceMemory || 8) <= 4;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !lowPower,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(lowPower ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // detail levels
    const NODE_COUNT = lowPower ? 36 : 70;
    const PARTICLE_COUNT = lowPower ? 36 : 100;
    const RING_SEGMENTS = lowPower ? 64 : 120;
    const SPHERE_SEGMENTS = lowPower ? 16 : 32;

    // ===== CORE: wireframe icosahedron =====
    const coreGeo = new THREE.IcosahedronGeometry(1, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    const innerGlowGeo = new THREE.SphereGeometry(0.7, SPHERE_SEGMENTS, SPHERE_SEGMENTS);
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(innerGlowGeo, innerGlowMat));

    // ===== NEURAL NETWORK NODES =====
    const neuralPoints: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
      const r = 1.5 + Math.random() * 0.5;
      neuralPoints.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ),
      );
    }
    // fewer nodes -> widen the link distance a bit so it still looks connected
    const LINK_DIST = lowPower ? 1.1 : 0.8;
    const linePositions: number[] = [];
    for (let i = 0; i < neuralPoints.length; i++) {
      for (let j = i + 1; j < neuralPoints.length; j++) {
        if (neuralPoints[i].distanceTo(neuralPoints[j]) < LINK_DIST) {
          linePositions.push(
            neuralPoints[i].x, neuralPoints[i].y, neuralPoints[i].z,
            neuralPoints[j].x, neuralPoints[j].y, neuralPoints[j].z,
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.25,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        new Float32Array(neuralPoints.flatMap((p) => [p.x, p.y, p.z])),
        3,
      ),
    );
    const nodeMat = new THREE.PointsMaterial({
      color: 0xff9500,
      size: 0.025,
      transparent: true,
      opacity: 0.8,
    });
    group.add(new THREE.Points(nodeGeo, nodeMat));

    // ===== ORBIT RINGS =====
    const ringConfigs = [
      { radius: 1.9, tube: 0.007, rot: [Math.PI / 2, 0, 0], speed: 0.003 },
      { radius: 2.2, tube: 0.005, rot: [Math.PI / 4, Math.PI / 6, 0], speed: -0.002 },
      { radius: 2.5, tube: 0.004, rot: [0, Math.PI / 3, Math.PI / 5], speed: 0.0015 },
    ];
    const rings: { mesh: THREE.Mesh; speed: number }[] = [];
    const ringGeos: THREE.BufferGeometry[] = [];
    const ringMats: THREE.Material[] = [];
    ringConfigs.forEach(({ radius, tube, rot, speed }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 6, RING_SEGMENTS);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xff6b00,
        transparent: true,
        opacity: 0.45,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.set(rot[0], rot[1], rot[2]);
      group.add(ring);
      rings.push({ mesh: ring, speed });
      ringGeos.push(geo);
      ringMats.push(mat);
    });

    // ===== PARTICLES =====
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const respawn = (i: number, radius: number, speedMin: number, speedVar: number) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
      const len = Math.sqrt(x * x + y * y + z * z) || 1;
      const s = speedMin + Math.random() * speedVar;
      velocities[i * 3] = (x / len) * s;
      velocities[i * 3 + 1] = (y / len) * s;
      velocities[i * 3 + 2] = (z / len) * s;
    };
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      respawn(i, 1.2 + Math.random() * 0.8, 0.0015, 0.0025);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff9500,
      size: 0.016,
      transparent: true,
      opacity: 0.6,
    });
    group.add(new THREE.Points(particleGeo, particleMat));

    // desktop-only parallax (no mouse on phones)
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (!isTouch) window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // ===== render loop (pausable) =====
    let frameId = 0;
    let time = 0;
    let running = false;
    let last = 0;
    const FRAME_MS = isTouch ? 1000 / 30 : 0; // 30fps cap on phones

    const step = () => {
      time += 0.01;

      rings.forEach(({ mesh, speed }) => {
        mesh.rotation.z += speed * 0.7;
        mesh.rotation.x += speed * 0.5;
      });

      core.rotation.x += 0.0025;
      core.rotation.y += 0.0035;
      const scale = 1 + Math.sin(time * 2) * 0.02;
      core.scale.set(scale, scale, scale);

      group.rotation.x += (mouseRef.current.y * 0.2 - group.rotation.x) * 0.04;
      group.rotation.y += (mouseRef.current.x * 0.2 - group.rotation.y) * 0.04 + 0.0015;

      const arr = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const k = i * 3;
        arr[k] += velocities[k];
        arr[k + 1] += velocities[k + 1];
        arr[k + 2] += velocities[k + 2];
        const d2 = arr[k] * arr[k] + arr[k + 1] * arr[k + 1] + arr[k + 2] * arr[k + 2];
        if (d2 > 2.2 * 2.2) respawn(i, 0.7, 0.002, 0.003);
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const loop = (now: number) => {
      if (!running) return;
      frameId = requestAnimationFrame(loop);
      if (FRAME_MS && now - last < FRAME_MS) return;
      last = now;
      step();
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      frameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    // draw one frame immediately so there is never an empty canvas
    step();
    start();

    // pause when scrolled away from the hero, or when the tab is hidden
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        visible && !document.hidden ? start() : stop();
      },
      { threshold: 0 },
    );
    io.observe(container);
    const onVisibility = () => (document.hidden || !visible ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    // resize (ResizeObserver also covers phone rotation)
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (!running) renderer.render(scene, camera);
    });
    ro.observe(container);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", handleMouseMove);

      [coreGeo, innerGlowGeo, lineGeo, nodeGeo, particleGeo, ...ringGeos].forEach((g) => g.dispose());
      [coreMat, innerGlowMat, lineMat, nodeMat, particleMat, ...ringMats].forEach((m) => m.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}