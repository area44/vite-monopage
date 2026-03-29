import { Sun, Moon } from "lucide-react";
import React from "react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Navbar = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2 font-bold" href="/">
            Vite Monopage
          </a>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <a className="text-foreground transition-colors hover:text-foreground/80" href="/">
              Docs
            </a>
            <a
              className="text-foreground/60 transition-colors hover:text-foreground/80"
              href="/components"
            >
              Components
            </a>
            <a
              className="text-foreground/60 transition-colors hover:text-foreground/80"
              href="/blocks"
            >
              Blocks
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <button className="relative inline-flex h-9 w-full items-center justify-start border border-input bg-background px-4 py-2 text-sm whitespace-nowrap text-muted-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-64">
              <span className="hidden lg:inline-flex">Search documentation...</span>
              <span className="inline-flex lg:hidden">Search...</span>
              <kbd className="pointer-events-none absolute top-1.5 right-1.5 hidden h-6 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>
          </div>
          <nav className="flex items-center space-x-1">
            <a href="https://github.com/area44" target="_blank" rel="noreferrer">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-md px-0 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                <GithubIcon className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </a>
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md px-0 font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
