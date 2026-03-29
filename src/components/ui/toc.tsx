import React from "react";

import { cn } from "@/lib/utils";

export const TableOfContents = ({ className }: { className?: string }) => {
  const headings = [
    { title: "Introduction", href: "#introduction" },
    { title: "Installation", href: "#installation" },
    { title: "Syntax Highlighting", href: "#syntax-highlighting" },
    { title: "Steps", href: "#steps" },
    { title: "Alerts", href: "#alerts" },
  ];

  return (
    <div className={cn("hidden text-sm xl:block", className)}>
      <div className="sticky top-20 -mt-10 h-[calc(100vh-5rem)] overflow-y-auto pt-10">
        <div className="space-y-2">
          <p className="font-medium">On This Page</p>
          <ul className="m-0 list-none">
            {headings.map((heading, i) => (
              <li key={i} className="mt-0 pt-2">
                <a
                  href={heading.href}
                  className="inline-block text-muted-foreground transition-colors hover:text-foreground"
                >
                  {heading.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
