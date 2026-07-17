import katex from "katex";
import React from "react";

import { Callout, Mermaid, Step, Steps } from "@/components/ui";
import { cn } from "@/lib/utils";

import { extractAlertMarker, AlertBlock } from "./mdx-alerts";
import { getHeadingId, HeadingAnchor } from "./mdx-headings";

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
