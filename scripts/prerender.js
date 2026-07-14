import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve paths relative to the scripts/ folder
const distPath = path.resolve(__dirname, "../dist");
const ssrPath = path.resolve(__dirname, "../dist-ssr");

async function main() {
  const templatePath = path.join(distPath, "index.html");
  if (!fs.existsSync(templatePath)) {
    console.error("Client build index.html not found at:", templatePath);
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf-8");

  const serverEntryPath = path.join(ssrPath, "entry-server.js");
  if (!fs.existsSync(serverEntryPath)) {
    console.error("Server entry not found at:", serverEntryPath);
    process.exit(1);
  }

  // Import the render function using file:// protocol for safety
  const { render } = await import(`file://${serverEntryPath}`);

  // Render the app HTML
  const appHtml = render();

  // Inject into index.html
  // Replace <div id="root"></div> with <div id="root">${appHtml}</div>
  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  fs.writeFileSync(templatePath, html);
  console.log("Successfully pre-rendered index.html!");

  // Clean up dist-ssr
  fs.rmSync(ssrPath, { recursive: true, force: true });
}

main().catch((err) => {
  console.error("Prerendering failed:", err);
  process.exit(1);
});
