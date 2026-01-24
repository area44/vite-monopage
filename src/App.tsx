import Page, { frontmatter } from "@/pages/index.mdx";

export default function App() {
  if (frontmatter?.title) {
    document.title = frontmatter.title;
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-8">
      <Page />
    </main>
  );
}
