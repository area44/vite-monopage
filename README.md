# Vite Monopage

A high-performance, beautiful documentation starter powered by Vite, Tailwind CSS and MDX.

## Getting Started

To get started, make sure you have [Node.js](https://nodejs.org/en) and [pnpm](https://pnpm.io) installed on your system. Then, follow these steps:

```bash
git clone https://github.com/area44/vite-monopage.git
cd vite-monopage
pnpm install
pnpm dev
pnpm build
```

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

## Customization

### Editing Content

Your main documentation content lives in `src/pages/index.mdx`. Simply edit this file to update your site. The page title and description are managed via frontmatter.

### Adding Components

You can create new React components in `src/components/ui` and register them in `src/mdx-components.tsx`. Once registered, they are available to use directly in your MDX files.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
