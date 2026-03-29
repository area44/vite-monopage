import { Copy, Check } from "lucide-react";
import { useState } from "react";

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (typeof text !== "string") return;

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not available");
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (copyErr) {
        console.error("Fallback: Failed to copy!", copyErr);
      }
      document.body.removeChild(textArea);
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
