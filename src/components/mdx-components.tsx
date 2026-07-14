import { Link } from "lucide-react";
import React from "react";

import { Callout } from "@/components/ui/callout";
import { CopyAsMarkdown } from "@/components/ui/copy-as-markdown";
import { Mermaid } from "@/components/ui/mermaid";
import { Step, Steps } from "@/components/ui/steps";
import { cn } from "@/lib/utils";

export const components = {
  h2: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id} className={cn("group relative", className)} {...props}>
      <a
        href={`#${id}`}
        className="absolute top-1/2 -left-8 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 md:block"
        aria-label="Link to section"
      >
        <Link className="size-5 text-muted-foreground/50 hover:text-brand" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors hover:text-brand md:hidden"
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
        <Link className="size-5 text-muted-foreground/50 hover:text-brand" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors hover:text-brand md:hidden"
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
        <Link className="size-5 text-muted-foreground/50 hover:text-brand" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors hover:text-brand md:hidden"
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
        <Link className="size-5 text-muted-foreground/50 hover:text-brand" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors hover:text-brand md:hidden"
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
        <Link className="size-5 text-muted-foreground/50 hover:text-brand" />
      </a>
      {children}
      <a
        href={`#${id}`}
        className="ml-2 inline-flex align-middle text-muted-foreground/30 transition-colors hover:text-brand md:hidden"
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
  CopyAsMarkdown,
  Steps,
  Step,
  Mermaid,
};
