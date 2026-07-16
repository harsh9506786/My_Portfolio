# Harshvardhan Sharma — Portfolio

A premium, animated developer portfolio built with React + Vite + TypeScript + Tailwind CSS,
Framer Motion and a Three.js hero animation. Dark theme with a flame/amber accent, matching
the reference design system.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

The production build is output to `dist/`.

## Deploy

This is a static Vite build — deploy `dist/` to **Vercel**, **Netlify**, or **GitHub Pages** in
a few clicks. On Vercel: import the repo, framework preset "Vite", done.

## Customize

- **Content**: all copy lives directly in each component under `src/components/` —
  `HeroSection.tsx`, `AboutSection.tsx`, `SkillsSection.tsx`, `ProjectsSection.tsx`,
  `ExperienceSection.tsx`, `ContactSection.tsx`.
- **Colors**: edit the `flame` and `dark` palettes in `tailwind.config.js`.
- **Fonts**: Syne (headings) + Inter (body) + JetBrains Mono (chips/labels), loaded in `src/index.css`.
- **Resume download button**: currently scrolls to Contact — swap the `onClick` in `Navbar.tsx`
  for a direct link to your resume PDF once you upload one (e.g. place it in `public/resume.pdf`
  and link to `/resume.pdf`).
- **Contact form**: currently opens the visitor's email client via `mailto:`. Swap in a form
  service (Formspree, EmailJS, etc.) in `ContactSection.tsx` if you want submissions without
  relying on the visitor's mail app.

## Sections

Hero → Tech Stack Marquee → Impact Numbers → About → Skills → Projects (DriveGo, StoryVerse) →
Experience → Why Hire Me → Final CTA → Contact → Footer
