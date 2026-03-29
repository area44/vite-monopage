import { Check, FileText } from "lucide-react";
import { useState } from "react";

export const CopyMarkdown = ({ content, url }: { content?: string; url?: string }) => {
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
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:bg-muted hover:text-foreground active:scale-95"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <FileText className="h-4 w-4" />
          <span>Copy Markdown</span>
        </>
      )}
    </button>
  );
};
