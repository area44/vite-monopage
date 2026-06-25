import { defineHastPlugin } from "satteri";
import { createHighlighter } from "shiki";

let highlighterPromise: Promise<any> | undefined;

export const satteriShiki = defineHastPlugin({
  name: "satteri-shiki",
  element: {
    filter: ["pre"],
    async visit(node, _ctx) {
      // Find code element
      const codeNode: any = node.children.find(
        (c: any) => c.type === "element" && c.tagName === "code",
      );
      if (!codeNode) return;

      const className = codeNode.properties?.className;
      const lang = Array.isArray(className)
        ? className.find((c: string) => c.startsWith("language-"))?.replace("language-", "")
        : typeof className === "string" && className.startsWith("language-")
          ? className.replace("language-", "")
          : undefined;

      const getRawText = (children: any[]): string => {
        return children
          .map((child) => {
            if (child.type === "text") return child.value;
            if (child.children) return getRawText(child.children);
            return "";
          })
          .join("");
      };

      const code = getRawText(codeNode.children);

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
      if (lang === "mermaid" || mermaidKeywords.some((kw) => code.trim().startsWith(kw))) {
        return;
      }

      if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
          themes: ["vitesse-dark"],
          langs: [
            "typescript",
            "javascript",
            "bash",
            "json",
            "tsx",
            "jsx",
            "css",
            "html",
            "yaml",
            "mdx",
            "markdown",
          ],
        });
      }
      const highlighter = await highlighterPromise;

      const hast: any = await highlighter.codeToHast(code, {
        lang: lang || "text",
        theme: "vitesse-dark",
      });

      if (hast.type === "root" && hast.children.length > 0) {
        return hast.children[0];
      }
    },
  },
});
