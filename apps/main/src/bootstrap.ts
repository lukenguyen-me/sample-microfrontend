// apps/host-shell/src/bootstrap.ts
import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

const target = document.getElementById("root");

if (target) {
  const root = createRoot(target);
  root.render(React.createElement(App));
}
