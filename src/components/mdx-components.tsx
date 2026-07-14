import katex from "katex";
import { Link } from "lucide-react";
import React from "react";

import type { CalloutType } from "@/components/ui/callout";

import { Callout } from "@/components/ui/callout";
import { Mermaid } from "@/components/ui/mermaid";
import { Step, Steps } from "@/components/ui/steps";
import { cn } from "@/lib/utils";

function extractAlertMarker(
  children: React.ReactNode,
): { type: CalloutType; cleanedChildren: React.ReactNode } | null {
  if (!children) return null;

  let alertType: CalloutType | "none" | null = null;

  function traverse(node: React.ReactNode): React.ReactNode {
    if (alertType && alertType !== "none") return node;

    if (typeof node === "string") {
      const trimmed = node.trimStart();
      const match = trimmed.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\](?:\s*\n)?/i);
      if (match) {
        let matchedType = match[1].toLowerCase();
        if (matchedType === "info") matchedType = "note";
        alertType = matchedType as CalloutType;
        const markerIndex = node.indexOf(match[0].trim());
        const sliceIndex = markerIndex + match[0].length;
        return node.slice(sliceIndex);
      }
      if (trimmed.length > 0) {
        alertType = "none";
      }
      return node;
    }

    if (React.isValidElement(node)) {
      const elementChildren = node.props.children;
      if (elementChildren !== undefined) {
        if (Array.isArray(elementChildren)) {
          const newChildren = [...elementChildren];
          for (let i = 0; i < newChildren.length; i++) {
            const cleaned = traverse(newChildren[i]);
            if (alertType) {
              if (alertType === "none") return node;
              newChildren[i] = cleaned;
              return React.cloneElement(node, {
                ...node.props,
                children: newChildren,
              } as any);
            }
          }
        } else {
          const cleaned = traverse(elementChildren);
          if (alertType) {
            if (alertType === "none") return node;
            return React.cloneElement(node, {
              ...node.props,
              children: cleaned,
            } as any);
          }
        }
      }
    }

    return node;
  }

  if (Array.isArray(children)) {
    const newChildren = [...children];
    for (let i = 0; i < newChildren.length; i++) {
      const cleaned = traverse(newChildren[i]);
      if (alertType) {
        if (alertType === "none") return null;
        newChildren[i] = cleaned;
        return {
          type: alertType,
          cleanedChildren: newChildren,
        };
      }
    }
    return null;
  }

  const cleanedChildren = traverse(children);
  if (alertType && alertType !== "none") {
    return { type: alertType, cleanedChildren };
  }
  return null;
}

const AlertBlock = ({ children, type }: { children: React.ReactNode; type: CalloutType }) => {
  const titles: Record<CalloutType, string> = {
    default: "Info",
    note: "Note",
    tip: "Tip",
    important: "Important",
    warning: "Warning",
    caution: "Caution",
    error: "Error",
    success: "Success",
  };

  const title = titles[type] || "Note";

  return (
    <Callout type={type} title={title}>
      {children}
    </Callout>
  );
};

export const components = {
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => {
    const alertData = extractAlertMarker(children);
    if (alertData) {
      const { type, cleanedChildren } = alertData;
      return <AlertBlock type={type}>{cleanedChildren}</AlertBlock>;
    }
    return <blockquote {...props}>{children}</blockquote>;
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    if (React.isValidElement(children)) {
      const childProps = children.props as any;
      if (childProps?.className?.includes("math-display")) {
        return (
          <div className="my-6 overflow-x-auto overflow-y-hidden py-4 text-center">{children}</div>
        );
      }
    }
    return <pre {...props}>{children}</pre>;
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
  h2: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id} className={cn("group relative", className)} {...props}>
      <a
        href={`#${id}`}
        className="absolute top-1/2 -left-8 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 md:block"
        aria-label="Link to section"
      >
        <Link className="size-5 text-muted-foreground/50" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors md:hidden"
        aria-label="Link to section"
      >
        <Link className="size-4" />
      </a>
    </h2>
  ),
  h3: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={id} className={cn("group relative", className)} {...props}>
      <a
        href={`#${id}`}
        className="absolute top-1/2 -left-8 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 md:block"
        aria-label="Link to section"
      >
        <Link className="size-5 text-muted-foreground/50" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors md:hidden"
        aria-label="Link to section"
      >
        <Link className="size-4" />
      </a>
    </h3>
  ),
  h4: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 id={id} className={cn("group relative", className)} {...props}>
      <a
        href={`#${id}`}
        className="absolute top-1/2 -left-8 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 md:block"
        aria-label="Link to section"
      >
        <Link className="size-5 text-muted-foreground/50" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors md:hidden"
        aria-label="Link to section"
      >
        <Link className="size-4" />
      </a>
    </h4>
  ),
  h5: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 id={id} className={cn("group relative", className)} {...props}>
      <a
        href={`#${id}`}
        className="absolute top-1/2 -left-8 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 md:block"
        aria-label="Link to section"
      >
        <Link className="size-5 text-muted-foreground/50" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors md:hidden"
        aria-label="Link to section"
      >
        <Link className="size-4" />
      </a>
    </h5>
  ),
  h6: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 id={id} className={cn("group relative", className)} {...props}>
      <a
        href={`#${id}`}
        className="absolute top-1/2 -left-8 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 md:block"
        aria-label="Link to section"
      >
        <Link className="size-5 text-muted-foreground/50" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors md:hidden"
        aria-label="Link to section"
      >
        <Link className="size-4" />
      </a>
    </h6>
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="typeset-scroll">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  Callout,
  Steps,
  Step,
  Mermaid,
};
