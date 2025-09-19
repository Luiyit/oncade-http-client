# Oncade HTTP Client

A modern TypeScript HTTP client for the Oncade platform, providing type-safe access to game commerce APIs including products, purchases, user management, and wallet operations.

## Features

- 🚀 **TypeScript First** - Full TypeScript support with comprehensive type definitions
- 🛡️ **Type Safe** - Strongly typed request/response interfaces
- 📦 **Multiple Formats** - ES modules and CommonJS support
- 🔧 **Environment Based** - Configuration through environment variables
- 📚 **Well Documented** - Clear API documentation and examples

## TODOs
[ ] 🧪 **Testes** - Add test using jest

## Installation

```bash
npm install oncade-http-client
# or
yarn add oncade-http-client
```

## Quick Start

```typescript
import { OncadeClient } from 'oncade-http-client';

// Initialize the client
const client = new OncadeClient({
  apiKey: 'your-api-key',
  gameId: 'your-game-id',
});

// Example: Create a product
const product = await client.store.createProduct({
  name: 'Premium Game Pass',
  type: 'purchase',
  fulfillmentType: 'WEBHOOK',
  description: 'Unlock premium features',
  price: 999,
  category: 'game-pass'
});

console.log('Created product:', product.name);
```

## Configuration

The client is configured using environment variables:

```bash
ONCADE_SDK_API_KEY=your-api-key
ONCADE_GAME_ID=your-game-id
```

## API Reference

### Authentication API

```typescript
// Initiate account linking
const linkResult = await client.auth.initiateAccountLink({
  email: 'user@example.com'
});
```

### Store API

#### Products

```typescript
// List all products
const products = await client.store.listProducts({
  category: 'games'
});

// Create a regular product
const product = await client.store.createProduct({
  name: 'Game Item',
  type: 'purchase',
  fulfillmentType: 'WEBHOOK',
  description: 'Item description',
  price: 4.99,
  category: 'items'
});

// Create a UGC (User Generated Content) product
const ugcProduct = await client.store.createUGCProduct('user-ref', {
  name: 'Custom Content',
  type: 'purchase',
  fulfillmentType: 'WEBHOOK',
  description: 'User created content',
  price: 299,
  content: 'Content data'
});

// List creator products
const creatorProducts = await client.store.listCreatorProducts({
  userRef: 'user-reference'
});

// Submit product for review
const submitResult = await client.store.submitProductForReview({
  userRef: 'user-reference',
  productId: 'product-id'
});

// Review product (approve/reject)
const reviewedProduct = await client.store.reviewProduct({
  userRef: 'user-reference',
  productId: 'product-id',
  decision: 'approve'
});
```

#### Purchases

```typescript
// Initiate a purchase
const purchase = await client.store.initiatePurchase({
  userRef: 'user-reference',
  productId: 'product-id',
  amount: 9.99,
  paymentMethod: 'credit_card'
});

// Get purchase details
const purchaseDetails = await client.store.getPurchaseDetails({
  purchaseId: 'purchase-id'
});
```

### User API

```typescript
// Get user information
const userInfo = await client.user.getUserInfo({
  userRef: 'user-reference'
});

// Get user purchases
const userPurchases = await client.user.getUserPurchases({
  userRef: 'user-reference'
});
```

### Wallet API

```typescript
// Get user balance
const balance = await client.wallet.getUserBalance({
  userId: 'user-id'
});
```