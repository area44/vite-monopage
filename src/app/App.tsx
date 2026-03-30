import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

import { components } from "@/components/mdx-components";
import Page, { frontmatter } from "@/pages/index.mdx";
// @ts-ignore - raw import for copy functionality
import rawContent from "@/pages/index.mdx?raw";

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

  useEffect(() => {
    if (frontmatter?.title) {
      document.title = `${frontmatter.title} – Vite Monopage`;
    }
  }, []);

  // Enrich components with raw content for CopyMarkdown
  const enrichedComponents = {
    ...components,
    CopyMarkdown: (props: any) => (
      <components.CopyMarkdown
        {...props}
        content={rawContent}
        url="https://raw.githubusercontent.com/area44/vite-monopage/main/src/pages/index.mdx"
      />
    ),
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300 selection:bg-black/10 dark:selection:bg-white/20">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/95 p-0 font-medium backdrop-blur transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
      <div className="container mx-auto flex-1 items-start px-4 md:px-8">
        <main className="relative py-6 lg:gap-10 lg:py-8">
          <div className="mx-auto w-full max-w-3xl min-w-0">
            <div className="pt-8 pb-12">
              <article className="prose prose-zinc dark:prose-invert max-w-none">
                <Page components={enrichedComponents} />
              </article>
            </div>
          </div>
        </main>
      </div>
      <footer className="border-t border-border py-6 md:px-8 md:py-0">
        <div className="container mx-auto flex max-w-screen-2xl flex-col items-center justify-center gap-4 md:h-24">
          <p className="text-center text-sm leading-loose text-balance text-muted-foreground">
            Built by{" "}
            <a
              href="https://github.com/area44"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              @area44
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/area44/vite-monopage"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
