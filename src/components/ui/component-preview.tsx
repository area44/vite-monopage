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

export function ComponentPreview({
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  caption,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end";
  hideCode?: boolean;
  previewClassName?: string;
  caption?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  // Copy code handler
  const handleCopy = (codeText: string) => {
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Extract preview and code children for Direct Children Mode
  const childrenArray = React.Children.toArray(children);
  const codeElement = childrenArray.find((child) => {
    if (React.isValidElement(child)) {
      const type = child.type;
      const props = child.props as any;
      return (
        type === "pre" ||
        props?.className?.includes("language-") ||
        props?.["data-lang"] !== undefined
      );
    }
    return false;
  });

  const previewElements = childrenArray.filter((child) => child !== codeElement);

  const previewContent = previewElements.length > 0 ? previewElements : null;
  let rawCodeText = "";
  let renderedCodeElement: React.ReactNode = null;

  if (codeElement) {
    rawCodeText = extractText(codeElement).trim();
    renderedCodeElement = React.cloneElement(codeElement as React.ReactElement, {
      "data-in-preview": "true",
    });
  }

  // If there's no preview content or code, render a warning/placeholder
  if (!previewContent && !renderedCodeElement) {
    return (
      <div className="not-typeset my-6 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
        Component Preview: Please provide children inside the component preview.
      </div>
    );
  }

  const mainContent = (
    <div
      data-slot="component-preview"
      className={cn(
        "not-typeset group relative mt-4 mb-12 flex flex-col overflow-hidden rounded-2xl border border-border shadow-xs",
        className,
      )}
      {...props}
    >
      {/* Preview Section */}
      <div
        data-slot="preview"
        className={cn(
          "preview relative flex min-h-[14rem] w-full justify-center border-b border-border bg-background p-10",
          align === "center" && "items-center",
          align === "start" && "items-start",
          align === "end" && "items-end",
          previewClassName,
        )}
      >
        <div className="relative z-10">{previewContent}</div>
      </div>

      {/* Code Section */}
      {!hideCode && renderedCodeElement && (
        <div
          data-slot="code"
          className="relative flex flex-col overflow-hidden border-t border-border bg-[oklch(1_0_0)] dark:bg-[oklch(0.09_0_0)]"
        >
          {/* Action buttons (Copy) - visible by default when expanded, hidden when collapsed */}
          <div
            className={cn(
              "absolute top-3 right-3 z-20 flex items-center gap-1.5 transition-opacity duration-200",
              isExpanded ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <button
              type="button"
              onClick={() => handleCopy(rawCodeText)}
              className="flex size-7 items-center justify-center rounded-md border border-[oklch(0.922_0_0)] bg-[oklch(1_0_0)] text-[oklch(0.556_0_0)] transition-all hover:bg-[oklch(0.97_0_0)] hover:text-[oklch(0.205_0_0)] focus-visible:ring-1 focus-visible:ring-[oklch(0.708_0_0)] focus-visible:outline-hidden dark:border-[oklch(0.269_0_0)] dark:bg-[oklch(0.09_0_0)] dark:text-[oklch(0.708_0_0)] dark:hover:bg-[oklch(0.205_0_0)] dark:hover:text-[oklch(0.922_0_0)] dark:focus-visible:ring-[oklch(0.556_0_0)]"
              title="Copy code"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </button>
          </div>

          <div
            className={cn(
              "relative overflow-hidden transition-all duration-300",
              !isExpanded ? "max-h-56 pb-12" : "max-h-none pb-0",
            )}
          >
            {renderedCodeElement}

            {/* Gradient and View Code trigger when collapsed */}
            {!isExpanded && (
              <div className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-[oklch(1_0_0)] to-transparent pb-4 dark:from-[oklch(0.09_0_0)]">
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="relative z-10 inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border border-[oklch(0.922_0_0)] bg-[oklch(1_0_0)] px-3 text-xs font-medium text-[oklch(0.205_0_0)] shadow-sm transition-colors hover:bg-[oklch(0.97_0_0)] dark:border-[oklch(0.269_0_0)] dark:bg-[oklch(0.09_0_0)] dark:text-[oklch(0.922_0_0)] dark:hover:bg-[oklch(0.205_0_0)]"
                >
                  View Code
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (caption) {
    return (
      <figure className="flex flex-col gap-4">
        {mainContent}
        <figcaption className="text-center text-sm text-muted-foreground">{caption}</figcaption>
      </figure>
    );
  }

  return mainContent;
}
