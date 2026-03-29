import React, { useEffect, useState } from "react";

import { Callout } from "@/components/ui/callout";
import { CopyButton } from "@/components/ui/copy-button";
import { CopyMarkdown } from "@/components/ui/copy-markdown";
import { Step, Steps } from "@/components/ui/steps";
import { cn } from "@/lib/utils";

export const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-foreground md:text-5xl",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-12 scroll-m-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground transition-colors first:mt-0 md:text-3xl",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-foreground md:text-2xl",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-foreground md:text-xl",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 text-muted-foreground [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("my-6 ml-6 list-disc text-muted-foreground [&>li]:mt-2", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("my-6 ml-6 list-decimal text-muted-foreground [&>li]:mt-2", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => {
    const childrenArray = React.Children.toArray(children);

    let alertType: string | undefined;
    const updatedChildren = [...childrenArray];

    const extractAlert = (text: string) => {
      const match = text.match(/^\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/);
      if (match) {
        return {
          type: match[1].toLowerCase(),
          matchedLength: match[0].length,
        };
      }
      return null;
    };

    // Find the first element or string that contains the alert tag
    for (let i = 0; i < updatedChildren.length; i++) {
      const child = updatedChildren[i];

      if (typeof child === "string") {
        const result = extractAlert(child);
        if (result) {
          alertType = result.type;
          updatedChildren[i] = child.slice(result.matchedLength);
          break;
        }
        if (child.trim() !== "") break;
      } else if (React.isValidElement(child)) {
        // Handle MDX usually wrapping content in <p>
        const grandChildren = React.Children.toArray((child.props as any).children);
        for (let j = 0; j < grandChildren.length; j++) {
          const grandChild = grandChildren[j];
          if (typeof grandChild === "string") {
            const result = extractAlert(grandChild);
            if (result) {
              alertType = result.type;
              const newGrandChildren = [...grandChildren];
              newGrandChildren[j] = grandChild.slice(result.matchedLength);
              updatedChildren[i] = React.cloneElement(child as React.ReactElement, {
                ...(child.props as any),
                children: newGrandChildren,
              });
              break;
            }
            if (grandChild.trim() !== "") break;
          } else {
            break;
          }
        }
        if (alertType) break;
        // If we found an element that didn't have the alert, stop looking
        break;
      }
    }

    if (alertType) {
      const typeMap: Record<string, "default" | "success" | "warning" | "error"> = {
        note: "default",
        tip: "success",
        important: "default",
        warning: "warning",
        caution: "error",
      };

      return <Callout type={typeMap[alertType]}>{updatedChildren}</Callout>;
    }

    return (
      <blockquote
        className={cn(
          "mt-6 border-l-2 border-foreground pl-6 text-muted-foreground italic",
          className,
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  },
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="my-8 overflow-hidden rounded-lg border border-border shadow-sm">
      <img
        className={cn("w-full transition-transform hover:scale-[1.02]", className)}
        alt={alt}
        {...props}
      />
    </div>
  ),
  hr: ({ ...props }) => <hr className="my-12 border-border" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t border-border p-0 even:bg-muted/30", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border-r border-border bg-muted/50 px-4 py-2 text-left font-bold last:border-r-0 [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border-r border-border px-4 py-2 text-left text-muted-foreground last:border-r-0 [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const preRef = React.useRef<HTMLPreElement>(null);
    const [rawText, setRawText] = useState("");

    useEffect(() => {
      if (preRef.current) {
        setRawText(preRef.current.innerText);
      }
    }, [children]);

    return (
      <div className="group relative my-6">
        <pre
          ref={preRef}
          className={cn(
            "overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-sm leading-relaxed",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
        <CopyButton text={rawText} />
      </div>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted/80 px-[0.3rem] py-[0.1rem] font-mono text-[0.9em] font-medium text-foreground",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground",
        className,
      )}
      {...props}
    >
      {props.children}
    </a>
  ),
  Callout,
  Steps,
  Step,
  CopyMarkdown,
};
