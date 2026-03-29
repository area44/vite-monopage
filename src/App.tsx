import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { components } from "@/components/mdx-components";
import Page, { frontmatter } from "@/pages/index.mdx";
import rawContent from "@/pages/index.mdx?raw";

const ThemeToggle = () => {
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

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-muted hover:shadow-md focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default function App() {
  useEffect(() => {
    if (frontmatter?.title) {
      document.title = `${frontmatter.title} – Vite Monopage`;
    }
  }, []);

  // Enrich components with raw content for CopyMarkdown
  const enrichedComponents = {
    ...components,
    CopyMarkdown: (props: any) => <components.CopyMarkdown {...props} content={rawContent} />,
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-black/10 dark:selection:bg-white/20">
      <ThemeToggle />
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-24">
        <article className="max-w-none">
          <Page components={enrichedComponents} />
        </article>
      </main>
      <footer className="mt-12 border-t border-border py-12 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center text-sm text-muted-foreground">
          <p>
            Vite Monopage. Built with love by{" "}
            <a
              href="https://github.com/area44"
              className="font-medium text-foreground hover:underline"
            >
              @area44
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
