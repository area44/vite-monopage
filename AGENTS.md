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
├── .github/                    # GitHub actions CI/CD workflows
│   └── workflows/              # Workflow definitions
├── public/                     # Static assets and media files
├── src/                        # Main application source code
│   ├── components/             # Custom React components
│   │   ├── ui/                 # Reusable layout/UI blocks
│   │   │   ├── callout.tsx     # Unified, color-tinted callout boxes
│   │   │   ├── mermaid.tsx     # Safe-rendered inline Mermaid diagram compiler
│   │   │   └── steps.tsx       # Counter-incremented vertical lists
│   │   ├── mdx-alerts.tsx      # GFM blockquote parsing and marker detector
│   │   ├── mdx-headings.tsx    # Scroll-linked anchor headers and ID extraction
│   │   └── theme-provider.tsx  # Persisted light/dark/system theme controller
│   ├── lib/                    # Standard utilities
│   │   └── utils.ts            # Tailwind Classname compiler wrapper (cn)
│   ├── pages/                  # MDX document files
│   │   └── index.mdx           # Main page frontmatter and contents
│   ├── plugins/                # Satteri HTML processing plugins
│   │   ├── satteri-shiki.ts    # High-contrast Shiki vitesse-dark highlighter
│   │   └── satteri-slug.ts     # Markdown header anchor slug generator
│   ├── styles/                 # Application stylesheets
│   │   ├── index.css           # Tailwind CSS 4 setup and utility classes
│   │   └── typeset.css         # Typography-focused layout specification
│   ├── app.tsx                 # Core page wrapper, layout, and theme toggler
│   ├── main.tsx                # Client-side mounting and hydration entry point
│   ├── mdx-components.tsx      # Custom React elements dictionary for MDX tags
│   ├── mdx.d.ts                # TypeScript definition module for *.mdx files
│   └── vite-env.d.ts           # Vite client type references
├── .gitignore                  # Git untracked pattern constraints
├── .oxfmtrc.json               # oxfmt formatter configuration
├── .oxlintrc.json              # oxlint linter rules
├── AGENTS.md                   # Onboarding guide for AI developer agents
├── LICENSE                     # MIT license details
├── README.md                   # Main project introduction and setup guide
├── index.html                  # Core HTML file containing root mount element
├── package.json                # Dependencies, scripts, and package information
├── pnpm-lock.yaml              # Immutable pnpm locked package tree
├── pnpm-workspace.yaml         # Workspace monorepo settings
├── tsconfig.json               # Project-wide TypeScript compiler settings
├── vercel.json                 # Vercel static deployment specifications
└── vite.config.ts              # Vite configurations and satteri configurations
```

## Development Workflows

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm check`: Runs linting and formatting checks.
