import { Sun, Moon } from "lucide-react";
import React from "react";

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
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
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
