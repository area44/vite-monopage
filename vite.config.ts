import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import satteri from "vite-plugin-satteri";

import { satteriShiki } from "./src/plugins/satteri-shiki";
import { satteriSlug } from "./src/plugins/satteri-slug";

const base = process.env.BASE || "/";

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    satteri({
      features: {
        gfm: true,
        frontmatter: true,
      },
      hastPlugins: [satteriSlug, satteriShiki],
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
