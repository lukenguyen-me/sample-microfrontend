import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "checkout_remote",
      exposes: {
        "./Checkout": "./src/Checkout.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
          eager: false,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: false,
          eager: false,
        },
      },
    }),
  ],
  output: {
    injectStyles: true,
  },
  server: {
    port: 3003, // Ensure this doesn't clash with the Host (3000)
  },
  html: {
    template: "./src/index.html",
  },
});
