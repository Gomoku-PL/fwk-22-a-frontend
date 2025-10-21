import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import fs from "node:fs";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const sslKeyPath = process.env.VITE_DEV_SSL_KEY;
const sslCertPath = process.env.VITE_DEV_SSL_CERT;
let httpsOptions = false;
if (sslKeyPath && sslCertPath) {
  try {
    httpsOptions = {
      key: fs.readFileSync(sslKeyPath),
      cert: fs.readFileSync(sslCertPath),
    };
  } catch (e) {
    console.warn("[vite] Unable to read SSL key/cert:", e.message);
  }
}

export default defineConfig({
  plugins: [react()],
  server: {
    https: httpsOptions,
    proxy: {
      "/api": {
        target: "https://fwk-22-a-backend.onrender.com", // <<<REPLACE_THIS>>> (origin only)
        changeOrigin: true,
        // secure: false, // uncomment if you hit local TLS issues
      },
    },
  },
  base: "/fwk-22-a-frontend/", // <<<REPLACE_THIS>>> or set to '/' for custom domain
  // (Optional) If you use '@/...' imports, add an alias:
  // resolve: {
  //   alias: {
  //     '@': new URL('./src', import.meta.url).pathname
  //   }
  // }
  resolve: {
    alias: {
      path: "path-browserify",
      process: "process/browser", // 👈 lägg till detta
    },
    dedupe: ["react", "react-dom"],
  },
  define: {
    "process.env": {}, // 👈 för att förhindra undefined errors
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.js"],
        },
      },
    ],
  },
});
