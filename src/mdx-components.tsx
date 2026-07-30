import katex from "katex";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

import { Callout } from "@/components/ui/callout";
import { ComponentPreview } from "@/components/ui/component-preview";
import { Mermaid } from "@/components/ui/mermaid";
import { Step, Steps } from "@/components/ui/steps";
import { cn } from "@/lib/utils";

import { extractAlertMarker, AlertBlock } from "./components/mdx-alerts";
import { getHeadingId, HeadingAnchor } from "./components/mdx-headings";

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

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  "data-title"?: string;
  "data-show-line-number"?: string;
  "data-lang"?: string;
  "data-in-preview"?: string;
}

function CodeBlock({
  children,
  className,
  "data-title": title,
  "data-show-line-number": showLineNumber,
  "data-lang": _lang,
  "data-in-preview": inPreview,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // If we are rendering inside a ComponentPreview, bypass the custom wrappers, borders, and copy buttons
  if (inPreview === "true") {
    return (
      <pre
        className={cn("overflow-x-auto px-0 py-4 text-[13px] leading-relaxed", className)}
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
    <div className="not-typeset group relative my-6 overflow-hidden rounded-2xl border border-border bg-muted/40 dark:bg-muted/10">
      {/* Title bar */}
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-muted/10 px-4 py-2.5">
          <span className="font-sans text-xs font-medium text-muted-foreground select-none">
            {title}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex size-7 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground"
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
          className={cn(
            "overflow-x-auto px-0 py-4 text-[13px] leading-relaxed",
            showLineNumber === "true" && "show-line-numbers",
            className,
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
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-muted hover:text-foreground focus-visible:opacity-100"
            title="Copy code"
          >
            {copied ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

export const components = {
  h1: ({
    className,
    children,
    id,
    disableAnchor = true,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement> & { disableAnchor?: boolean }) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h1 id={headingId} className={className} {...props}>
        {disableAnchor ? children : <HeadingAnchor id={headingId}>{children}</HeadingAnchor>}
      </h1>
    );
  },
  h2: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h2 id={headingId} className={className} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h2>
    );
  },
  h3: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h3 id={headingId} className={className} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h3>
    );
  },
  h4: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h4 id={headingId} className={className} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h4>
    );
  },
  h5: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h5 id={headingId} className={className} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h5>
    );
  },
  h6: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const headingId = id ?? getHeadingId(children);
    return (
      <h6 id={headingId} className={className} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h6>
    );
  },
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => {
    const alertData = extractAlertMarker(children);
    if (alertData) {
      const { type, cleanedChildren } = alertData;
      return <AlertBlock type={type}>{cleanedChildren}</AlertBlock>;
    }
    return <blockquote {...props}>{children}</blockquote>;
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement> & CodeBlockProps) => {
    if (React.isValidElement(children)) {
      const childProps = children.props as any;
      if (childProps?.className?.includes("math-display")) {
        return (
          <div className="my-6 overflow-x-auto overflow-y-hidden py-4 text-center">{children}</div>
        );
      }
    }
    return <CodeBlock {...props}>{children}</CodeBlock>;
  },
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInlineMath = className?.includes("math-inline");
    const isDisplayMath = className?.includes("math-display");

    if (isInlineMath || isDisplayMath) {
      const content = typeof children === "string" ? children : "";
      try {
        const html = katex.renderToString(content, {
          displayMode: !!isDisplayMath,
          throwOnError: false,
        });
        return (
          <span
            className={isDisplayMath ? "block" : "inline-block"}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch (err) {
        console.error("KaTeX rendering error:", err);
      }
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="typeset-scroll">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  Callout,
  ComponentPreview,
  Steps,
  Step,
  Mermaid,
};
