import { cn } from "@/lib/utils";
import Page, { frontmatter } from "@/pages/index.mdx";

export default function App() {
  if (frontmatter?.title) {
    document.title = frontmatter.title;
  }

  return (
    <body
      className={cn(
        "group/body overscroll-none antialiased [--footer-height:calc(var(--spacing)*14)] [--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]",
      )}
    >
      <div className="bg-background relative z-10 flex min-h-svh flex-col">
        <main className="flex flex-1 flex-col">
          <Page />
        </main>
      </div>
    </body>
  );
}
