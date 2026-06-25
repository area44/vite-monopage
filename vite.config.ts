import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import GithubSlugger from "github-slugger";
import { createHighlighter } from "shiki";
import { defineConfig } from "vite";
import satteri from "vite-plugin-satteri";
import { defineHastPlugin } from "satteri";

const base = process.env.BASE || "/";

const satteriSlug = defineHastPlugin({
  name: "satteri-slug",
  element: {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    visit(node, ctx) {
      if (node.properties?.id) return;

      const getRawText = (children: any[]): string => {
        return children
          .map((child) => {
            if (child.type === "text") return child.value;
            if (child.type === "element") return getRawText(child.children);
            return "";
          })
          .join("");
      };

      const text = getRawText(node.children);
      const documentSlugger = (ctx.data.slugger as GithubSlugger) || new GithubSlugger();
      ctx.data.slugger = documentSlugger;

      const id = documentSlugger.slug(text);

      // Since satteri nodes are read-only, we must use ctx.setProperty
      // It seems returning a new node works better here.
      return {
        ...node,
        properties: {
          ...((node.properties as any) || {}),
          id,
        },
      };
    },
  },
});

let highlighterPromise: Promise<any> | undefined;

const satteriShiki = defineHastPlugin({
  name: "satteri-shiki",
  element: {
    filter: ["pre"],
    async visit(node, ctx) {
      // Find code element
      const codeNode: any = node.children.find(
        (c: any) => c.type === "element" && c.tagName === "code"
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
        "graph ", "graph\n", "flowchart ", "flowchart\n", "sequenceDiagram",
        "gantt", "classDiagram", "stateDiagram", "erDiagram", "journey",
        "pie", "quadrantChart", "mindmap", "timeline", "zenuml", "architecture"
      ];
      if (lang === "mermaid" || mermaidKeywords.some(kw => code.trim().startsWith(kw))) {
        return;
      }

      if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
          themes: ["vitesse-dark"],
          langs: ["typescript", "javascript", "bash", "json", "tsx", "jsx", "css", "html", "yaml", "mdx", "markdown"],
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

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    satteri({
      features: {
        gfm: true,
        frontmatter: true,
      },
      hastPlugins: [satteriSlug, satteriShiki],
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
