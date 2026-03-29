import { Copy, Check } from "lucide-react";
import { useState } from "react";

export const CopyButton = ({ text }: { text: string }) => {
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
      className="absolute top-3 right-3 rounded-md border border-border bg-background p-1.5 text-muted-foreground opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-muted hover:text-foreground"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
};
