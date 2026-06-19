import { Copy, Check } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const CopyButton = ({ text, className }: { text: string; className?: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={copy}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="size-4 text-brand" /> : <Copy className="size-4" />}
    </button>
  );
};
