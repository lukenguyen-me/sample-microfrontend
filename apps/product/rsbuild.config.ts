import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "product_remote",
      exposes: {
        "./ProductList": "./src/ProductList.tsx",
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
        "@repo/shared-store": {
          singleton: true,
          requiredVersion: false,
          eager: false,
        },
      },
    }),
  ],
  output: {
    injectStyles: true,
    assetPrefix: "auto",
  },
  server: {
    port: 3001, // Ensure this doesn't clash with the Host (3000)
  },
  html: {
    template: "./src/index.html",
  },
});
