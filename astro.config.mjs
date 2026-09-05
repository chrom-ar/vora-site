import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://chrom.ar",
  build: { format: "directory" },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: { prefixDefaultLocale: false },
  },
  vite: { build: { cssTarget: ["chrome87", "safari14", "edge88"] } },
});
