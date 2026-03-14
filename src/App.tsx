import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

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
      className="rounded-md border border-border p-2 transition-colors hover:bg-muted"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
};

const ViteLogo = () => (
  <svg viewBox="0 0 410 404" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="a">
        <stop stopColor="#41D1FF" offset="0%" />
        <stop stopColor="#BD34FE" offset="100%" />
      </linearGradient>
      <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="b">
        <stop stopColor="#FFEA83" offset="8.33%" />
        <stop stopColor="#FFDD35" offset="50%" />
        <stop stopColor="#FFA800" offset="71.35%" />
      </linearGradient>
    </defs>
    <path d="M407.82 58.44L209.73 401.49 13.66 58.44l191.01-44.49 203.15 44.49z" fill="url(#a)" />
    <path d="M346.47 58.44L209.73 294.97 75.47 58.44l131.79-30.7 139.21 30.7z" fill="url(#b)" />
    <path
      d="M221.07 101.4l11.45 28.52h37.4l-49.33 76.8 28.6 11.23-95.2 121.72 23.33-108.82-31.5-12.23 72.84-117.22h-36.25l-10.74-28.52h47.4z"
      fill="#fff"
    />
  </svg>
);

export default function App() {
  useEffect(() => {
    if (frontmatter?.title) {
      document.title = `${frontmatter.title} – Vite 8 + MDX`;
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 selection:bg-black/10 dark:selection:bg-white/20">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2 font-bold tracking-tighter">
            <ViteLogo />
            <span>Vite 8 + MDX</span>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12 md:py-20">
        <article className="prose prose-vercel max-w-none">
          <Page components={components} />
        </article>
      </main>
      <footer className="border-t border-border py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Monopage. Built with Vite 8 & Tailwind 4.</p>
        </div>
      </footer>
    </div>
  );
}
