import React from "react";

import { cn } from "@/lib/utils";

export const Step = ({ children, ...props }: React.ComponentProps<"h3">) => (
  <h3 {...props}>{children}</h3>
);

export const Steps = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn("steps mb-12 ml-4 border-l pl-8 [counter-reset:step] [&>h3]:step", className)}
    {...props}
  />
);
