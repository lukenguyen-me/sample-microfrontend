import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "main",
      remotes: {
        product_remote: "product_remote@http://localhost:3001/mf-manifest.json",
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
  server: {
    port: 3000,
  },
  html: {
    template: "./src/index.html",
  },
});
