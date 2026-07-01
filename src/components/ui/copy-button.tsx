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
        "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 shadow-sm backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 md:opacity-0",
        className,
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="size-3.5 text-brand" /> : <Copy className="size-3.5" />}
    </button>
  );
};
