import { createRoot } from "react-dom/client";
import './index.css'
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <NextUIProvider>
      <App />
    </NextUIProvider>
  );
} else {
  console.error("Root element not found");
}
