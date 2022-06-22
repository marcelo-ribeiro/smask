const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/main.ts"),
      name: "smask",
      format: "es",
      fileName: (format) => `smask.${format}.js`,
    },
  },
});
