import { Check, FileText } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const CopyAsMarkdown = ({ content, url }: { content?: string; url?: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    let textToCopy = content || "";

    if (url) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          textToCopy = await response.text();
        }
      } catch (err) {
        console.error("Failed to fetch raw content from URL!", err);
      }
    }

    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
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
        "inline-flex items-center gap-2 rounded-sm border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:bg-accent hover:text-foreground active:scale-95",
      )}
    >
      {copied ? (
        <>
          <Check className="size-4 text-brand" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <FileText className="size-4" />
          <span>Copy as Markdown</span>
        </>
      )}
    </button>
  );
};
