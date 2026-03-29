import { Check, FileText } from "lucide-react";
import { useState } from "react";

export const CopyMarkdown = ({ content }: { content?: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const textToCopy = content || "";
    if (typeof textToCopy !== "string" || !textToCopy) return;

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not available");
      }
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
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
