import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
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
    default: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle2,
  };

  const Icon = icons[type];

  const styles = {
    default:
      "bg-blue-50/50 border-blue-200 text-blue-900 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-200",
    warning:
      "bg-amber-50/50 border-amber-200 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-200",
    error:
      "bg-red-50/50 border-red-200 text-red-900 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-200",
    success:
      "bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-200",
  };

  const iconStyles = {
    default: "text-blue-600 dark:text-blue-400",
    warning: "text-amber-600 dark:text-amber-400",
    error: "text-red-600 dark:text-red-400",
    success: "text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div
      className={cn(
        "my-6 flex items-start gap-3 rounded-lg border p-4 shadow-sm transition-all",
        styles[type],
        className,
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 translate-y-0.5", iconStyles[type])} />
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
};
