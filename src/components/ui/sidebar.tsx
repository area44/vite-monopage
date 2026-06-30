import React from "react";

import { cn } from "@/lib/utils";

export const Sidebar = ({ className }: { className?: string }) => {
  const sections = [
    {
      title: "Getting Started",
      items: [
        { title: "Introduction", href: "#introduction" },
        { title: "Installation", href: "#installation" },
        { title: "Theming", href: "#theming" },
      ],
    },
    {
      title: "Documentation",
      items: [
        { title: "Features", href: "#features" },
        { title: "Components", href: "#components" },
        { title: "Styles", href: "#styles" },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "sticky top-20 z-30 hidden h-[calc(100vh-5rem)] w-full shrink-0 overflow-y-auto lg:block",
        className,
      )}
    >
      <div className="h-full py-6 pr-6 lg:py-0">
        <div className="flex flex-col gap-y-4">
          {sections.map((section) => (
            <div key={section.title} className="pb-4">
              <h4 className="mb-2 px-2 text-sm font-semibold tracking-tight text-foreground/70 uppercase">
                {section.title}
              </h4>
              <div className="grid grid-flow-row auto-rows-max gap-y-1 text-sm">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
