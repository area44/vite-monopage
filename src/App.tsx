import { useEffect } from "react";

import { components } from "@/components/mdx-components";
import Page, { frontmatter } from "@/pages/index.mdx";

export default function App() {
  useEffect(() => {
    if (frontmatter?.title) {
      document.title = `${frontmatter.title} – Vercel Design Guidelines`;
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black/10 dark:selection:bg-white/20">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-6">
          <div className="flex items-center gap-2 font-bold tracking-tighter">
            <svg aria-label="Vercel Logo" fill="currentColor" viewBox="0 0 75 65" height="20">
              <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
            </svg>
            <span>Design Guidelines</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12 md:py-20">
        <article className="prose prose-vercel max-w-none">
          <Page components={components} />
        </article>
      </main>
      <footer className="border-t border-border py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Monopage. Inspired by Vercel.</p>
        </div>
      </footer>
    </div>
  );
}
