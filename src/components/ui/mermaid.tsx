import mermaid from "mermaid";
import React, { useEffect, useId, useState } from "react";

interface MermaidProps {
  chart: string;
}

export const Mermaid = ({ chart }: MermaidProps) => {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");

  useEffect(() => {
    const renderChart = async () => {
      const isDark = document.documentElement.classList.contains("dark");

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "neutral",
        themeVariables: {
          fontFamily: "var(--font-mono)",
          primaryColor: "#18E299",
          primaryTextColor: isDark ? "#ededed" : "#0d0d0d",
          primaryBorderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          lineColor: isDark ? "#555" : "#ccc",
          secondaryColor: isDark ? "#222" : "#f4f4f4",
          tertiaryColor: isDark ? "#1a1a1a" : "#fafafa",
        },
        securityLevel: "loose",
      });

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart);
        setSvg(svg);
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

    return () => observer.disconnect();
  }, [chart, id]);

  return (
    <div
      className="mermaid my-6 flex justify-center overflow-hidden rounded-xl border border-border bg-muted/20 p-6 shadow-[rgba(0,0,0,0.03)_0px_2px_4px]"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
