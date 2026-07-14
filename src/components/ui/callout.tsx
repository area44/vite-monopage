import { AlertCircle, CheckCircle, Info, AlertTriangle, Lightbulb } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

export type CalloutType =
  | "default"
  | "note"
  | "tip"
  | "important"
  | "warning"
  | "caution"
  | "error"
  | "success";

export const Callout = ({
  children,
  type = "default",
  title,
  className,
}: {
  children: React.ReactNode;
  type?: CalloutType;
  title?: string;
  className?: string;
}) => {
  const icons: Record<CalloutType, React.ReactNode> = {
    default: <Info className="size-5" />,
    note: <Info className="size-5" />,
    tip: <Lightbulb className="size-5" />,
    important: <AlertCircle className="size-5" />,
    warning: <AlertTriangle className="size-5" />,
    caution: <AlertCircle className="size-5" />,
    error: <AlertCircle className="size-5" />,
    success: <CheckCircle className="size-5" />,
  };

  const styles: Record<CalloutType, string> = {
    default: "border-border bg-muted/50 text-foreground",
    note: "border-blue-500/20 bg-blue-500/5 text-blue-700 dark:text-blue-300",
    tip: "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
    important: "border-purple-500/20 bg-purple-500/5 text-purple-700 dark:text-purple-300",
    warning: "border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-300",
    caution: "border-red-500/20 bg-red-500/5 text-red-700 dark:text-red-300",
    error: "border-destructive/20 bg-destructive/5 text-destructive",
    success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300",
  };

  return (
    <div
      className={cn(
        "not-typeset my-6 flex items-start gap-3 rounded-xl border p-4 shadow-sm",
        styles[type],
        className,
      )}
    >
      <div className="mt-1 flex-shrink-0">{icons[type]}</div>
      <div className="flex-1 text-sm leading-relaxed">
        {title && <div className="mb-1 font-semibold select-none">{title}</div>}
        <div className={cn(title ? "text-foreground/90 dark:text-foreground/80" : "")}>
          {children}
        </div>
      </div>
    </div>
  );
};
