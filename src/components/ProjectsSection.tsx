import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";

interface CaseStudySection {
  heading: string;
  diagram?: string;
  paragraphs: string[];
}

interface ExtraLink {
  label: string;
  url: string;
}

interface Project {
  title: string;
  tagline: string;
  period: string;
  status: string;
  description: string;
  highlights: string[];
  stack: string[];
  live: string | null;
  github: string;
  caseStudy?: CaseStudySection[];
  extraLinks?: ExtraLink[];
}
const projects: Project[] = [
  {
    title: "DriveGo",
    tagline: "AI-Powered Car Rental Platform",
    period: "06/2026",
    status: "Live",
    description:
      "A full-stack car rental platform with role-based access, vehicle management, and booking — plus a Gemini AI-powered assistant that gives users personalized car recommendations based on natural-language filters. Beyond the app itself, I containerized and deployed it end-to-end on AWS with a fully automated CI/CD pipeline.",
    highlights: [
      "Role-based access, vehicle management & booking flow built on Next.js + Express.js",
      "JWT authentication and REST APIs across a Next.js frontend and Node.js backend",
      "Gemini AI integration for personalized, filter-aware car recommendations",
      "Containerized with Docker (multi-stage builds) and deployed on AWS EC2 behind an Nginx reverse proxy",
      "Custom domain with free SSL (Let's Encrypt) for HTTPS, and a GitHub Actions CI/CD pipeline for fully automated deployments",
      "Also deployed on Vercel (frontend) + Railway (backend) for quick access",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Cloudinary",
      "Gemini AI",
      "Docker",
      "AWS EC2",
      "Nginx",
      "GitHub Actions",
      "Railway",
      "Vercel",
    ],
    live: "https://car-rental-application-gray.vercel.app/",
    github: "https://github.com/harsh9506786",
    caseStudy: [
      {
        heading: "Architecture Overview",
        diagram: `Browser (HTTPS)
      │
      ▼
Nginx Reverse Proxy (Docker, ports 80/443)
      │
      ├──► /            → Frontend (Next.js, port 3000)
      └──► /api/*        → Backend (Express.js, port 5000)
                                  │
                                  ▼
                           MongoDB Atlas (cloud)`,
        paragraphs: [
          "DriveGo runs as three Docker containers orchestrated with Docker Compose on a single AWS EC2 instance: a Next.js frontend, an Express.js backend, and an Nginx reverse proxy. Nginx is the only container exposed to the internet — it terminates SSL and routes requests based on path, while the backend and frontend stay on an internal Docker network, invisible from outside.",
        ],
      },
      {
        heading: "Deployment Journey",
        paragraphs: [
          "Wrote multi-stage Dockerfiles for both frontend and backend to keep production images lean. The frontend's NEXT_PUBLIC_* environment variables are baked in at build time via Docker ARG, meaning the API URL had to be finalized before building, not just set at runtime.",
          "Deployed to a t3.micro EC2 instance (1GB RAM). The Next.js production build turned out to be memory-hungry enough to make the instance unresponsive mid-build. Diagnosed this with `top` and `free -h`, added a 2GB swap file as a stopgap, and eventually moved frontend builds to my local machine — building locally, transferring the image via `scp`, and loading it on the server with `docker load`.",
          "Configured Nginx to terminate all public traffic on one entry point, forwarding `/api/*` to the backend and everything else to the frontend — hiding the backend from direct public access.",
          "Replaced the manual save/transfer/load workflow with a GitHub Actions pipeline: on every push to main, it builds both images on GitHub's runners, pushes them to Docker Hub, then SSHes into EC2 to pull the new images and restart containers — fully automated.",
          "Pointed a DuckDNS subdomain at the EC2 instance's Elastic IP, then used Certbot to issue a free Let's Encrypt SSL certificate, updating the Nginx config to terminate HTTPS and redirect HTTP traffic.",
        ],
      },
      {
        heading: "Challenges Solved",
        paragraphs: [
          "CORS across multiple origins: as the app moved between localhost, a raw EC2 IP, a DuckDNS domain, and eventually HTTPS, each change introduced a new origin the backend's CORS config had to explicitly allow.",
          "Configuration drift between manual and automated deployment: after CI/CD reported success, the live site kept serving stale code. The cause — images built by CI/CD were tagged with a Docker Hub namespace (username/image:latest), while the server's docker-compose.yml still referenced the old, un-namespaced tag from manual deployment days. Docker Compose matched the old tag to an existing local image instead of the freshly pulled one.",
          "Memory-constrained builds on a t3.micro: a production Next.js build maxed out the 1GB instance. Solved short-term with a swap file, and properly by moving builds off the constrained instance — first to local, then to GitHub Actions' runners.",
        ],
      },
    ],
    extraLinks: [
      { label: "AWS Deployment (Docker + Nginx + HTTPS)", url: "https://drivego-app.duckdns.org" },
    ],
  },

  {
    title: "DocChat",
    tagline: "RAG-Based PDF Q&A Assistant",
    period: "07/2026",
    status: "Live",
    description:
      "An end-to-end Retrieval-Augmented Generation (RAG) app — upload a PDF and ask questions about it, with answers grounded strictly in the document's content rather than the model's general knowledge, to minimize hallucination.",
    highlights: [
      "Full RAG pipeline: PDF parsing, text chunking, embedding generation, and cosine-similarity-based retrieval",
      "Gemini API integration for embeddings (gemini-embedding-001) and grounded answer generation (gemini-2.5-flash)",
      "Prompt engineering to constrain the model to answer only from retrieved context, reducing hallucination",
      "Built with Node.js/Express backend and a React (Vite) chat interface showing matched source chunks",
    ],
    stack: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "Gemini AI",
      "RAG",
      "Vector Search",
    ],
    live: null,
    github: "https://github.com/harsh9506786/DocChat",
  },
  {
    title: "StoryVerse",
    tagline: "Cross-Platform Story Reading & Writing App",
    period: "06/2026 – Current",
    status: "In Progress",
    description:
      "A React Native (Expo) app for reading and publishing stories, built for a smooth, native-feeling experience across Android and iOS — with a Node.js/Express backend handling auth, content and search.",
    highlights: [
      "Cross-platform mobile app built with React Native (Expo) + Expo Router",
      "Authentication, story publishing, search and bookmarks",
      "Backend API integration with Node.js, Express.js and MongoDB",
      "Ongoing performance, navigation and state-management improvements",
    ],
    stack: ["React Native", "Expo Router", "Node.js", "Express.js", "MongoDB"],
    live: null,
    github: "https://github.com/harsh9506786/Story-App",
  },
  {
    title: "User & Task Manager",
    tagline: "Role-Based SaaS Dashboard for Teams",
    period: "2026",
    status: "Live",
    description:
      "A role-based SaaS dashboard where admins manage team members and assign work, while employees track and update their own tasks in real time — built on Firebase with a fully protected, role-aware routing system.",
    highlights: [
      "Firebase Authentication with role-based access control (Admin / Employee) and protected routing",
      "Admin dashboard to search users, manage roles, delete accounts, and assign tasks with live stats",
      "Employee dashboard with real-time task tracking — mark complete, delete, and filter by title",
      "Firestore for real-time data sync, built with Material UI + Tailwind CSS for a polished dashboard UI",
    ],
    stack: [
      "React",
      "Vite",
      "Firebase Auth",
      "Firestore",
      "Material UI",
      "Tailwind CSS",
      "React Router",
    ],
    live: "https://uand-t-saa-s-system.vercel.app/",
    github: "https://github.com/harsh9506786/UandT-SaaS-system",
  },
  {
    title: "BioTech",
    tagline: "Agriculture Solutions & Products Website",
    period: "2025",
    status: "Live",
    description:
      "A website built during my internship for an agri-biotech client — showcasing their agriculture solutions and product range across agriculture and public health verticals, with a category-wise catalog and enquiry system designed for lead generation.",
    highlights: [
      "Multi-page site (Home, Products, Public Health, Gallery, About, Contact) built with Next.js App Router + TypeScript",
      "Category-wise product catalog (biofertilizers, biopesticides, biofungicides, bionematicides and more) with filtering and detail pages",
      "Dedicated Public Health vertical for vector-control products, with its own hero, context and strategy sections",
      "Enquiry and contact forms with Framer Motion micro-interactions for a polished, conversion-focused UI",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Icons",
    ],
    live: "https://bio-tech-weld.vercel.app/",
    github: "https://github.com/harsh9506786/Bio-Tech",
  },
  {
    title: "Agnee",
    tagline: "AI-Driven Branding & Growth Agency Website",
    period: "2025",
    status: "Live",
    description:
      "The marketing website for the agency I interned with — an AI-driven branding and growth agency. Beyond building the frontend, I containerized and deployed the app myself, setting up the full path from code to production server.",
    highlights: [
      "Built the full site (hero, services, team, testimonials, contact) with React, Vite, TypeScript, Tailwind CSS, Framer Motion and a custom Three.js hero animation",
      "Containerized the application with Docker for a consistent, reproducible build",
      "Deployed to an AWS EC2 instance, serving the production build directly",
      "Set up a CI/CD pipeline with GitHub Actions to automate builds and deployments on every push",
    ],
    stack: [
      "React",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Docker",
      "AWS EC2",
      "GitHub Actions",
    ],
    live: "https://www.agneeagency.com/",
    github: "https://github.com/harsh9506786/agnee-web1",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-28 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="chip inline-block mb-4 text-flame-400 border-flame-500/25 bg-flame-500/5">
            selected work
          </p>
          <h2 className="font-syne font-800 text-3xl sm:text-4xl lg:text-5xl">
            Featured <span className="text-gradient-flame">projects</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-3xl border border-white/8 bg-white/[0.02] hover:border-flame-500/30 transition-all duration-500 overflow-hidden p-7 sm:p-10"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-syne font-800 text-2xl sm:text-3xl text-white">
                      {p.title}
                    </h3>
                    <span
                      className={`chip text-[0.65rem] ${
                        p.status === "Live"
                          ? "text-green-400 border-green-500/25 bg-green-500/5"
                          : "text-flame-400 border-flame-500/25 bg-flame-500/5"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-gray-400 font-inter text-sm sm:text-base">
                    {p.tagline} · {p.period}
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-flame inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
                    >
                      Live Demo <ArrowUpRight size={15} />
                    </a>
                  )}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-white/12 text-gray-300 hover:text-flame-400 hover:border-flame-500/30 transition-colors"
                  >
                    <Github size={15} /> Code
                  </a>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6 max-w-3xl">
                {p.description}
              </p>

              <ul className="grid sm:grid-cols-2 gap-3 mb-7">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-flame-500 mt-1">▸</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="chip text-[0.68rem]">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
