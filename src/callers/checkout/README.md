# Checkout Callers

Executable test scripts for Checkout API endpoints with built-in mock data.

## Setup

Ensure you have your `.env` file configured with:

```env
ONCADE_SDK_API_KEY=your_api_key
ONCADE_GAME_ID=your_game_id
ONCADE_ITEM_ID=item_or_product_id
ONCADE_PRODUCT_ID=product_id
ONCADE_SUBSCRIPTION_PRODUCT_ID=subscription_product_id
ONCADE_REDIRECT_URL=https://yourgame.com/thanks
ONCADE_AFFILIATE_CODE=affiliate_code
ONCADE_DEAL_CODE=deal_code
ONCADE_CHECKOUT_METHOD=credit
```

## Available Scripts

### Get Checkout Theme
```bash
npx tsx src/callers/checkout/getCheckoutTheme.ts
```
Retrieves the checkout theme configuration for your game, including:
- Button colors (primary, secondary, notify)
- Background and border colors
- Price override color
- Logo URL

Optional:
- `ONCADE_ITEM_ID` - Specific item to get theme for (otherwise uses game theme)

### Get Checkout Redirect URL (Generic Item)
```bash
npx tsx src/callers/checkout/getCheckoutRedirect.ts
```
Generates a checkout URL for a generic item.

Required:
- `ONCADE_GAME_ID` - Your game ID
- `ONCADE_ITEM_ID` - Item to purchase

### Get Checkout Redirect URL (Product)
```bash
npx tsx src/callers/checkout/getCheckoutRedirectProduct.ts
```
Generates a checkout URL specifically for products.

Required:
- `ONCADE_GAME_ID` - Your game ID
- `ONCADE_PRODUCT_ID` - Product to purchase

### Get Checkout Redirect URL (Subscription)
```bash
npx tsx src/callers/checkout/getCheckoutRedirectSubs.ts
```
Generates a checkout URL specifically for subscription products.

Required:
- `ONCADE_GAME_ID` - Your game ID
- `ONCADE_SUBSCRIPTION_PRODUCT_ID` - Subscription product to purchase

**All checkout redirect endpoints support these optional parameters:**
- `ONCADE_REDIRECT_URL` - URL to redirect after checkout completion
- `ONCADE_AFFILIATE_CODE` - Affiliate tracking code
- `ONCADE_DEAL_CODE` - Special deal/discount code to apply
- `ONCADE_CHECKOUT_METHOD` - Pre-select payment method (credit, stripe, paypal)

## Usage Pattern

Each script:
- ✅ Has built-in mock data
- ✅ Loads configuration from environment
- ✅ Can be run directly with tsx
- ✅ Provides detailed console output
- ✅ Returns proper exit codes

## Examples

```bash
# Get checkout theme for your game
npx tsx src/callers/checkout/getCheckoutTheme.ts

# Get checkout theme for a specific item
ONCADE_ITEM_ID=item_123 npx tsx src/callers/checkout/getCheckoutTheme.ts

# Get basic checkout redirect URL for generic item
ONCADE_ITEM_ID=item_123 npx tsx src/callers/checkout/getCheckoutRedirect.ts

# Get checkout URL for a product
ONCADE_PRODUCT_ID=prod_456 npx tsx src/callers/checkout/getCheckoutRedirectProduct.ts

# Get checkout URL for a subscription
ONCADE_SUBSCRIPTION_PRODUCT_ID=sub_789 npx tsx src/callers/checkout/getCheckoutRedirectSubs.ts

# Full-featured subscription checkout with all options
ONCADE_SUBSCRIPTION_PRODUCT_ID=sub_789 \
ONCADE_REDIRECT_URL=https://mygame.com/success \
ONCADE_AFFILIATE_CODE=STREAMER123 \
ONCADE_DEAL_CODE=SUMMER2026 \
ONCADE_CHECKOUT_METHOD=credit \
npx tsx src/callers/checkout/getCheckoutRedirectSubs.ts

# Product checkout with deal code
ONCADE_PRODUCT_ID=prod_456 \
ONCADE_DEAL_CODE=HOLIDAY2026 \
ONCADE_CHECKOUT_METHOD=stripe \
npx tsx src/callers/checkout/getCheckoutRedirectProduct.ts
```

## Checkout Methods

Available checkout methods for `ONCADE_CHECKOUT_METHOD`:
- `credit` - Use Oncade credit balance
- `stripe` - Stripe payment processing
- `paypal` - PayPal payment processing

When specified, the checkout page will pre-select this payment method after user authentication.
