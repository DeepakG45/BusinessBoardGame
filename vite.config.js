import { defineConfig } from 'vite';

export default defineConfig({
  base: "/", // Ensures assets are served from root
  build: {
    outDir: "dist",
  }
});
