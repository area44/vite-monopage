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
        "fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block",
        className,
      )}
    >
      <div className="h-full py-6 pr-6 lg:py-8">
        <div className="flex flex-col space-y-4">
          {sections.map((section, i) => (
            <div key={i} className="pb-4">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{section.title}</h4>
              <div className="grid grid-flow-row auto-rows-max text-sm">
                {section.items.map((item, j) => (
                  <a
                    key={j}
                    href={item.href}
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-muted-foreground hover:underline"
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
