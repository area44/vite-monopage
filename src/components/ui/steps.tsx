import React from "react";

import { cn } from "@/lib/utils";

export const Steps = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "steps-container my-12 ml-4 border-l border-border pl-9 [counter-reset:step]",
      className,
    )}
  >
    {children}
  </div>
);

export const Step = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) => (
  <div className={cn("relative mb-12 [counter-increment:step] last:mb-0", className)}>
    <div className="absolute -left-[calc(2.25rem+1px)] flex h-8 w-8 translate-y-1 items-center justify-center rounded-full border border-border bg-muted text-[13px] font-bold text-foreground shadow-sm ring-8 ring-background before:content-[counter(step)]" />
    {title && <h3 className="mt-0 text-xl font-bold tracking-tight text-foreground">{title}</h3>}
    <div className="mt-4 text-muted-foreground">{children}</div>
  </div>
);
