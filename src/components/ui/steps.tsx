import React from "react";

export const Steps = ({ children }: { children: React.ReactNode }) => (
  <div className="steps-container my-12 ml-4 border-l border-border pl-9 [counter-reset:step]">
    {children}
  </div>
);

export const Step = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <div className="relative mb-12 [counter-increment:step] last:mb-0">
    <div className="absolute -left-[calc(2.25rem+1px)] flex h-8 w-8 translate-y-1 items-center justify-center rounded-full border border-border bg-background text-[13px] font-bold text-foreground shadow-sm ring-8 ring-background before:content-[counter(step)]" />
    {title && <h3 className="mt-0 text-xl font-bold tracking-tight text-foreground">{title}</h3>}
    <div className="mt-4 text-muted-foreground">{children}</div>
  </div>
);
