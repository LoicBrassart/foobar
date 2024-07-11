import { defineConfig } from "vite";
import { UserConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
};
export default defineConfig(config);
