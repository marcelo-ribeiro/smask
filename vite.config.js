// vite.config.js
// import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    // emptyOutDir: false,
    // outDir: "lib",
    sourcemap: true,
    lib: {
      entry: "./src/index.ts",
      name: "smask",
      format: ["es"],
      // fileName: (format) => `smask.${format}.js`,
      fileName: "index",
    },
  },
  server: {
    port: 3030,
  },
});
