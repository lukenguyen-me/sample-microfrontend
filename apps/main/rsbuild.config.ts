import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

// Read environment variables with fallbacks for local development
const PRODUCT_REMOTE_URL = process.env.PRODUCT_REMOTE_URL || "http://localhost:3001";
const CART_REMOTE_URL = process.env.CART_REMOTE_URL || "http://localhost:3002";
const CHECKOUT_REMOTE_URL = process.env.CHECKOUT_REMOTE_URL || "http://localhost:3003";

export default defineConfig({
  source: {
    assetsInclude: /\.svg$/,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "main",
      remotes: {
        product_remote: `product_remote@${PRODUCT_REMOTE_URL}/mf-manifest.json`,
        cart_remote: `cart_remote@${CART_REMOTE_URL}/mf-manifest.json`,
        checkout_remote: `checkout_remote@${CHECKOUT_REMOTE_URL}/mf-manifest.json`,
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
    port: 3000,
  },
  html: {
    template: "./src/index.html",
  },
});
