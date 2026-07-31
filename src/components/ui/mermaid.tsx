import mermaid from "mermaid";
import React, { useCallback, useEffect, useId, useState } from "react";

interface MermaidProps {
  chart: string;
}

export const Mermaid = ({ chart }: MermaidProps) => {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let active = true;

    const renderChart = async () => {
      const isDark = document.documentElement.classList.contains("dark");

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "neutral",
        themeVariables: {
          fontFamily: "var(--font-mono)",
          primaryTextColor: isDark ? "#ededed" : "#0d0d0d",
          primaryBorderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          lineColor: isDark ? "#555" : "#ccc",
          secondaryColor: isDark ? "#222" : "#f4f4f4",
          tertiaryColor: isDark ? "#1a1a1a" : "#fafafa",
        },
        securityLevel: "loose",
      });

      try {
        const renderId = `mermaid-${id}-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(renderId, chart);
        if (active) {
          setSvg(renderedSvg);
        }
      } catch (error) {
        console.error("Mermaid rendering failed:", error);
      }
    };

    renderChart();

    const observer = new MutationObserver(() => {
      renderChart();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [chart, id]);

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.innerHTML = svg;
    }
  }, [svg]);

  return (
    <div
      ref={setContainerRef}
      className="mermaid not-typeset my-6 flex justify-center overflow-hidden rounded-xl border border-border bg-muted/20 p-6 shadow-[rgba(0,0,0,0.03)_0px_2px_4px]"
    />
  );
};
