import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  source: {
    assetsInclude: /\.svg$/,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "main",
      remotes: {
        product_remote: "product_remote@http://localhost:3001/mf-manifest.json",
        cart_remote: "cart_remote@http://localhost:3002/mf-manifest.json",
        checkout_remote:
          "checkout_remote@http://localhost:3003/mf-manifest.json",
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
  },
  server: {
    port: 3000,
  },
  html: {
    template: "./src/index.html",
  },
});
