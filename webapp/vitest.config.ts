import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue"; //add this line
import { PluginOption } from "vite";

export default defineConfig({
  plugins: [vue() as any],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
  },
});
