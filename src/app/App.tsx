import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

import { components } from "@/components/mdx-components";
import Page, { frontmatter } from "@/pages/index.mdx";

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
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-transparent text-foreground transition-all hover:bg-muted focus:ring-2 focus:ring-ring focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </button>
  );
};

const Header = () => (
  <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
    <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold tracking-tight tracking-wider text-foreground uppercase">
          Vite Monopage
        </span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </div>
  </header>
);

export default function App() {
  useEffect(() => {
    if (frontmatter?.title) {
      document.title = `${frontmatter.title} – Vite Monopage`;
    }
  }, []);

  const enrichedComponents = {
    ...components,
    CopyMarkdown: (props: any) => (
      <components.CopyMarkdown
        {...props}
        url="https://raw.githubusercontent.com/area44/vite-monopage/main/src/pages/index.mdx"
      />
    ),
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />
      <main className="mx-auto max-w-[1400px] px-4 py-8 md:px-8 md:py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <article className="max-w-none">
            <Page components={enrichedComponents} />
          </article>
        </div>
      </main>
      <footer className="mt-12 border-t border-border py-12">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
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
        </div>
      </footer>
    </div>
  );
}
