import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://vora.chrom.ar",
  build: { format: "directory", inlineStylesheets: "always" },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: { prefixDefaultLocale: false },
  },
  vite: { build: { cssTarget: ["chrome87", "safari14", "edge88"] } },
});
