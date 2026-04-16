import { useEffect, useState } from "react";

import { components } from "@/components/mdx-components";
import { Navbar } from "@/components/ui/navbar";
import { TableOfContents } from "@/components/ui/toc";
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

  const [scrolled, setScrolled] = useState(false);

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (frontmatter?.title) {
      document.title = `${frontmatter.title} – Vite Monopage`;
    }
  }, []);

  // Enrich components with raw content for CopyAsMarkdown
  const enrichedComponents = {
    ...components,
    CopyAsMarkdown: (props: any) => (
      <components.CopyAsMarkdown
        {...props}
        content={rawContent}
        url="https://raw.githubusercontent.com/area44/vite-monopage/main/src/pages/index.mdx"
      />
    ),
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <Navbar theme={theme} setTheme={setTheme} scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        {/* Atmospheric Background */}
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(24,226,153,0.15)_0%,rgba(255,255,255,0)_100%)] dark:bg-[radial-gradient(50%_50%_at_50%_0%,rgba(24,226,153,0.1)_0%,rgba(13,13,13,0)_100%)]" />

        <div className="container mx-auto px-6 text-center md:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl leading-[1.1] font-semibold tracking-[-1.28px] text-foreground md:text-7xl">
              {frontmatter?.title || "Vite Monopage"}
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {frontmatter?.description ||
                "An ultra-minimalist, high-performance documentation starter for Vite and MDX."}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-center lg:gap-10 xl:gap-16">
          <aside className="hidden w-64 shrink-0 lg:block xl:w-72">
            <TableOfContents />
          </aside>

          <main className="max-w-4xl min-w-0 flex-1 pb-16 lg:pb-24">
            <article className="prose prose-zinc dark:prose-invert max-w-none">
              <Page components={enrichedComponents} />
            </article>
          </main>

          {/* Spacer for centering on LG+ */}
          <div className="hidden w-64 shrink-0 lg:block xl:w-72" aria-hidden="true" />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-center text-sm text-muted-foreground">
              Built by{" "}
              <a
                href="https://github.com/area44"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-brand"
              >
                @area44
              </a>
              . Open source under the MIT License.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
