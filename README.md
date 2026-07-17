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

## Customization

### Editing Content

Your main documentation content lives in `src/pages/index.mdx`. Simply edit this file to update your site. The page title and description are managed via frontmatter.

### Adding Components

You can create new React components in `src/components/ui` and register them in `src/mdx-components.tsx`. Once registered, they are available to use directly in your MDX files.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
