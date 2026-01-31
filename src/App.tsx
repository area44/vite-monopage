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
      <div data-slot="layout" className="bg-background relative z-10 flex min-h-svh flex-col">
        <main className="flex flex-1 flex-col">
          <div className="container-wrapper flex flex-1 flex-col px-2 py-4 lg:py-20">
            <div className="mx-auto my-0 py-0 px-4 lg:px-32">
                <Page />
            </div>
          </div>
        </main>
      </div>
    </body>
  );
}
