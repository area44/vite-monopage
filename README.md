# Vite Monopage

A high-performance, beautiful documentation starter powered by the latest web technologies.

<p>
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/MDX-3-F9AC00?logo=mdx" alt="MDX" />
  <img src="https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript" alt="TypeScript" />
</p>

---

## Getting Started

### Prerequisites

- **Node.js**: 24 or higher
- **pnpm**: 11 or higher

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/area44/vite-monopage.git
   cd vite-monopage
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Start development server**:

   ```bash
   pnpm dev
   ```

4. **Build for production**:
   ```bash
   pnpm build
   ```

## Project Structure

| Path              | Description                                       |
| :---------------- | :------------------------------------------------ |
| `src/app/`        | Core application logic and main `app.tsx` layout. |
| `src/pages/`      | MDX-based documentation content.                  |
| `src/components/` | Reusable UI and MDX-specific components.          |
| `src/styles/`     | Global CSS and Tailwind theme configuration.      |
| `public/`         | Static assets like logos and icons.               |

## Customization

### Editing Content

Your main documentation content lives in `src/pages/index.mdx`. Simply edit this file to update your site. The page title and description are managed via frontmatter.

### Adding Components

You can create new React components in `src/components/ui` and register them in `src/components/mdx-components.tsx`. Once registered, they are available to use directly in your MDX files.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
