import { defineConfig } from 'vite';

export default defineConfig({
  base: "./", // Ensures correct paths in production
  build: {
    outDir: "dist",
  }
});
