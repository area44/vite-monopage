import GithubSlugger from "github-slugger";
import { defineHastPlugin } from "satteri";

export const satteriSlug = defineHastPlugin({
  name: "satteri-slug",
  element: {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    visit(node, ctx) {
      if ((node.properties as any)?.id) return;

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

      return {
        ...node,
        properties: {
          ...(node.properties as any),
          id,
        },
      };
    },
  },
});
