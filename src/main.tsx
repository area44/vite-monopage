import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "katex/dist/katex.min.css";

import "@/styles/index.css";
import App from "@/app/app.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";

const container = document.getElementById("root")!;

const app = (
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);

if (container.firstElementChild !== null) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
