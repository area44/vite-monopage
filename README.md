# Vite Monopage

A high-performance, beautiful documentation starter powered by the latest web technologies.

<p>
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/MDX-3.0-F9AC00?style=flat-square&logo=mdx" alt="MDX" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

---

## Features

- **Blazing Fast Performance**: Powered by **Vite 8** for near-instant hot module replacement and lightning-fast builds.
- **Modern Styling**: Built with **Tailwind CSS 4**, utilizing the new CSS-first configuration and OKLCH colors.
- **Native MDX Support**: Write documentation with the power of React components directly in your Markdown.
- **Beautiful Typography**: Featuring **Inter Variable** for body text and **Geist Mono** for technical labels and code.
- **Dark Mode**: Intelligent theme toggle with system preference detection and local storage persistence.
- **Rich Documentation Components**:
  - `Steps` & `Step`: For building beautiful ordered guides.
  - `Callout`: For highlighting important information with specific types (success, warning, error).
  - `CopyButton`: One-click copying for all code blocks.
  - **GFM Alerts**: Native support for GitHub-style alerts (`[!NOTE]`, `[!TIP]`, etc.).
- **Enhanced Images**: Automated click-to-zoom preview for all images in your documentation.
- **Type Safe**: Fully written in **TypeScript** for the best developer experience.

## Getting Started

### Prerequisites

- **Node.js**: 22 or higher
- **pnpm**: 10 or higher

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

## Customization

### Editing Content

Your main documentation content lives in `src/pages/index.mdx`. Simply edit this file to update your site. The page title and description are managed via frontmatter.

### Adding Components

You can create new React components in `src/components/ui` and register them in `src/components/mdx-components.tsx`. Once registered, they are available to use directly in your MDX files.

### Design Tokens

The visual identity (colors, fonts, radius) is defined in `src/styles/index.css` using Tailwind 4's `@theme` block.

## Project Structure

| Path              | Description                                       |
| :---------------- | :------------------------------------------------ |
| `src/app/`        | Core application logic and main `App.tsx` layout. |
| `src/pages/`      | MDX-based documentation content.                  |
| `src/components/` | Reusable UI and MDX-specific components.          |
| `src/styles/`     | Global CSS and Tailwind theme configuration.      |
| `public/`         | Static assets like logos and icons.               |

## Design Philosophy

Vite Monopage is inspired by the aesthetics of **Mintlify** and **Shadcn UI**. It prioritizes:

- **Clarity**: Generous whitespace and a clean, single-page layout.
- **Readability**: High-quality typography and subtle border-driven depth.
- **Simplicity**: A low-config, "just-works" approach to technical documentation.

## License

Distributed under the MIT License. See `LICENSE` for more information.
