import { Sun, Moon } from "lucide-react";

import { components } from "@/components/mdx-components";
import { useTheme } from "@/components/theme-provider";
import Page, { frontmatter } from "@/pages/index.mdx";

export default function App() {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    if (theme === "system") {
      const isSystemDark =
        typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(isSystemDark ? "light" : "dark");
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-lg focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:outline-hidden"
      >
        Skip to content
      </a>

      <div className="absolute top-4 right-4 z-50 md:top-8 md:right-8">
        <button
          onClick={toggleTheme}
          className="flex size-9 items-center justify-center rounded-lg border border-border bg-background shadow-xs hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </div>

      <main id="main-content" className="mx-auto px-4 py-12 md:px-8 md:py-24">
        <div className="typeset typeset-docs mx-auto max-w-[37em]">
          <div className="mb-10 space-y-2 border-b border-border pb-6">
            <h1 className="scroll-m-20">{frontmatter.title}</h1>
            {frontmatter.description && (
              <p className="text-muted-foreground">{frontmatter.description}</p>
            )}
          </div>
          <Page components={components} />
        </div>
      </main>
    </div>
  );
}
