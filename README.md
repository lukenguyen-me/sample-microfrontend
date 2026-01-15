# Sample Microfrontend

A modern microfrontend architecture demonstration using Module Federation with Rsbuild, managed as a Turborepo monorepo.

## Architecture Overview

This project demonstrates a microfrontend architecture where multiple independent React applications can be composed together at runtime using [Module Federation](https://module-federation.io/). The host application (`main`) dynamically loads remote modules from separate microfrontend applications.

### Tech Stack

- **Build Tool**: [Rsbuild](https://rsbuild.dev/) - High-performance build tool based on Rspack
- **Module Federation**: [@module-federation/enhanced](https://module-federation.io/) for runtime module sharing
- **Monorepo**: [Turborepo](https://turbo.build/) for build orchestration
- **Package Manager**: pnpm with workspace support
- **UI Framework**: React 19
- **Styling**: Tailwind CSS 4 + DaisyUI
- **Language**: TypeScript

## Project Structure

```
sample-microfrontend/
├── apps/
│   ├── main/          # Host application (Port 3000)
│   ├── product/       # Product microfrontend (Port 3001)
│   ├── cart/          # Cart microfrontend (Port 3002)
│   └── checkout/      # Checkout microfrontend (Port 3003)
└── packages/
    └── shared-theme/  # Shared Tailwind CSS + DaisyUI theme
```

### Applications

- **main** (Host): The main application that orchestrates and loads remote microfrontends
  - Port: 3000
  - Consumes: `product_remote/ProductList`, `cart_remote/Cart`, `checkout_remote/Checkout`

- **product**: Product listing and catalog microfrontend
  - Port: 3001
  - Exposes: `./ProductList` - Product catalog component with product cards

- **cart**: Shopping cart microfrontend
  - Port: 3002
  - Exposes: `./Cart` - Shopping cart component with cart items

- **checkout**: Checkout flow microfrontend
  - Port: 3003
  - Exposes: `./Checkout` - Checkout form component

### Packages

- **@repo/shared-theme**: Shared Tailwind CSS configuration and DaisyUI theme used across all microfrontends

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm 9.0.0

### Installation

```bash
pnpm install
```

### Development

Start all applications in development mode:

```bash
pnpm dev
```

This will start all microfrontends concurrently:
- Main app: http://localhost:3000
- Product: http://localhost:3001
- Cart: http://localhost:3002
- Checkout: http://localhost:3003

To run a specific application:

```bash
pnpm dev --filter=main
pnpm dev --filter=product
pnpm dev --filter=cart
pnpm dev --filter=checkout
```

### Build

Build all applications for production:

```bash
pnpm build
```

Build a specific application:

```bash
pnpm build --filter=main
```

### Type Checking

Run TypeScript type checking across all applications:

```bash
pnpm check-types
```

### Code Formatting

Format code using Prettier:

```bash
pnpm format
```

## Module Federation Configuration

Each microfrontend is configured with Module Federation in their respective `rsbuild.config.ts`:

- **Shared Dependencies**: React and React-DOM are configured as singletons to ensure only one instance is loaded
- **Remote Entry Points**: Each remote exposes components via manifest files (`mf-manifest.json`)
- **Dynamic Remotes**: The host application loads remotes dynamically at runtime

## Key Features

- Runtime composition of independent React applications
- Shared dependencies with singleton pattern
- Independent deployment capability for each microfrontend
- Shared design system via `@repo/shared-theme`
- Type-safe development with TypeScript
- Fast builds with Rsbuild/Rspack
- Monorepo orchestration with Turborepo

## Learn More

- [Module Federation Documentation](https://module-federation.io/)
- [Rsbuild Documentation](https://rsbuild.dev/)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [DaisyUI Components](https://daisyui.com/)
