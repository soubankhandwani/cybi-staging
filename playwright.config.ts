import { defineConfig } from "@playwright/test";

const externalServer = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalServer || "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results",
  workers: 1,
  timeout: 45_000,
  use: { baseURL, viewport: { width: 1440, height: 900 }, headless: true },
  webServer: externalServer ? undefined : { command: "npm run dev -- --port 3000", url: baseURL, reuseExistingServer: true },
});
