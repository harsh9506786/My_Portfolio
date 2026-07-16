export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["'Syne'", "sans-serif"],
        inter: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        flame: {
          300: "#ffaa70",
          400: "#ff7a30",
          500: "#ff5a00",
          600: "#ff3d00",
          700: "#ff2e00",
        },
        dark: {
          900: "#0b0b0b",
          800: "#111111",
          700: "#161616",
          600: "#1c1c1c",
          500: "#222222",
          400: "#2a2a2a",
        },
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
        widest2: "0.2em",
        widest3: "0.3em",
      },
      boxShadow: {
        flame: "0 0 30px rgba(255,90,0,0.4)",
        "flame-lg": "0 0 60px rgba(255,90,0,0.5)",
        "flame-xl": "0 0 100px rgba(255,90,0,0.6)",
        card: "0 24px 48px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
