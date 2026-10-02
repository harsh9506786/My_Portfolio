import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // keep heavy libraries in their own cached chunks so the main bundle
        // stays small and three.js is only fetched when the hero scene mounts
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("node_modules/framer-motion")) return "motion";
          if (
            id.includes("node_modules/react-dom") ||
            id.includes("node_modules/react/")
          )
            return "react";
        },
      },
    },
  },
});
