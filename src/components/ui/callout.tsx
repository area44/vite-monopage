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
    default: <Info className="size-5" />,
    warning: <AlertTriangle className="size-5" />,
    error: <AlertCircle className="size-5" />,
    success: <CheckCircle className="size-5" />,
  };

  const styles = {
    default:
      "border-blue-700/20 bg-blue-100 text-blue-1000 dark:bg-blue-1000/10 dark:text-blue-500",
    warning:
      "border-amber-700/20 bg-amber-100 text-amber-1000 dark:bg-amber-1000/10 dark:text-amber-700",
    error: "border-red-800/20 bg-red-100 text-red-1000 dark:bg-red-1000/10 dark:text-red-800",
    success:
      "border-green-700/20 bg-green-100 text-green-1000 dark:bg-green-1000/10 dark:text-green-700",
  };

  return (
    <div
      className={cn(
        "my-6 flex items-start space-x-3 rounded-sm border p-4 shadow-sm",
        styles[type],
        className,
      )}
    >
      <div className="mt-1">{icons[type]}</div>
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  );
};
