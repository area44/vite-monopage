import { Copy, Check, FileText } from "lucide-react";
import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={copy}
      className="absolute top-3 right-3 rounded-md border border-border bg-background p-1.5 text-muted-foreground opacity-0 shadow-sm transition-all group-hover:opacity-100 hover:bg-muted hover:text-foreground"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
};

export const CopyMarkdown = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-all hover:bg-muted hover:text-foreground"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-emerald-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <FileText className="h-4 w-4" />
          <span>Copy Markdown</span>
        </>
      )}
    </button>
  );
};

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
    // Check for GFM-style alerts: [!NOTE], [!TIP], [!IMPORTANT], [!WARNING], [!CAUTION]
    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];

    if (React.isValidElement(firstChild) && firstChild.props.children) {
      const textChildren = React.Children.toArray(firstChild.props.children);
      // Find the first string child, which might be nested or have leading whitespace
      let firstText = "";
      let firstTextIndex = -1;

      for (let i = 0; i < textChildren.length; i++) {
        if (typeof textChildren[i] === "string") {
          firstText = textChildren[i] as string;
          firstTextIndex = i;
          break;
        }
      }

      const match = firstText.trim().match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
      if (match) {
        const type = match[1].toLowerCase();
        const cleanFirstText = firstText.replace(
          /\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/,
          "",
        );

        const newTextChildren = [...textChildren];
        newTextChildren[firstTextIndex] = cleanFirstText;

        const cleanChildren = [
          React.cloneElement(firstChild as React.ReactElement, {
            children: newTextChildren,
          }),
          ...childrenArray.slice(1),
        ];

        const typeMap: Record<string, "default" | "success" | "warning" | "error"> = {
          note: "default",
          tip: "success",
          important: "default",
          warning: "warning",
          caution: "error",
        };

        return <components.Callout type={typeMap[type]}>{cleanChildren}</components.Callout>;
      }
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
    <img
      className={cn("mx-auto my-8 rounded-md border border-border", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-8 border-border" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-border">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t border-border p-0 even:bg-muted/50", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border border-border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border border-border px-4 py-2 text-left text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right",
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
            "overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 font-mono text-sm",
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
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium text-foreground",
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
  Callout: ({
    children,
    type = "default",
    className,
  }: {
    children: React.ReactNode;
    type?: "default" | "warning" | "error" | "success";
    className?: string;
  }) => {
    const styles = {
      default:
        "bg-blue-50/50 border-blue-200 text-blue-900 dark:bg-blue-950/20 dark:border-blue-900 dark:text-blue-200",
      warning:
        "bg-amber-50/50 border-amber-200 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-200",
      error:
        "bg-red-50/50 border-red-200 text-red-900 dark:bg-red-950/20 dark:border-red-900 dark:text-red-200",
      success:
        "bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-900 dark:text-emerald-200",
    };

    return (
      <div
        className={cn(
          "my-6 flex items-start space-x-4 rounded-lg border p-4 shadow-sm transition-all",
          styles[type],
          className,
        )}
      >
        <div className="flex-1 text-sm leading-relaxed">{children}</div>
      </div>
    );
  },
  Steps: ({ children }: { children: React.ReactNode }) => (
    <div className="steps-container my-12 ml-4 border-l border-border pl-8 [counter-reset:step]">
      {children}
    </div>
  ),
  Step: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="relative mb-8 [counter-increment:step] last:mb-0">
      <div className="absolute -left-[calc(2rem+1px)] flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-sm font-bold text-foreground shadow-sm ring-4 ring-background transition-all before:content-[counter(step)]" />
      {title && <h3 className="mt-0 text-xl font-bold tracking-tight text-foreground">{title}</h3>}
      <div className="mt-3 text-muted-foreground">{children}</div>
    </div>
  ),
  CopyMarkdown: CopyMarkdown,
};
