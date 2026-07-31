import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

// Helper function to extract plain text from React children recursively
function extractText(node: React.ReactNode): string {
  if (!node) return "";
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractText).join("");
  }
  if (React.isValidElement(node)) {
    const props = node.props as any;
    if (props && "children" in props) {
      return extractText(props.children);
    }
  }
  return "";
}

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  class?: string;
  className?: string;
  "data-title"?: string;
  "data-show-line-number"?: string;
  "data-lang"?: string;
  "data-in-preview"?: string;
}

export function CodeBlock({
  children,
  class: rawClass,
  className,
  "data-title": title,
  "data-show-line-number": showLineNumber,
  "data-lang": _lang,
  "data-in-preview": inPreview,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const mergedClassName = cn(rawClass, className);

  // If we are rendering inside a ComponentPreview, bypass the custom wrappers, borders, and copy buttons
  if (inPreview === "true") {
    return (
      <pre
        className={cn(
          "overflow-x-auto bg-transparent! px-0 py-3.5 font-mono text-sm leading-[24.5px]",
          mergedClassName,
        )}
        {...props}
      >
        {children}
      </pre>
    );
  }

  const handleCopy = () => {
    const rawText = extractText(children);
    navigator.clipboard
      .writeText(rawText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy code: ", err);
      });
  };

  return (
    <div className="not-typeset group relative my-6 overflow-hidden rounded-[18px] border border-border bg-[oklch(0.982_0_0)] dark:bg-[oklch(0.21_0_0)]">
      {/* Title bar */}
      {title && (
        <div className="flex items-center justify-between border-b border-border/40 bg-transparent px-4 py-2">
          <span className="font-mono text-sm font-medium text-foreground select-none">{title}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-all duration-200 hover:bg-[oklch(0.95_0_0)] hover:text-foreground dark:hover:bg-[oklch(0.25_0_0)]"
            title="Copy code"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
      )}

      {/* Code viewport wrapper */}
      <div className="relative">
        <pre
          data-title={title}
          data-show-line-number={showLineNumber}
          className={cn(
            "overflow-x-auto bg-transparent! px-0 py-3.5 font-mono text-sm leading-[24.5px]",
            showLineNumber === "true" && "show-line-numbers",
            mergedClassName,
          )}
          {...props}
        >
          {children}
        </pre>

        {/* Floating copy button if there is NO title bar */}
        {!title && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 z-10 flex size-7 items-center justify-center rounded-md border border-border bg-[oklch(0.982_0_0)] text-muted-foreground opacity-80 transition-all duration-200 hover:bg-[oklch(0.95_0_0)] hover:text-foreground hover:opacity-100 focus-visible:opacity-100 dark:bg-[oklch(0.21_0_0)] dark:hover:bg-[oklch(0.25_0_0)]"
            title="Copy code"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
