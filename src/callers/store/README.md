# Store Callers

Executable test scripts for Store API endpoints with built-in mock data.

## Setup

Ensure you have your `.env` file configured with:

```env
ONCADE_SDK_API_KEY=your_api_key
ONCADE_GAME_ID=your_game_id
ONCADE_PRODUCT_ID=product_id_for_testing
ONCADE_SUBSCRIPTION_PRODUCT_ID=subscription_product_id
ONCADE_USER_REF=user_reference_for_ugc
ONCADE_PURCHASE_ID=purchase_id_for_testing
ONCADE_AMOUNT=999
ONCADE_PAYMENT_METHOD=credit
```

## Available Scripts

### Create Product
```bash
npx tsx src/callers/store/createProduct.ts
```
Creates a new product with mock data.

### Get Product
```bash
npx tsx src/callers/store/getProduct.ts
```
Retrieves a product by ID (uses `ONCADE_PRODUCT_ID` from env).

### List Products
```bash
npx tsx src/callers/store/listProducts.ts
```
Lists all products. Optionally filter by category using `ONCADE_PRODUCT_CATEGORY`.

### Update Product
```bash
npx tsx src/callers/store/updateProduct.ts
```
Updates a product with mock data (uses `ONCADE_PRODUCT_ID` from env).

### Update Product Sale State
```bash
npx tsx src/callers/store/updateProductSaleState.ts
```
Toggles product sale state. Use `ONCADE_FOR_SALE=false` to set to false, defaults to true.

### Create UGC Product
```bash
npx tsx src/callers/store/createUGCProduct.ts
```
Creates a user-generated content product (uses `ONCADE_USER_REF` from env).

### List Creator Products
```bash
npx tsx src/callers/store/listCreatorProducts.ts
```
Lists products for a specific creator (uses `ONCADE_USER_REF` from env).

### Submit Product For Review
```bash
npx tsx src/callers/store/submitProductForReview.ts
```
Submits a product for review (uses `ONCADE_USER_REF` and `ONCADE_PRODUCT_ID`).

### Review Product
```bash
npx tsx src/callers/store/reviewProduct.ts
```
Approves or declines a product. Set `ONCADE_REVIEW_DECISION=decline` to decline, defaults to approve.

### Initiate Purchase
```bash
npx tsx src/callers/store/initiatePurchase.ts
```
Initiates a purchase for a product (uses `ONCADE_USER_REF`, `ONCADE_PRODUCT_ID` or `ONCADE_SUBSCRIPTION_PRODUCT_ID`).

Optional environment variables:
- `ONCADE_AMOUNT` - Purchase amount in cents (default: 999 = $9.99)
- `ONCADE_PAYMENT_METHOD` - Payment method (default: credit)

### Get Purchase Details
```bash
npx tsx src/callers/store/getPurchaseDetails.ts
```
Retrieves purchase details by ID (uses `ONCADE_PURCHASE_ID` from env).

## Usage Pattern

Each script:
- ✅ Has built-in mock data
- ✅ Loads configuration from environment
- ✅ Can be run directly with tsx
- ✅ Provides detailed console output
- ✅ Returns proper exit codes

## Examples

```bash
# Create a product
npx tsx src/callers/store/createProduct.ts

# Get a specific product
ONCADE_PRODUCT_ID=abc123 npx tsx src/callers/store/getProduct.ts

# List products in a category
ONCADE_PRODUCT_CATEGORY=weapons npx tsx src/callers/store/listProducts.ts

# Create UGC product for a user
ONCADE_USER_REF=user_123 npx tsx src/callers/store/createUGCProduct.ts

# Initiate a purchase
ONCADE_USER_REF=user_123 ONCADE_PRODUCT_ID=prod_456 npx tsx src/callers/store/initiatePurchase.ts

# Get purchase details
ONCADE_PURCHASE_ID=purchase_789 npx tsx src/callers/store/getPurchaseDetails.ts
```
