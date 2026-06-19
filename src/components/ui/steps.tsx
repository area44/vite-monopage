import React from "react";

import { cn } from "@/lib/utils";

export const Steps = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("mb-12 ml-4 border-l border-border pl-8 [counter-reset:step]", className)}>
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
    <div className="bg-background-100 absolute -left-[50px] flex size-9 items-center justify-center rounded-full border border-border text-base font-semibold text-foreground shadow-sm before:content-[counter(step)]" />
    {title && (
      <h3 className="mt-0 text-[20px] leading-[1.3] font-semibold tracking-[-0.2px] text-foreground">
        {title}
      </h3>
    )}
    <div className="mt-4 text-base leading-[24px] text-muted-foreground">{children}</div>
  </div>
);
