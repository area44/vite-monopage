import katex from "katex";
import { Link, AlertCircle, AlertTriangle, Info, Lightbulb } from "lucide-react";
import React from "react";

import { Callout } from "@/components/ui/callout";
import { Mermaid } from "@/components/ui/mermaid";
import { Step, Steps } from "@/components/ui/steps";
import { cn } from "@/lib/utils";

function extractAlertMarker(
  children: React.ReactNode,
): { type: string; cleanedChildren: React.ReactNode } | null {
  if (!children) return null;

  let alertType: string | null = null;

  function traverse(node: React.ReactNode): React.ReactNode {
    if (alertType) return node;

    if (typeof node === "string") {
      const trimmed = node.trimStart();
      const match = trimmed.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\](?:\s*\n)?/i);
      if (match) {
        alertType = match[1].toLowerCase();
        if (alertType === "info") alertType = "note";
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

const AlertBlock = ({ children, type }: { children: React.ReactNode; type: string }) => {
  const styles: Record<
    string,
    { border: string; bg: string; title: string; text: string; icon: React.ReactNode }
  > = {
    note: {
      border: "border-l-blue-500",
      bg: "bg-blue-500/5",
      title: "Note",
      text: "text-blue-600 dark:text-blue-400",
      icon: <Info className="size-4" />,
    },
    tip: {
      border: "border-l-emerald-500",
      bg: "bg-emerald-500/5",
      title: "Tip",
      text: "text-emerald-600 dark:text-emerald-400",
      icon: <Lightbulb className="size-4" />,
    },
    important: {
      border: "border-l-purple-500",
      bg: "bg-purple-500/5",
      title: "Important",
      text: "text-purple-600 dark:text-purple-400",
      icon: <AlertCircle className="size-4" />,
    },
    warning: {
      border: "border-l-amber-500",
      bg: "bg-amber-500/5",
      title: "Warning",
      text: "text-amber-600 dark:text-amber-400",
      icon: <AlertTriangle className="size-4" />,
    },
    caution: {
      border: "border-l-red-500",
      bg: "bg-red-500/5",
      title: "Caution",
      text: "text-red-600 dark:text-red-400",
      icon: <AlertCircle className="size-4" />,
    },
  };

  const config = styles[type] || styles.note;

  return (
    <div
      className={cn(
        "not-typeset my-6 rounded-r-xl border border-l-4 border-border py-4 pr-4 pl-5 shadow-sm transition-all duration-200",
        config.border,
        config.bg,
      )}
    >
      <div
        className={cn(
          "mb-2 flex items-center gap-2 text-sm font-semibold select-none",
          config.text,
        )}
      >
        {config.icon}
        <span>{config.title}</span>
      </div>
      <div className="text-sm leading-relaxed text-foreground">{children}</div>
    </div>
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
