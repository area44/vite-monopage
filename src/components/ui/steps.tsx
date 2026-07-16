import React from "react";

import { cn } from "@/lib/utils";

export const Steps = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8 [&>h3]:step",
      className
    )}
    {...props}
  />
);

export const Step = ({
  children,
  title,
  className,
  ...props
}: React.ComponentProps<"h3"> & { title?: string }) => {
  if (title) {
    return (
      <div className="relative mb-12 last:mb-0">
        <h3
          className={cn(
            "step mt-0 text-xl font-semibold text-foreground md:text-[20px] md:leading-[1.3] md:tracking-[-0.2px]",
            className
          )}
          {...props}
        >
          {title}
        </h3>
        <div className="mt-4">{children}</div>
      </div>
    );
  }
  return (
    <h3 className={cn("step", className)} {...props}>
      {children}
    </h3>
  );
};
