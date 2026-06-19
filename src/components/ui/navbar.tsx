import { Sun, Moon } from "lucide-react";
import React from "react";

import { TableOfContents } from "@/components/ui/toc";
import { cn } from "@/lib/utils";

export const Navbar = ({
  theme,
  setTheme,
  scrolled,
}: {
  theme: string;
  setTheme: (theme: string) => void;
  scrolled: boolean;
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-6 md:px-8">
        <a
          href="/"
          className="flex items-center gap-x-2 text-base font-bold tracking-tight text-foreground"
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
            className="inline-flex size-8 items-center justify-center rounded-sm border border-border bg-background transition-all hover:bg-accent focus-visible:ring-brand focus-visible:outline-none"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </header>
  );
};
