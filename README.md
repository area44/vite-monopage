# Vite Monopage

A high-performance, beautiful documentation starter powered by the latest web technologies.

## Features

- **Vite 8:** Extremely fast builds and dev server.
- **Tailwind CSS 4:** Modern styling with zero-runtime CSS.
- **MDX 3:** Seamlessly blend Markdown and React components.
- **Dark Mode:** Built-in theme toggle with system preference support and persistence.
- **Rich MDX Components:**
  - `Steps` & `Step`: For ordered guides.
  - `Callout`: For highlighting information.
  - `CopyButton`: One-click code copying.
  - **GFM Alerts:** Support for `[!NOTE]`, `[!TIP]`, etc.
- **Fully Responsive:** Optimized for all screen sizes.
- **TypeScript:** Type-safe development throughout.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/area44/vite-monopage.git
   cd vite-monopage
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start development server:

   ```bash
   pnpm dev
   ```

4. Build for production:
   ```bash
   pnpm build
   ```

## 📂 Project Structure

- `src/pages/index.mdx`: The main content of your site. Just edit this file!
- `src/components/mdx-components.tsx`: Custom React components used within your MDX.
- `src/App.tsx`: The main application shell and layout.
- `src/styles/index.css`: Global styles and Tailwind 4 configuration.

## Customization

### Adding Components

You can add new components to `src/components/mdx-components.tsx` and register them in the `components` object. They will then be available globally in your MDX files.

### Styling

Tailwind CSS 4 uses a new CSS-first configuration. Check `src/styles/index.css` to modify the theme, colors, and global styles.

## License

MIT License - see [LICENSE](LICENSE) for details.

Made with [Vite Monopage](https://github.com/area44/vite-monopage)
