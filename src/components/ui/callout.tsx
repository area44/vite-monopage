import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";
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
    default: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
  };

  const styles = {
    default: "border-border bg-muted/50 text-foreground",
    warning: "border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-300",
    error: "border-destructive/20 bg-destructive/5 text-destructive",
    success: "border-brand/20 bg-brand/5 text-emerald-700 dark:text-emerald-300",
  };

  return (
    <div
      className={cn(
        "my-6 flex items-start space-x-3 rounded-xl border p-4 shadow-sm",
        styles[type],
        className,
      )}
    >
      <div className="mt-1">{icons[type]}</div>
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
};
