// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
    exclude: [...configDefaults.exclude, "e2e/**"],
    coverage: {
      reporter: ["text", "html"], // ✅ no need to set provider manually in v3
      reportsDirectory: "coverage",
      enabled: true,
    },
  },
});
