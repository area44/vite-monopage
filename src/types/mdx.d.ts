declare module "*.mdx" {
  import type { ComponentType } from "react";

  export const frontmatter: {
    title?: string;
    description?: string;
  };

  const MDXComponent: ComponentType;
  export default MDXComponent;
}

declare module "*.mdx?raw" {
  const content: string;
  export default content;
}
