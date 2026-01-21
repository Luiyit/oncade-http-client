# Subscription Callers

Executable test scripts for Subscription API endpoints with built-in mock data.

## Setup

Ensure you have your `.env` file configured with:

```env
ONCADE_SDK_API_KEY=your_api_key
ONCADE_GAME_ID=your_game_id
ONCADE_USER_REF=user_reference
ONCADE_ITEM_ID=subscription_item_id
ONCADE_SUBSCRIPTION_PRODUCT_ID=subscription_product_id
```

## Available Scripts

### Get User Subscriptions
```bash
npx tsx src/callers/subscription/getUserSubscriptions.ts
```
Lists all subscriptions for a user (uses `ONCADE_USER_REF` from env).

Optional environment variables:
- `ONCADE_LIMIT` - Number of results to return (default: 10)
- `ONCADE_OFFSET` - Pagination offset (default: 0)

### Create Subscription
```bash
npx tsx src/callers/subscription/createSubscription.ts
```
Creates a new subscription for a user (uses `ONCADE_USER_REF` and `ONCADE_ITEM_ID`).

### Cancel Subscription
```bash
npx tsx src/callers/subscription/cancelSubscription.ts
```
Cancels an active subscription (uses `ONCADE_USER_REF` and `ONCADE_ITEM_ID`).

## Usage Pattern

Each script:
- ✅ Has built-in mock data
- ✅ Loads configuration from environment
- ✅ Can be run directly with tsx
- ✅ Provides detailed console output
- ✅ Returns proper exit codes

## Examples

```bash
# Get user subscriptions
ONCADE_USER_REF=user_123 npx tsx src/callers/subscription/getUserSubscriptions.ts

# Create a subscription
ONCADE_USER_REF=user_123 ONCADE_ITEM_ID=sub_item_456 npx tsx src/callers/subscription/createSubscription.ts

# Cancel a subscription
ONCADE_USER_REF=user_123 ONCADE_ITEM_ID=sub_item_456 npx tsx src/callers/subscription/cancelSubscription.ts

# Get subscriptions with pagination
ONCADE_USER_REF=user_123 ONCADE_LIMIT=5 ONCADE_OFFSET=10 npx tsx src/callers/subscription/getUserSubscriptions.ts
```
