declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element;
  export default MDXComponent;
  export const frontmatter: any;
}

declare module "*.mdx?raw" {
  const content: string;
  export default content;
}
