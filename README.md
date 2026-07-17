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

## Customization

### Editing Content

Your main documentation content lives in `src/pages/index.mdx`. Simply edit this file to update your site. The page title and description are managed via frontmatter.

### Adding Components

You can create new React components in `src/components/ui` and register them in `src/mdx-components.tsx`. Once registered, they are available to use directly in your MDX files.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
