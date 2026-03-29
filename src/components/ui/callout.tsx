import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
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
  const icons = {
    default: <Info className="h-4 w-4" />,
    warning: <AlertTriangle className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />,
    success: <CheckCircle2 className="h-4 w-4" />,
  };

  const styles = {
    default: "border-border bg-muted/50 text-foreground",
    warning: "border-amber-500/50 bg-amber-500/5 text-amber-900 dark:text-amber-200",
    error: "border-destructive/50 bg-destructive/5 text-destructive",
    success: "border-emerald-500/50 bg-emerald-500/5 text-emerald-900 dark:text-emerald-200",
  };

  return (
    <div
      className={cn(
        "my-6 flex items-start space-x-3 rounded-lg border p-4 shadow-sm",
        styles[type],
        className,
      )}
    >
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
};
