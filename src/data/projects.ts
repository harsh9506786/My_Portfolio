export interface CaseStudySection {
  heading: string;
  diagram?: string;
  paragraphs: string[];
}

export interface ExtraLink {
  label: string;
  url: string;
}

export interface AppScreenshot {
  /** Path inside /public, e.g. "/screenshots/brew-bliss/01-home.webp" */
  src: string;
  caption: string;
  /** Colour of the top of the screenshot (fills the fake status bar) */
  statusBg?: string;
  statusTone?: "dark" | "light";
}

export interface Project {
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
  note?: string;
  qrCode?: string;
  qrCaption?: string;
  demoVideo?: string;
  demoVideoPoster?: string;
  screenshots?: AppScreenshot[];
  desktopScreenshot?: AppScreenshot;
  mobileScreenshot?: AppScreenshot;
}

export const projects: Project[] = [
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
    desktopScreenshot: {
      src: "/screenshots/drivego/carrentalimg.jpeg",
      caption: "Desktop view",
    },
    mobileScreenshot: {
      src: "/screenshots/drivego/carrentalmobile.jpeg",
      caption: "Mobile view",
    },
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
      {
        label: "AWS Deployment (Docker + Nginx + HTTPS)",
        url: "https://drivego-app.duckdns.org",
      },
    ],
    note: "The AWS instance isn't kept running 24/7 to avoid unnecessary billing — happy to spin it up live during a call.",
  },
  {
    title: "Shrutika",
    tagline: "Cross-Platform Story Reading & Writing App",
    period: "06/2026 – Current",
    status: "Live (APK)",
    description:
      "A React Native (Expo) app where users can read stories across genres, publish their own, and bookmark favorites — built for a smooth, native-feeling experience across Android and iOS, with a Node.js/Express backend handling auth, content and search.",
    highlights: [
      "Cross-platform mobile app built with React Native (Expo) + Expo Router, targeting a native-feeling experience on both Android and iOS",
      "Firebase Authentication with AsyncStorage persistence, story publishing, bookmarks, and a debounced Search screen with genre-based discovery",
      "Node.js/Express backend with MongoDB, including a dedicated search endpoint for content discovery",
      "Resolved a Hermes/Babel compatibility conflict between react-native-reanimated v4 and NativeWind (which required v3), pinning versions to keep both working together",
      "Conducted a full performance optimization pass across screens and media loading, and built a dedicated backend search endpoint for genre-based content discovery",
      "Deployed the backend on Render and distributed the app as a standalone Android APK built locally via Gradle (./gradlew assembleRelease), published on GitHub Releases — fully installable and functional end-to-end",
    ],
    stack: [
      "React Native",
      "Expo Router",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase Auth",
      "AsyncStorage",
      "Reanimated",
      "NativeWind",
    ],
    live: "https://github.com/harsh9506786/Story-App/releases/download/v2.0.0/app-release.apk",
    github: "https://github.com/harsh9506786/Story-App",
    caseStudy: [
      {
        heading: "Architecture Overview",
        diagram: `React Native App (Expo Router)
      │
      ├──► Firebase Auth ──► AsyncStorage (session persistence)
      │
      ▼
Express.js REST API (Node.js)
      │
      ├──► /stories        → Feed, publish, bookmarks
      ├──► /search          → Debounced genre & keyword search
      └──► /users            → Author profiles
                                  │
                                  ▼
                           MongoDB (content, users, search index)`,
        paragraphs: [
          "Shrutika is a cross-platform mobile app built with React Native and Expo Router, using file-based routing for screens like story feeds, author profiles, search, and bookmarks. Firebase handles authentication with AsyncStorage persistence, while a Node.js/Express backend serves content, search results, and user data from MongoDB.",
        ],
      },
      {
        heading: "Development Journey",
        paragraphs: [
          "Resolved a Hermes/Babel compatibility conflict between react-native-reanimated v4 and NativeWind, which required v3 — pinned dependency versions to get both working together without breaking the styling system.",
          "Set up Firebase Authentication with AsyncStorage persistence so users stay logged in across app restarts.",
          "Built a full Search screen with debounced API calls to avoid firing a request on every keystroke, and wired Explore genre cards to pre-filled search queries for a smoother discovery flow.",
          "Added a dedicated backend search endpoint and continued iterating on navigation, state management, and performance as the app has grown.",
        ],
      },
      {
        heading: "Deployment",
        paragraphs: [
          "The Express.js backend is deployed on Render, connected to MongoDB Atlas, with a lightweight /health endpoint and a scheduled keep-alive ping to prevent cold starts on the free tier from delaying requests.",
          "The React Native frontend is built as a standalone Android APK using a local Gradle build (./gradlew assembleRelease) after EAS Build's free tier was exhausted — a production-signed build (via a locally generated release keystore) that talks directly to the deployed Render backend, published on GitHub Releases and installable on any Android device without going through Expo Go or the Play Store.",
          "Environment-aware API configuration automatically switches between a local IP in development and the live Render URL in production builds, so the same codebase works seamlessly across local testing and the distributed APK.",
        ],
      },
    ],
    demoVideo:
      "https://res.cloudinary.com/nlszpkhg/video/upload/f_auto,q_auto,w_720/v1785584997/Shrutika_eceapd.mp4",
    demoVideoPoster:
      "https://res.cloudinary.com/nlszpkhg/video/upload/f_auto,q_auto,w_720/v1785584997/Shrutika_eceapd.jpg",
  },
  {
    title: "Brew & Bliss",
    tagline: "Coffee Ordering Mobile App (Flutter)",
    period: "2026",
    status: "Completed",
    description:
      "A coffee-only ordering app I built in Flutter to take my frontend skills beyond React and React Native. Browse a curated coffee menu, save favorites, track orders and pick up rewards inside a smooth, animation-rich UI — with a focus on how it feels and performs: skeleton loaders, lazy-built tabs, a virtualized home feed and one shared data layer.",
    highlights: [
      "Five-tab app (Home, Menu, Orders, Favorites, Profile) with a custom floating bottom nav, animated drawer and an auto-sliding promo carousel whose buttons deep-link into the app",
      "Single source of truth for the coffee catalogue — Home, Menu and All Products all render from one data file, with category chips derived from the data itself",
      "Shared ChangeNotifier-based wishlist so the hearts on Home and the Favorites tab always stay in sync",
      "Performance pass: lazily built tabs, a virtualized (sliver-based) Home feed, scroll state moved to ValueNotifiers, and images decoded at display size",
      "Custom shimmer skeleton loaders (no packages), pull-to-refresh, a Blinkit-style pinned category bar on Menu and a checkout loader that blocks double submits",
      "Premium typography — Plus Jakarta Sans paired with Playfair Display italic — and haptic feedback on key interactions",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Material 3",
      "Slivers",
      "ChangeNotifier",
      "Google Fonts",
      "Custom Shimmer",
      "Skeleton Loading",
    ],
    live: null,
    github: "https://github.com/harsh9506786/Brew-Bliss",
    screenshots: [
      { src: "/screenshots/brew-bliss/01-home.webp", caption: "Home" },
      { src: "/screenshots/brew-bliss/02-menu.webp", caption: "Menu" },
      {
        src: "/screenshots/brew-bliss/03-product-detail.webp",
        caption: "Product detail",
        statusBg: "#948f7c",
      },
      {
        src: "/screenshots/brew-bliss/04-favorites.webp",
        caption: "Favorites",
      },
      { src: "/screenshots/brew-bliss/05-orders.webp", caption: "Orders" },
      {
        src: "/screenshots/brew-bliss/06-drawer.webp",
        caption: "Side drawer",
        statusBg: "#6b3218",
        statusTone: "light",
      },
    ],
    caseStudy: [
      {
        heading: "Architecture Overview",
        diagram: `main.dart ──► SplashScreen ──► MainScreen (IndexedStack, lazy tabs)
                                  │
      ┌───────────┬───────────┬───┴───────┬────────────┐
      ▼           ▼           ▼           ▼            ▼
    Home        Menu        Orders     Favorites     Profile
  (slivers)  (pinned chips) (skeleton) (shared model)

Shared layer
  data/products.dart  ──► one catalogue for Home, Menu, All Products
  WishlistModel       ──► ChangeNotifier singleton (Home ⇄ Favorites)
  widgets/            ──► Shimmer + skeletons, AppNetworkImage, ProductCard, AppDrawer`,
        paragraphs: [
          "Brew & Bliss is a Flutter app organised around a bottom-nav shell (MainScreen) that hosts five tabs in an IndexedStack. Every screen reads from the same product catalogue and the same wishlist model, so a change in one place — a heart tapped on Home, a new coffee added to the data file — shows up everywhere without duplicate code.",
        ],
      },
      {
        heading: "Performance Work",
        paragraphs: [
          "The IndexedStack originally built all five tabs on launch. I now track which tabs have been visited and build a tab only the first time it is opened, then keep it alive — lighter startup without losing scroll position or state when switching.",
          "The Home screen was a SingleChildScrollView with a Column, which built every section up-front. I rebuilt it as a CustomScrollView with a SliverList so each section is only built as it nears the viewport, wrapped in a keep-alive so inner state (like the horizontal scroll position of the Popular Coffees strip) survives.",
          "A scroll listener was calling setState on every frame and rebuilding the whole screen. I moved the scroll position into ValueNotifiers so only the header shadow and the banner parallax rebuild.",
          "A shared AppNetworkImage decodes images at the size they are actually drawn (cacheWidth from the layout width and device pixel ratio), shows a shimmer while loading, fades the image in and falls back to an icon on error.",
        ],
      },
      {
        heading: "UX Details",
        paragraphs: [
          "Skeleton loaders are built from scratch: a single ShaderMask-based shimmer driven by one animation controller per layout, with ready-made skeletons for category rows, product strips, the menu grid and order lists — plus pull-to-refresh on Home and Menu.",
          "The Menu uses a Blinkit-style scroll: the title and search bar scroll away while the category chips stay pinned under a SliverPersistentHeader, gaining a soft shadow once content slides beneath them.",
          "The promo carousel auto-advances, pauses its timer when the user swipes, and every slide's button deep-links to the right place (Menu tab, All Products, a product detail sheet or Rewards). Checkout shows an in-button loader and ignores extra taps so an order can't be submitted twice.",
        ],
      },
      {
        heading: "Challenges Solved",
        paragraphs: [
          "Drawer shortcuts silently did nothing: one navigation path opened HomeScreen directly instead of the tab shell, so the tab-switch callback was never wired. Tracing the route flow and routing everything through MainScreen fixed it.",
          "The Menu had its own hard-coded item model and prices, drifting from the rest of the app. Consolidating on the shared catalogue (and deriving categories from it) removed the duplication and the currency mismatch.",
          "Switching to a sliver-based Menu meant AnimatedSwitcher could no longer wrap the grid, so I replaced the crossfade with keyed per-item entrance animations, and capped the stagger delay so long lists never feel slow.",
        ],
      },
    ],
    note: "A learning-driven Flutter project — frontend-only with local sample data. Backend, auth and payments are the natural next step.",
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
    live: "https://bio-tech-xgye.vercel.app/",
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
