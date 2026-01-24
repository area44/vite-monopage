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
          <div className="container-wrapper flex flex-1 flex-col px-2">
            <div className="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full">
              <div className="h-full w-full">
                <div className="flex min-w-0 flex-1 flex-col">
                  <Page />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </body>
  );
}
