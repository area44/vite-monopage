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
        "flex size-7 items-center justify-center rounded-md text-white/20 transition-all hover:bg-white/5 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        copied && "text-brand",
        className,
      )}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
};
