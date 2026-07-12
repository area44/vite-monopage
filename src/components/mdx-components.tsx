import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Callout } from "@/components/ui/callout";
import { CopyAsMarkdown } from "@/components/ui/copy-as-markdown";
import { CopyButton } from "@/components/ui/copy-button";
import { Mermaid } from "@/components/ui/mermaid";
import { Step, Steps } from "@/components/ui/steps";
import { cn } from "@/lib/utils";

const MdxImage = ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEsc);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = originalOverflow || "auto";
    };
  }, [isOpen]);

  return (
    <>
      <span className="my-8 block w-full overflow-hidden rounded-2xl border border-border bg-muted/30 shadow-[rgba(0,0,0,0.03)_0px_2px_4px]">
        <button
          type="button"
          className="w-full"
          onClick={() => setIsOpen(true)}
          aria-label={alt ? `Zoom image: ${alt}` : "Zoom image"}
        >
          <img
            className={cn(
              "h-auto w-full cursor-zoom-in transition-all hover:scale-[1.01]",
              className,
            )}
            alt={alt}
            {...props}
          />
        </button>
        {alt && (
          <span className="block border-t border-border bg-muted/50 px-4 py-3 text-center text-sm text-muted-foreground">
            {alt}
          </span>
        )}
      </span>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex animate-in items-center justify-center duration-300 zoom-in-95 fade-in">
          <button
            type="button"
            className="absolute inset-0 h-full w-full bg-background/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
            aria-label="Close image preview"
          />
          <div className="relative z-[101] flex items-center justify-center p-4">
            <img
              src={props.src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
            <button
              type="button"
              className="absolute -top-4 -right-4 flex size-10 items-center justify-center rounded-full bg-muted/80 text-foreground transition-colors hover:bg-muted md:top-0 md:right-0"
              onClick={() => setIsOpen(false)}
              aria-label="Close preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const components = {
  h2: ({ className, children, id, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id} className={cn("group relative", className)} {...props}>
      <a
        href={`#${id}`}
        className="absolute top-1/2 -left-8 hidden -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 md:block"
        aria-label="Link to section"
      >
        <Link className="size-6 text-muted-foreground/50 hover:text-brand" />
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
      <blockquote className={cn("text-muted-foreground italic", className)} {...props}>
        {children}
      </blockquote>
    );
  },
  img: MdxImage,
  table: ({ className, children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="typeset-scroll rounded-xl border border-border">
      <table className={cn(className)} {...props}>
        {children}
      </table>
    </div>
  ),
  pre: ({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    // Extract raw text from children recursively to avoid FOUC and provide raw text for copying
    const getRawText = (node: React.ReactNode): string => {
      if (typeof node === "string") return node;
      if (typeof node === "number") return String(node);
      if (Array.isArray(node)) return node.map(getRawText).join("");
      if (React.isValidElement(node)) return getRawText(node.props.children);
      return "";
    };

    const rawText = getRawText(children);

    // Extract language from data-lang or className
    const lang = (props as any)["data-lang"] || className?.replace("language-", "") || "";

    // Detect mermaid
    const hasMermaidClass =
      className?.includes("language-mermaid") ||
      React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) &&
          (child.props as any).className?.includes("language-mermaid"),
      );

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
    const isMermaid =
      hasMermaidClass || mermaidKeywords.some((kw) => rawText.trim().startsWith(kw));

    if (isMermaid) {
      return <Mermaid chart={rawText.trim()} />;
    }

    return (
      <div className="group not-typeset relative my-6 overflow-hidden rounded-xl border border-white/10 bg-code-surface shadow-2xl transition-all hover:border-white/15">
        <div className="flex h-11 items-center justify-between border-b border-white/[0.05] bg-white/[0.02] px-4">
          <div className="flex items-center">
            {lang && (
              <span className="font-sans text-[12px] font-medium text-white/30 capitalize">
                {lang}
              </span>
            )}
          </div>
          <CopyButton text={rawText} />
        </div>
        <pre
          className={cn(
            "overflow-x-auto px-4 py-5 font-mono text-[13.5px] leading-[1.65]",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },
  Callout,
  Steps,
  Step,
  CopyAsMarkdown,
  Mermaid,
};
