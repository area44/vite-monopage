import katex from "katex";
import React from "react";

import { Callout } from "@/components/ui/callout";
import { CodeBlock, type CodeBlockProps } from "@/components/ui/code-block";
import { ComponentPreview } from "@/components/ui/component-preview";
import { Mermaid } from "@/components/ui/mermaid";
import { Step, Steps } from "@/components/ui/steps";
import { cn } from "@/lib/utils";

import { extractAlertMarker, AlertBlock } from "./components/mdx-alerts";
import { getHeadingId, HeadingAnchor } from "./components/mdx-headings";

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

      // Detect if this is a Mermaid diagram
      const className = childProps?.className;
      const lang = Array.isArray(className)
        ? className.find((c: string) => c.startsWith("language-"))?.replace("language-", "")
        : typeof className === "string" && className.startsWith("language-")
          ? className.replace("language-", "")
          : undefined;

      const getRawText = (node: React.ReactNode): string => {
        if (!node) return "";
        if (typeof node === "string" || typeof node === "number") {
          return String(node);
        }
        if (Array.isArray(node)) {
          return node.map(getRawText).join("");
        }
        if (React.isValidElement(node)) {
          const props = node.props as any;
          if (props && "children" in props) {
            return getRawText(props.children);
          }
        }
        return "";
      };

      const codeContent = getRawText(childProps?.children);

      const mermaidKeywords = [
        "graph ",
        "graph\n",
        "flowchart ",
        "flowchart\n",
        "sequenceDiagram",
        "gantt",
        "classDiagram",
        "stateDiagram",
        "erDiagram",
        "journey",
        "pie",
        "quadrantChart",
        "mindmap",
        "timeline",
        "zenuml",
        "architecture",
      ];

      if (lang === "mermaid" || mermaidKeywords.some((kw) => codeContent.trim().startsWith(kw))) {
        return <Mermaid chart={codeContent} />;
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
