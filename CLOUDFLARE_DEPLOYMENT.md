# Cloudflare Pages Deployment Guide

This guide explains how to deploy the microfrontend project to Cloudflare Pages.

## Overview

Deploy 4 separate Cloudflare Pages projects pointing to the same GitHub repository:

| App | Domain | Purpose |
|-----|--------|---------|
| main | mfe.mydomain.com | Host application that orchestrates remotes |
| product | mfe-product.mydomain.com | Product catalog remote (standalone accessible) |
| cart | mfe-cart.mydomain.com | Shopping cart remote (standalone accessible) |
| checkout | mfe-checkout.mydomain.com | Checkout remote (standalone accessible) |

## Cloudflare Pages Project Configuration

### Project 1: Main App (Host)

**Build Configuration:**
- **Build command**: `pnpm install && pnpm build --filter=main`
- **Build output directory**: `apps/main/dist`
- **Root directory**: `/` (leave empty, use repository root)

**Environment Variables:**
```
PRODUCT_REMOTE_URL=https://mfe-product.mydomain.com
CART_REMOTE_URL=https://mfe-cart.mydomain.com
CHECKOUT_REMOTE_URL=https://mfe-checkout.mydomain.com
NODE_VERSION=18
```

**Custom Domain:**
- Add custom domain: `mfe.mydomain.com`

---

### Project 2: Product Remote

**Build Configuration:**
- **Build command**: `pnpm install && pnpm build --filter=product`
- **Build output directory**: `apps/product/dist`
- **Root directory**: `/` (leave empty, use repository root)

**Environment Variables:**
```
NODE_VERSION=18
```

**Custom Domain:**
- Add custom domain: `mfe-product.mydomain.com`

---

### Project 3: Cart Remote

**Build Configuration:**
- **Build command**: `pnpm install && pnpm build --filter=cart`
- **Build output directory**: `apps/cart/dist`
- **Root directory**: `/` (leave empty, use repository root)

**Environment Variables:**
```
NODE_VERSION=18
```

**Custom Domain:**
- Add custom domain: `mfe-cart.mydomain.com`

---

### Project 4: Checkout Remote

**Build Configuration:**
- **Build command**: `pnpm install && pnpm build --filter=checkout`
- **Build output directory**: `apps/checkout/dist`
- **Root directory**: `/` (leave empty, use repository root)

**Environment Variables:**
```
NODE_VERSION=18
```

**Custom Domain:**
- Add custom domain: `mfe-checkout.mydomain.com`

---

## Deployment Steps

### 1. Deploy Remote Apps First

Deploy these in any order (or all at once):
1. Product remote → `mfe-product.mydomain.com`
2. Cart remote → `mfe-cart.mydomain.com`
3. Checkout remote → `mfe-checkout.mydomain.com`

### 2. Verify Remote Apps

After deployment, verify each remote is accessible:

- Visit `https://mfe-product.mydomain.com` - should show standalone Product UI
- Visit `https://mfe-cart.mydomain.com` - should show standalone Cart UI
- Visit `https://mfe-checkout.mydomain.com` - should show standalone Checkout UI

Also verify the Module Federation manifests are accessible:
- `https://mfe-product.mydomain.com/mf-manifest.json`
- `https://mfe-cart.mydomain.com/mf-manifest.json`
- `https://mfe-checkout.mydomain.com/mf-manifest.json`

### 3. Deploy Main App

Only after all remotes are live, deploy the main app to `mfe.mydomain.com`.

**Important:** The main app needs the remote URLs set in environment variables to build correctly.

### 4. Test the Complete Application

Visit `https://mfe.mydomain.com` and verify:
- Product catalog loads correctly
- Shopping cart functionality works
- Checkout flow works
- All microfrontends communicate via shared store

---

## CORS Configuration

Each remote app includes a `_headers` file that Cloudflare Pages will use to set CORS headers:

```
/*
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, OPTIONS
  Access-Control-Allow-Headers: *
```

**Security Note:** For production, you should restrict `Access-Control-Allow-Origin` to only your main domain:

Edit each `apps/{remote}/public/_headers` file:
```
/*
  Access-Control-Allow-Origin: https://mfe.mydomain.com
  Access-Control-Allow-Methods: GET, OPTIONS
  Access-Control-Allow-Headers: *
```

---

## Local Development

For local development, the default environment variables are used (localhost URLs).

No `.env` file is needed - the configuration in `apps/main/rsbuild.config.ts` has fallback values:

```typescript
const PRODUCT_REMOTE_URL = process.env.PRODUCT_REMOTE_URL || "http://localhost:3001";
const CART_REMOTE_URL = process.env.CART_REMOTE_URL || "http://localhost:3002";
const CHECKOUT_REMOTE_URL = process.env.CHECKOUT_REMOTE_URL || "http://localhost:3003";
```

Run development mode:
```bash
pnpm dev
```

This starts all 4 apps:
- Main: http://localhost:3000
- Product: http://localhost:3001
- Cart: http://localhost:3002
- Checkout: http://localhost:3003

---

## Testing Production Build Locally

To test the production build with production URLs locally:

1. Create a `.env` file (gitignored) in the project root:
```env
PRODUCT_REMOTE_URL=https://mfe-product.mydomain.com
CART_REMOTE_URL=https://mfe-cart.mydomain.com
CHECKOUT_REMOTE_URL=https://mfe-checkout.mydomain.com
```

2. Build the main app:
```bash
pnpm build --filter=main
```

3. Preview the build:
```bash
cd apps/main
pnpm preview
```

---

## Troubleshooting

### Remote Not Loading

**Issue:** Main app shows error loading remotes.

**Solution:**
1. Verify remote apps are deployed and accessible
2. Check CORS headers in browser DevTools Network tab
3. Verify environment variables are set correctly in Cloudflare Pages
4. Check that `mf-manifest.json` is accessible at each remote URL

### CORS Errors

**Issue:** Browser console shows CORS errors when loading modules.

**Solution:**
1. Verify `_headers` file exists in each remote's `dist/` folder
2. Check Cloudflare Pages settings to ensure custom headers are enabled
3. Verify CORS headers appear in browser Network tab responses

### Build Fails on Cloudflare

**Issue:** Build command fails in Cloudflare Pages.

**Solution:**
1. Ensure `NODE_VERSION=18` is set in environment variables
2. Check build logs for specific errors
3. Verify `pnpm-lock.yaml` is committed to the repository
4. Ensure build command uses exact filter syntax: `--filter=main` (not `--filter main`)

### Standalone Remote Apps Don't Work

**Issue:** Visiting a remote URL directly shows errors.

**Solution:**
1. Verify each remote App.tsx is wrapped with `<EcommerceProvider>`
2. Check browser console for specific errors
3. Ensure `@repo/shared-store` dependency is installed

### Cache Issues

**Issue:** Changes don't appear after redeployment.

**Solution:**
1. Clear Cloudflare Pages cache in the dashboard
2. Clear browser cache or use incognito mode
3. Check that Turborepo cache is invalidated (environment variables in `turbo.json`)

---

## Files Modified for Deployment

| File | Change |
|------|--------|
| `apps/main/rsbuild.config.ts` | Added environment variable support for remote URLs |
| `turbo.json` | Added `env` array for cache invalidation |
| `apps/product/src/App.tsx` | Wrapped with `EcommerceProvider` |
| `apps/cart/src/App.tsx` | Wrapped with `EcommerceProvider` |
| `apps/checkout/src/App.tsx` | Wrapped with `EcommerceProvider` |
| `.env.example` | Created to document environment variables |
| `apps/product/public/_headers` | CORS configuration for Cloudflare Pages |
| `apps/cart/public/_headers` | CORS configuration for Cloudflare Pages |
| `apps/checkout/public/_headers` | CORS configuration for Cloudflare Pages |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│  Main App (mfe.mydomain.com)                    │
│  - Loads remotes at runtime                     │
│  - Provides EcommerceProvider context           │
└───────────┬─────────────────────────────────────┘
            │
            ├─── HTTP GET ──→ mfe-product.mydomain.com/mf-manifest.json
            │                  │
            │                  └─── Loads ProductList component
            │
            ├─── HTTP GET ──→ mfe-cart.mydomain.com/mf-manifest.json
            │                  │
            │                  └─── Loads Cart component
            │
            └─── HTTP GET ──→ mfe-checkout.mydomain.com/mf-manifest.json
                               │
                               └─── Loads Checkout component

Each remote is also accessible standalone:
- https://mfe-product.mydomain.com (shows Product UI)
- https://mfe-cart.mydomain.com (shows Cart UI)
- https://mfe-checkout.mydomain.com (shows Checkout UI)
```

---

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages Build Configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Module Federation Documentation](https://module-federation.io/)
- [Rsbuild Documentation](https://rsbuild.rs/)
