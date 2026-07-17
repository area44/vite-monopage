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

| Path              | Description                                    |
| :---------------- | :--------------------------------------------- |
| `src/app.tsx`     | Main application shell, including page layout. |
| `src/pages/`      | MDX-based documentation content.               |
| `src/components/` | Reusable UI components.                        |
| `src/styles/`     | Global CSS and Tailwind theme configuration.   |
| `public/`         | Static assets like logos and icons.            |

## Customization

### Editing Content

Your main documentation content lives in `src/pages/index.mdx`. Simply edit this file to update your site. The page title and description are managed via frontmatter.

### Adding Components

You can create new React components in `src/components/ui` and register them in `src/mdx-components.tsx`. Once registered, they are available to use directly in your MDX files.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
