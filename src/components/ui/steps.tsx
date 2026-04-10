import React from "react";

import { cn } from "@/lib/utils";

export const Steps = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("mb-12 ml-4 border-l pl-8 [counter-reset:step]", className)}>{children}</div>
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
    <div className="absolute -left-[50px] flex h-9 w-9 items-center justify-center rounded-full bg-muted text-base font-semibold text-foreground shadow-sm before:content-[counter(step)]" />
    {title && (
      <h3 className="mt-0 text-xl font-semibold text-foreground md:text-[20px] md:leading-[1.3] md:tracking-[-0.2px]">
        {title}
      </h3>
    )}
    <div className="mt-4">{children}</div>
  </div>
);
