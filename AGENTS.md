# AGENT GUIDE

Welcome to the **Vite Monopage** repository. This guide is intended for AI agents working on this codebase.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Content**: [MDX 3](https://mdxjs.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (using the new CSS-first configuration)
- **Language**: [TypeScript 6](https://www.typescriptlang.org/)
- **Linting/Formatting**: [oxlint](https://oxlint.dev/) and [oxfmt](https://github.com/oxc-project/oxc)
- **Icons**: [lucide-react](https://lucide.dev/) (v1.7.0)

## 📁 Project Structure

- `src/pages/index.mdx`: Primary entry point for documentation content. Edit this file to change the main page content.
- `src/components/mdx-components.tsx`: Contains custom React components used within MDX and the logic for GFM-style alerts.
- `src/app/App.tsx`: Main application shell, including layout, navigation, and theme toggle logic.
- `src/styles/index.css`: Global styles and Tailwind 4 configuration using `@theme`.
- `public/`: Static assets (logos, icons).

## 🎨 Design System (Mintlify-Inspired)

Follow these rules to maintain visual consistency:

### Colors & Typography

- **Brand Green**: `#18E299`
- **Background**: `#ffffff` (Light) / `#0d0d0d` (Dark)
- **Text**: `#0d0d0d` (Light) / `#ededed` (Dark)
- **Borders**: `rgba(0,0,0,0.05)` (Light) / `rgba(255,255,255,0.08)` (Dark)
- **Fonts**: **Inter Variable** for body/UI, **Geist Mono** for code/labels.

### UI Rules

- **Radius**: `9999px` (full pill) for buttons/inputs, `16px` for cards/containers.
- **Spacing**: Base unit is 8px.
- **Shadows**: Minimal usage. Depth is primarily border-driven.

## ⚠️ Technical Constraints & Gotchas

- **MDX Imports**: DO NOT import `rawContent` from MDX files in application code (e.g., `App.tsx`) as it triggers a `MISSING_EXPORT` error during Vite builds.
- **Code Blocks**: Always use `textContent` instead of `innerText` to extract text from code blocks in `mdx-components.tsx`.
- **Images in MDX**: Wrap `img` elements in block-level `span` tags (not `div`) to avoid hydration errors when rendered inside Markdown paragraphs.
- **Custom Brand Icons**: Use custom SVG components for brand logos (like GitHub) as `lucide-react` v1.7.0 has limitations with some brand icons.
- **MDX Page Rendering**: Pass custom components directly to the MDX page component (e.g., `<Page components={components} />`).

## 🚀 Development Workflows

### Commands

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm check`: Runs linting (oxlint) and formatting (oxfmt) checks.

### Best Practices

- **Register MDX Components**: When adding new components for use in MDX, register them in the `components` object within `src/components/mdx-components.tsx`.
- **Tailwind 4 Configuration**: Theme overrides should be placed in the `@theme` block in `src/styles/index.css`.
- **GFM Alerts**: Supports `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, and `> [!CAUTION]`. These are automatically mapped to the `Callout` component.

## 📦 Deployment

The project is configured for [Vercel](https://vercel.com/) (see `vercel.json`).
