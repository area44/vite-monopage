# Vite Monopage

A high-performance, beautiful documentation starter powered by the latest web technologies, inspired by **Fumadocs**.

## Overview

Vite Monopage is designed for developers who want to build fast, content-heavy documentation sites with minimal effort. It leverages the power of **Vite 8**, **Tailwind CSS 4**, and **MDX 3** to provide a seamless development experience and a polished end-user interface.

## Features

- **🚀 Vite 8:** Next-generation build tool for lightning-fast development.
- **🎨 Tailwind CSS 4:** The latest evolution of utility-first CSS with a CSS-first configuration.
- **📝 MDX 3:** Write JSX in your Markdown for dynamic, interactive content.
- **🌗 Dark Mode:** Built-in theme toggle with system preference support and local storage persistence.
- **✨ Rich Components:**
  - `Steps`: Guide users through complex processes.
  - `Callout`: Highlight important notes, tips, and warnings.
  - `CopyButton`: One-click code snippet copying.
  - **GFM Alerts**: Native support for `[!NOTE]`, `[!TIP]`, and more.
- **📱 Fully Responsive:** Optimized for mobile, tablet, and desktop.
- **🛡️ TypeScript:** Fully type-safe development environment.

## Getting Started

Follow these steps to get your documentation site up and running.

### Prerequisites

Ensure you have the following installed:

- [Node.js 22+](https://nodejs.org/)
- [pnpm 10+](https://pnpm.io/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/area44/vite-monopage.git
   cd vite-monopage
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   pnpm dev
   ```

4. **Build for production:**

   ```bash
   pnpm build
   ```

## Project Structure

- `src/pages/index.mdx`: Your main content file.
- `src/components/mdx-components.tsx`: Custom components registration.
- `src/app/App.tsx`: Main application shell and layout.
- `src/styles/index.css`: Global styles and Tailwind 4 theme configuration.

## Customization

### Adding Components

Register new React components in `src/components/mdx-components.tsx` to make them available in your MDX files.

### Styling

Modify `src/styles/index.css` to customize the OKLCH color variables and global typography settings.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [@area44](https://github.com/area44)
