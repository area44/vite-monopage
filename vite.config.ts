import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import satteri from "vite-plugin-satteri";

import { satteriShiki, satteriSlug } from "./src/plugins";

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
        math: true,
      },
      hastPlugins: [satteriSlug, satteriShiki],
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
