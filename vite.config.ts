import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "source/assets",
    emptyOutDir: true,
    cssCodeSplit: false,
    target: "es2020",
    // ES module output (not IIFE) so Mermaid and KaTeX — the two heaviest
    // dependencies — can be code-split into separate chunks and lazily
    // `import()`ed only on pages that actually use a diagram or math, instead
    // of bloating every page's initial script load.
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.ts"),
      output: {
        format: "es",
        entryFileNames: "app.js",
        chunkFileNames: "chunk-[name]-[hash].js",
        assetFileNames: "app.[ext]",
      },
    },
  },
});
