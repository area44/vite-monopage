# AGENT GUIDE

Welcome to the **Vite Monopage** repository. This guide is intended for AI agents working on this codebase.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Content**: [MDX 3](https://mdxjs.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Linting/Formatting**: [oxlint](https://oxlint.dev/) and [oxfmt](https://github.com/oxc-project/oxc)

## Project Structure

```text
vite-monopage/
├── public/                     # Static files and brand assets
└── src/                        # Source directory
    ├── components/             # React components
    │   ├── ui/                 # Core UI design components (Callout, Steps, Mermaid)
    │   ├── mdx-alerts.tsx      # GFM-style alerts and blockquote rendering processor
    │   ├── mdx-headings.tsx    # Heading anchor customization and ID slug generation
    │   └── theme-provider.tsx  # Theme state provider context (light/dark/system)
    ├── lib/                    # Core utility logic
    │   └── utils.ts            # Generic style merging utility function (cn)
    ├── pages/                  # MDX pages
    │   └── index.mdx           # Main page content in MDX
    ├── plugins/                # Satteri HAST processing compiler plugins
    │   ├── satteri-shiki.ts    # High-contrast Vitesse-dark syntax highlighter
    │   └── satteri-slug.ts     # Element ID slugging logic
    ├── styles/                 # Global stylesheet and typography rules
    │   ├── index.css           # Tailwind v4 styles and overrides
    │   └── typeset.css         # Typeset layout specification
    ├── app.tsx                 # Main layout, accessibility skip-links, theme controls
    ├── main.tsx                # Application entry point with hydration/mounting setup
    └── mdx-components.tsx      # Custom React elements dictionary for MDX tags
```

## Development Workflows

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm check`: Runs linting and formatting checks.
