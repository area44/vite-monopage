import { StrictMode } from "react";
import ReactDOMServer from "react-dom/server";

import App from "@/app/app.tsx";

export function render() {
  return ReactDOMServer.renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
