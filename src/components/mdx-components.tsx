import katex from "katex";
import { Link } from "lucide-react";
import React from "react";

import { Callout } from "@/components/ui/callout";
import { Mermaid } from "@/components/ui/mermaid";
import { Step, Steps } from "@/components/ui/steps";
import { cn } from "@/lib/utils";

export const components = {
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
