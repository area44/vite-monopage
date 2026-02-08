import { cn } from "@/lib/utils";
import Page, { frontmatter } from "@/pages/index.mdx";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    if (frontmatter?.title) {
      document.title = frontmatter.title;
    }
  }, []);

  return (
    <body
      className={cn(
        "group/body overscroll-none antialiased",
        "[--footer-height:calc(var(--spacing)*14)]",
        "[--header-height:calc(var(--spacing)*14)]",
        "xl:[--footer-height:calc(var(--spacing)*24)]"
      )}
    >
      <div className="relative z-10 flex min-h-svh flex-col bg-background">
        <main className="flex flex-1 justify-center">
          <div className="container-wrapper py-10 md:py-14 lg:py-20">
            <div className="mx-auto w-full max-w-3xl">
              <Page />
            </div>
          </div>
        </main>
      </div>
    </body>
  );
}
