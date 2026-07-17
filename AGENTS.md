# AGENT GUIDE

Welcome to the **Vite Monopage** repository. This guide is intended for AI agents working on this codebase.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Content**: [MDX 3](https://mdxjs.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Linting/Formatting**: [oxlint](https://oxlint.dev/) and [oxfmt](https://github.com/oxc-project/oxc)

## Project Structure

- `src/pages/index.mdx`: Primary entry point for documentation content. Edit this file to change the main page content.
- `src/mdx-components.tsx`: Contains custom React components used within MDX and the logic for GFM-style alerts.
- `src/app.tsx`: Main application shell, including layout, navigation, and theme toggle logic.
- `src/styles/index.css`: Global styles and Tailwind 4 configuration.
- `public/`: Static assets.

## Development Workflows

- `pnpm dev`: Starts the development server.
- `pnpm build`: Builds the application for production.
- `pnpm check`: Runs linting and formatting checks.
