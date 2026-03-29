import React from "react";

import { cn } from "@/lib/utils";

export const Callout = ({
  children,
  type = "default",
  className,
}: {
  children: React.ReactNode;
  type?: "default" | "warning" | "error" | "success";
  className?: string;
}) => {
  const styles = {
    default:
      "bg-blue-50/40 border-blue-200 text-blue-900 dark:bg-blue-950/10 dark:border-blue-900/50 dark:text-blue-200",
    warning:
      "bg-amber-50/40 border-amber-200 text-amber-900 dark:bg-amber-950/10 dark:border-amber-900/50 dark:text-amber-200",
    error:
      "bg-red-50/40 border-red-200 text-red-900 dark:bg-red-950/10 dark:border-red-900/50 dark:text-red-200",
    success:
      "bg-emerald-50/40 border-emerald-200 text-emerald-900 dark:bg-emerald-950/10 dark:border-emerald-900/50 dark:text-emerald-200",
  };

  return (
    <div
      className={cn(
        "my-6 flex items-start space-x-4 rounded-lg border p-4 shadow-sm transition-all",
        styles[type],
        className,
      )}
    >
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
};
