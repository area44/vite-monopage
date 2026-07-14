import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

import { components } from "@/components/mdx-components";
import Page from "@/pages/index.mdx";

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      );
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Enrich components with raw content for CopyAsMarkdown
  const enrichedComponents = {
    ...components,
    CopyAsMarkdown: (props: any) => (
      <components.CopyAsMarkdown
        {...props}
        url="https://raw.githubusercontent.com/area44/vite-monopage/main/src/pages/index.mdx"
      />
    ),
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Floating Theme Toggle */}
      <div className="absolute top-4 right-4 z-50 md:top-8 md:right-8">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="flex size-9 items-center justify-center rounded-lg border border-border bg-background shadow-xs hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </button>
      </div>

      {/* Main Base Layout matching ui.shadcn.com/preview/typeset/docs */}
      <main className="mx-auto px-4 py-12 md:px-8 md:py-24">
        <div className="typeset typeset-docs mx-auto max-w-[37em]">
          <Page components={enrichedComponents} />
        </div>
      </main>
    </div>
  );
}
