import { Info, AlertCircle, CheckCircle, ExternalLink, Copy, Check } from "lucide-react";
import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="absolute top-2 right-2 rounded-md border border-gray-200 bg-white p-1.5 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 hover:text-black dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-white"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </button>
  );
};

export const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-black dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b border-gray-200 pb-2 text-3xl font-semibold tracking-tight text-black transition-colors first:mt-0 dark:border-gray-800 dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-black dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-black dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "leading-7 text-gray-600 dark:text-gray-400 [&:not(:first-child)]:mt-6",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2 text-gray-600 dark:text-gray-400", className)} {...props} />
  ),
  blockquote: ({ className, children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => {
    // Check for GFM-style alerts: [!NOTE], [!TIP], [!IMPORTANT], [!WARNING], [!CAUTION]
    const childrenArray = React.Children.toArray(children);
    const firstChild = childrenArray[0];

    if (React.isValidElement(firstChild) && firstChild.props.children) {
      const text = firstChild.props.children;
      if (typeof text === "string") {
        const match = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
        if (match) {
          const type = match[1].toLowerCase();
          const cleanChildren = [
            React.cloneElement(firstChild as React.ReactElement, {
              children: text.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/, ""),
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
    }

    return (
      <blockquote
        className={cn(
          "mt-6 border-l-2 border-black pl-6 text-gray-700 italic dark:border-white dark:text-gray-300",
          className,
        )}
        {...props}
      >
        {children}
      </blockquote>
    );
  },
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn(
        "mx-auto my-8 rounded-md border border-gray-200 dark:border-gray-800",
        className,
      )}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 border-gray-200 md:my-8 dark:border-gray-800" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-800">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "m-0 border-t border-gray-200 p-0 even:bg-gray-50 dark:border-gray-800 dark:even:bg-gray-900",
        className,
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border border-gray-200 px-4 py-2 text-left font-bold dark:border-gray-800 [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border border-gray-200 px-4 py-2 text-left dark:border-gray-800 [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const codeRef = React.useRef<HTMLPreElement>(null);
    const [text, setText] = useState("");

    useEffect(() => {
      if (codeRef.current) {
        setText(codeRef.current.innerText);
      }
    }, [children]);

    return (
      <div className="group relative">
        <pre
          ref={codeRef}
          className={cn(
            "mt-6 mb-4 overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 font-mono text-sm dark:border-gray-800 dark:bg-gray-950",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
        <CopyButton text={text} />
      </div>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-black dark:bg-gray-800 dark:text-white",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "inline-flex items-center gap-1 font-medium text-black underline underline-offset-4 hover:text-gray-600 dark:text-white dark:hover:text-gray-300",
        className,
      )}
      {...props}
    >
      {props.children}
      {props.href?.startsWith("http") && <ExternalLink className="h-3 w-3" />}
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
    const icons = {
      default: Info,
      warning: AlertCircle,
      error: AlertCircle,
      success: CheckCircle,
    };
    const Icon = icons[type];

    const styles = {
      default:
        "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/30 dark:border-blue-900 dark:text-blue-200",
      warning:
        "bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-950/30 dark:border-amber-900 dark:text-amber-200",
      error:
        "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/30 dark:border-red-900 dark:text-red-200",
      success:
        "bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/30 dark:border-emerald-900 dark:text-emerald-200",
    };

    return (
      <div
        className={cn(
          "my-6 flex items-start space-x-4 rounded-lg border p-4",
          styles[type],
          className,
        )}
      >
        <Icon className="mt-1 h-5 w-5 shrink-0" />
        <div className="flex-1 text-sm leading-relaxed">{children}</div>
      </div>
    );
  },
  Steps: ({ children }: { children: React.ReactNode }) => (
    <div className="mb-12 ml-4 border-l border-gray-200 pl-8 [counter-reset:step] dark:border-gray-800">
      {children}
    </div>
  ),
  Step: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div className="relative mb-8 [counter-increment:step] before:absolute before:-left-[calc(2rem+1px)] before:flex before:h-8 before:w-8 before:items-center before:justify-center before:rounded-full before:border before:border-gray-200 before:bg-white before:text-sm before:font-bold before:text-black before:content-[counter(step)] dark:before:border-gray-800 dark:before:bg-gray-950 dark:before:text-white">
      {title && <h3 className="mt-0 text-xl font-bold tracking-tight">{title}</h3>}
      <div className="mt-3">{children}</div>
    </div>
  ),
};
