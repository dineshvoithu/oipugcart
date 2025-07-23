// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // ✅ Enables `expect`, `describe`, etc.
    environment: "jsdom", // ✅ For DOM APIs like document, window
    setupFiles: "./src/setupTests.js", // ✅ Loads testing library matchers
    exclude: [...configDefaults.exclude, "e2e/**"],
  },
});
