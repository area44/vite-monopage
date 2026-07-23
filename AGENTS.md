# AGENT GUIDE

Welcome to the **Vite Monopage** repository. This guide is intended for AI agents working on this codebase.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Content**: [MDX 3](https://mdxjs.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Linting/Formatting**: [oxlint](https://oxc.rs/docs/guide/usage/linter.html) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)

## Project Structure

```text
vite-monopage/
├── .github/                    # GitHub actions CI/CD workflows
├── public/                     # Static assets and media files
├── src/                        # Main application source code
│   ├── components/             # Custom React components
│   │   └── ui/                 # Reusable layout/UI blocks
│   ├── lib/                    # Standard utilities
│   ├── pages/                  # MDX document files
│   ├── plugins/                # Markdown processing plugins
│   ├── styles/                 # Application stylesheets
│   ├── app.tsx                 # Core page
│   ├── main.tsx                # Client-side mounting entry point
│   ├── mdx-components.tsx      # Custom React elements dictionary for MDX tags
│   ├── mdx.d.ts                # TypeScript definition module for *.mdx files
│   └── vite-env.d.ts           # Vite client type references
├── AGENTS.md                   # Onboarding guide for AI developer agents
├── README.md                   # Main project introduction
├── index.html                  # Core HTML file containing root mount element
├── package.json                # Dependencies, scripts, and package information
├── pnpm-workspace.yaml         # Workspace settings
├── tsconfig.json               # Project-wide TypeScript compiler settings
└── vite.config.ts              # Vite configurations
```

## Development Workflows

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm check`: Runs linting and formatting checks.
