# Paylio React SDK

[![npm version](https://img.shields.io/npm/v/@paylio/react.svg)](https://www.npmjs.com/package/@paylio/react)
[![CI](https://github.com/paylio-org/paylio-react/actions/workflows/ci.yml/badge.svg)](https://github.com/paylio-org/paylio-react/actions/workflows/ci.yml)

React components for Paylio. Embed pricing grids and checkout flows into React applications with a provider and component pattern.

## Documentation

See the [Paylio API docs](https://paylio.pro/docs).

## Requirements

- React 18+

## Installation

```bash
npm install @paylio/react
```

## Usage

```tsx
import { PaylioProvider, PricingGrid } from "@paylio/react";

function App() {
  return (
    <PaylioProvider publishableKey="pk_live_xxx">
      <PricingGrid userId="user_123" />
    </PaylioProvider>
  );
}
```

### Country override

```tsx
<PricingGrid userId="user_123" country="IN" />
```

By default, the country is auto-detected from the user's IP address.

### Next.js

The SDK is SSR-safe. Use it in client components:

```tsx
"use client";

import { PaylioProvider, PricingGrid } from "@paylio/react";

export default function PricingPage() {
  return (
    <PaylioProvider publishableKey="pk_live_xxx">
      <PricingGrid userId="user_123" />
    </PaylioProvider>
  );
}
```

### Access context directly

```tsx
import { usePaylioContext } from "@paylio/react";

function MyComponent() {
  const { publishableKey } = usePaylioContext();
  // ...
}
```

## Components

### `<PaylioProvider>`

Provides Paylio configuration to child components.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `publishableKey` | `string` | Yes | Publishable API key (`pk_...`) |
| `children` | `ReactNode` | Yes | Child components |

### `<PricingGrid>`

Renders a Paylio pricing grid. Must be used within a `<PaylioProvider>`.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `userId` | `string` | Yes | — | Your external user ID |
| `country` | `string` | No | Auto-detected | ISO 3166-1 alpha-2 country code |

## Development

```bash
npm install
npm test
npm run lint
npm run build
```

## License

MIT
