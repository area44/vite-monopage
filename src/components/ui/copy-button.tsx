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
        "flex h-7 items-center gap-1.5 rounded-md px-2 text-[12px] font-medium text-white/30 transition-all hover:bg-white/5 hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        copied && "text-emerald-500",
        className,
      )}
      aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
    >
      {copied ? (
        <>
          <Check className="size-3.5" />
          <span className="font-sans">Copied</span>
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          <span className="font-sans text-white/40">Copy</span>
        </>
      )}
    </button>
  );
};
