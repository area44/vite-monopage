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
  "data-in-preview"?: string | boolean;
}

export function CodeBlock({ children, className, style, ...props }: PreProps) {
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

  const lang = props["data-lang"] || "";

  // Override Shiki's default background inline styles to perfectly support our zinc-950 theme color
  const cleanedStyle = {
    ...style,
    backgroundColor: "#09090b",
  };

  if (props["data-in-preview"] === "true" || props["data-in-preview"] === true) {
    // Render without custom layout container to avoid nested borders/margins inside the component preview
    return (
      <pre
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto !bg-transparent px-4 py-4 font-mono text-sm leading-relaxed focus:outline-hidden",
          className,
        )}
        style={{ ...style, backgroundColor: "transparent" }}
        {...props}
      >
        {children}
      </pre>
    );
  }

  return (
    <div className="not-typeset group relative my-6 overflow-hidden rounded-xl border border-zinc-200/50 bg-[#09090b] text-zinc-50 shadow-xs dark:border-zinc-800/50">
      {/* Floating actions container */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
        {lang && (
          <span className="rounded-md border border-zinc-800/50 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 uppercase">
            {lang}
          </span>
        )}
        <button
          type="button"
          onClick={handleCopy}
          className="flex size-7 cursor-pointer items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-zinc-200 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:outline-hidden"
          title="Copy code"
        >
          {copied ? <Check className="size-3.5 text-zinc-200" /> : <Copy className="size-3.5" />}
        </button>
      </div>

      <pre
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed focus:outline-hidden",
          className,
        )}
        style={cleanedStyle}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
