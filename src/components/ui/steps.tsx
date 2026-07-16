import React from "react";

import { cn } from "@/lib/utils";

export const Steps = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "mb-12 ml-4 border-l pl-8 [counter-reset:step] [&>h3]:relative [&>h3]:[counter-increment:step] [&>h3]:before:absolute [&>h3]:before:-top-[4px] [&>h3]:before:-left-[50px] [&>h3]:before:inline-flex [&>h3]:before:size-9 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:border-4 [&>h3]:before:border-background [&>h3]:before:bg-muted [&>h3]:before:text-center [&>h3]:before:font-mono [&>h3]:before:text-base [&>h3]:before:font-semibold [&>h3]:before:content-[counter(step)]",
      className,
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
            "relative mt-0 text-xl font-semibold text-foreground [counter-increment:step] before:absolute before:-top-[4px] before:-left-[50px] before:inline-flex before:size-9 before:items-center before:justify-center before:rounded-full before:border-4 before:border-background before:bg-muted before:text-center before:font-mono before:text-base before:font-semibold before:content-[counter(step)] md:text-[20px] md:leading-[1.3] md:tracking-[-0.2px]",
            className,
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
    <h3
      className={cn(
        "relative [counter-increment:step] before:absolute before:-top-[4px] before:-left-[50px] before:inline-flex before:size-9 before:items-center before:justify-center before:rounded-full before:border-4 before:border-background before:bg-muted before:text-center before:font-mono before:text-base before:font-semibold before:content-[counter(step)]",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};
