import { ChevronDown, List } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  title: string;
  level: number;
}

export const TableOfContents = ({ variant = "default" }: { variant?: "default" | "navbar" }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"))
      .map((el) => {
        const title = (el.textContent || "").replace(/#$/, "").trim();
        return {
          id: el.id,
          title,
          level: Number.parseInt(el.tagName.replace("H", ""), 10),
        };
      })
      .filter((heading) => heading.id);
    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    for (const el of elements) {
      const element = document.getElementById(el.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className={cn("toc-container", variant === "navbar" ? "relative" : "h-full")}>
      {variant === "navbar" ? (
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-1.5 text-sm font-medium backdrop-blur-sm transition-all hover:bg-accent focus-visible:ring-brand"
            type="button"
          >
            <List className="h-4 w-4 text-brand" />
            <span className="hidden sm:inline">On This Page</span>
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
            />
          </button>
          {isOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-40 cursor-default"
                onClick={() => setIsOpen(false)}
                onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
                aria-label="Close table of contents"
              />
              <div className="absolute top-full right-0 z-50 mt-2 w-64 animate-in fade-in slide-in-from-top-2">
                <ul className="max-h-[70vh] space-y-1 overflow-y-auto rounded-xl border border-border bg-background p-3 shadow-xl">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
                      className="list-none"
                    >
                      <a
                        href={`#${heading.id}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block rounded-md px-2 py-1.5 text-[13px] transition-colors",
                          activeId === heading.id
                            ? "bg-brand/10 font-medium text-brand"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Mobile TOC */}
          <div className="sticky top-16 z-40 -mx-6 mb-8 block bg-background/80 px-6 py-2 backdrop-blur-xl lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 p-3 text-left transition-colors hover:bg-muted/50"
              type="button"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <List className="h-3.5 w-3.5 text-brand" />
                <span>On This Page</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <ul className="max-h-[60vh] space-y-1 overflow-y-auto rounded-xl border border-border bg-background p-3 shadow-sm">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
                      className="list-none"
                    >
                      <a
                        href={`#${heading.id}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "inline-block py-1 text-[13px] transition-colors",
                          activeId === heading.id
                            ? "font-medium text-brand"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Desktop TOC */}
          <div className="hidden h-full text-[13px] lg:block">
            <div className="sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-wider text-foreground/70 uppercase">
                  On This Page
                </p>
                <ul className="m-0 list-none space-y-1 border-l border-border/50">
                  {headings.map((heading) => (
                    <li
                      key={heading.id}
                      style={{ paddingLeft: `${(heading.level - 2) * 0.75}rem` }}
                      className="mt-0 pt-0"
                    >
                      <a
                        href={`#${heading.id}`}
                        className={cn(
                          "relative -left-px block border-l-2 py-1.5 pl-4 transition-colors",
                          activeId === heading.id
                            ? "border-brand font-medium text-brand"
                            : "border-transparent text-muted-foreground hover:border-border/80 hover:text-foreground",
                        )}
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
