import { Sun, Moon } from "lucide-react";
import React from "react";

import { TableOfContents } from "@/components/ui/toc";
import { cn } from "@/lib/utils";

export const Navbar = ({
  theme,
  setTheme,
  scrolled,
  scrollProgress,
}: {
  theme: string;
  setTheme: (theme: string) => void;
  scrolled: boolean;
  scrollProgress: number;
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled ? "border-b border-border/50 bg-background/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-8">
        <a
          href="/"
          className="flex items-center gap-x-2 text-xl font-bold tracking-tight text-foreground"
        >
          Vite Monopage
        </a>
        <div className="flex items-center gap-x-4">
          {scrolled && (
            <div className="animate-in duration-300 fade-in slide-in-from-right-4 lg:hidden">
              <TableOfContents variant="navbar" />
            </div>
          )}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="focus-visible:ring-brand inline-flex size-9 items-center justify-center rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:bg-accent focus-visible:outline-none"
          >
            {theme === "light" ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
      {/* Scroll Progress Bar */}
      <div
        className="bg-brand absolute bottom-0 left-0 h-[2px] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
        aria-label="Reading progress"
      />
    </header>
  );
};
