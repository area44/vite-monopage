import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

// Helper function to extract plain text recursively from React children
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

interface PreProps extends React.HTMLAttributes<HTMLPreElement> {
  "data-lang"?: string;
  "data-title"?: string;
  "data-show-line-numbers"?: string;
  "data-in-preview"?: string | boolean;
}

export function CodeBlock({
  children,
  className,
  style,
  "data-lang": _lang,
  "data-title": title,
  "data-show-line-numbers": showLineNumbers,
  "data-in-preview": inPreview,
  ...props
}: PreProps) {
  const [copied, setCopied] = useState(false);

  // Check if it's math display
  if (React.isValidElement(children)) {
    const childProps = children.props as any;
    if (childProps?.className?.includes("math-display")) {
      return (
        <div className="my-6 overflow-x-auto overflow-y-hidden py-4 text-center">{children}</div>
      );
    }
  }

  const rawText = extractText(children);

  const handleCopy = () => {
    if (!rawText) return;
    navigator.clipboard.writeText(rawText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Override Shiki's default background inline styles to perfectly support our zinc-950 oklch background
  const cleanedStyle = {
    ...style,
    backgroundColor: "transparent", // let the wrapper container determine the bg color
  };

  if (inPreview === "true" || inPreview === true) {
    // Render without custom layout container to avoid nested borders/margins inside the component preview
    return (
      <pre
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto !bg-transparent px-0 py-4 font-mono text-sm leading-relaxed focus:outline-hidden",
          className,
        )}
        style={{ ...style, backgroundColor: "transparent" }}
        data-show-line-numbers={showLineNumbers}
        {...props}
      >
        {children}
      </pre>
    );
  }

  return (
    <div
      className="not-typeset group relative my-4 overflow-hidden rounded-[16px] border border-[oklch(0.269_0_0)] bg-[oklch(0.09_0_0)] text-zinc-50 shadow-xs"
      data-show-line-numbers={showLineNumbers}
    >
      {/* Title bar / Header if title is present */}
      {title ? (
        <div className="flex h-10 items-center justify-between border-b border-[oklch(0.269_0_0)] bg-[oklch(0.12_0_0)] px-4">
          <span className="truncate font-mono text-xs font-medium text-zinc-400">{title}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-[oklch(0.269_0_0)] bg-[oklch(0.09_0_0)] text-zinc-400 transition-all hover:bg-[oklch(0.145_0_0)] hover:text-zinc-200 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:outline-hidden"
            title="Copy code"
          >
            {copied ? <Check className="size-3.5 text-zinc-200" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      ) : (
        /* Floating Copy button if no title is present */
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={handleCopy}
            className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-[oklch(0.269_0_0)] bg-[oklch(0.09_0_0)] text-zinc-400 transition-all hover:bg-[oklch(0.145_0_0)] hover:text-zinc-200 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:outline-hidden"
            title="Copy code"
          >
            {copied ? <Check className="size-3.5 text-zinc-200" /> : <Copy className="size-3.5" />}
          </button>
        </div>
      )}

      <pre
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto px-0 py-4 font-mono text-sm leading-relaxed focus:outline-hidden",
          className,
        )}
        style={cleanedStyle}
        data-show-line-numbers={showLineNumbers}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
