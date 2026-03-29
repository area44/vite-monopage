# AGENT GUIDE

Welcome to the Vite Monopage repository. This guide is intended for AI agents working on this codebase.

## Tech Stack

- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite 8](https://vitejs.dev/)
- **Content:** [MDX 3](https://mdxjs.com/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) (using the new CSS-first configuration)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Linting/Formatting:** [oxlint](https://oxlint.dev/) and [oxfmt](https://github.com/oxc-project/oxc)

## Project Structure

- `src/pages/index.mdx`: The primary entry point for documentation content. Edit this file to change the main page.
- `src/components/mdx-components.tsx`: Contains custom React components used within MDX and the logic for GFM-style alerts.
- `src/App.tsx`: The main application shell, including layout and theme toggle logic.
- `src/styles/index.css`: Global styles and Tailwind 4 configuration.
- `public/`: Static assets.

## Development Workflows

### Commands

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm preview`: Previews the production build.
- `pnpm check`: Runs linting (oxlint) and formatting (oxfmt) checks.

### Best Practices

- **MDX Components:** When adding new components for use in MDX, register them in `src/components/mdx-components.tsx`.
- **Styling:** Use Tailwind CSS 4 utility classes. Global styles or theme overrides should be placed in `src/styles/index.css`.
- **GFM Alerts:** The project supports GitHub Flavored Markdown alerts (e.g., `> [!NOTE]`). These are automatically transformed into `Callout` components.

## Deployment

The project is configured for easy deployment on [Vercel](https://vercel.com/) (see `vercel.json`).
