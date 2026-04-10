import { ChevronDown, List } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  title: string;
  level: number;
}

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"))
      .map((el) => {
        // Remove trailing # from the title if it exists
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
    <nav className="toc-container">
      {/* Mobile TOC - Sticky */}
      <div className="sticky top-16 z-40 -mx-6 mb-8 block bg-background/80 px-6 py-2 backdrop-blur-xl xl:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/30 p-4 text-left transition-colors hover:bg-muted/50"
          type="button"
        >
          <div className="flex items-center gap-2 font-medium">
            <List className="h-4 w-4 text-brand" />
            <span>On This Page</span>
          </div>
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
          />
        </button>
        <div
          className={cn(
            "grid transition-all duration-200 ease-in-out",
            isOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <ul className="max-h-[60vh] space-y-2 overflow-y-auto rounded-xl border border-border bg-background p-4 shadow-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                  className="list-none"
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "inline-block py-1 text-sm transition-colors",
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
      <div className="hidden text-sm xl:block">
        <div className="sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="space-y-4">
            <p className="font-medium tracking-tight">On This Page</p>
            <ul className="m-0 list-none space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
                  className="mt-0 pt-0"
                >
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "inline-block border-l-2 py-1 pl-4 transition-colors",
                      activeId === heading.id
                        ? "border-brand font-medium text-brand"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
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
    </nav>
  );
};
