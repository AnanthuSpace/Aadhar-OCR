import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <App />
  </NextUIProvider>
);
