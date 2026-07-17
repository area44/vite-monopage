# AGENT GUIDE

Welcome to the **Vite Monopage** repository. This guide is intended for AI agents working on this codebase.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Content**: [MDX 3](https://mdxjs.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Linting/Formatting**: [oxlint](https://oxlint.dev/) and [oxfmt](https://github.com/oxc-project/oxc)

## Project Structure

- `src/main.tsx`: Application entry point implementing dual rendering support (hydration / mounting).
- `src/app.tsx`: Main application shell, including layout, accessibility skip-links, and theme toggling.
- `src/mdx-components.tsx`: Custom components dictionary for rendering MDX tags via Tailwind, Katex, and Mermaid.
- `src/components/mdx-alerts.tsx`: Utility and blockquote processor to handle GFM-style alerts (Note, Tip, Warning, etc.).
- `src/components/mdx-headings.tsx`: Heading customization logic for recursive text extraction and hoverable anchor tags.
- `src/components/theme-provider.tsx`: Theme state management React provider supporting light, dark, and system themes.
- `src/components/ui/`: Core styling and design elements (Callout, Steps/Step, Mermaid).
- `src/plugins/`: Compiler plugins (Shiki highlighter, slug generation) run during Satteri HAST processing.
- `src/pages/index.mdx`: Main page content written in MDX.
- `src/lib/utils.ts`: Small utility file providing the class-merging function (`cn`).
- `src/styles/`: global CSS (index.css) and Typography rules (typeset.css).
- `public/`: Static files and brand assets.

## Development Workflows

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm check`: Runs linting and formatting checks.
