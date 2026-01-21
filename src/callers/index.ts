/**
 * Callers - Executable test scripts for API operations
 * 
 * Each caller is a standalone script that can be run directly with tsx.
 * These scripts have built-in mock data for quick testing.
 * 
 * Auth Callers:
 * - npx tsx src/callers/auth/initiateAccountLink.ts
 * - npx tsx src/callers/auth/getLinkStatus.ts
 * - npx tsx src/callers/auth/approveLink.ts
 * - npx tsx src/callers/auth/declineLink.ts
 * - npx tsx src/callers/auth/removeLink.ts
 * 
 * Game Callers:
 * - npx tsx src/callers/game/getGame.ts
 * 
 * Store Callers:
 * - npx tsx src/callers/store/createProduct.ts
 * - npx tsx src/callers/store/getProduct.ts
 * - npx tsx src/callers/store/listProducts.ts
 * - npx tsx src/callers/store/updateProduct.ts
 * - npx tsx src/callers/store/updateProductSaleState.ts
 * - npx tsx src/callers/store/createUGCProduct.ts
 * - npx tsx src/callers/store/listCreatorProducts.ts
 * - npx tsx src/callers/store/submitProductForReview.ts
 * - npx tsx src/callers/store/reviewProduct.ts
 * - npx tsx src/callers/store/initiatePurchase.ts
 * - npx tsx src/callers/store/getPurchaseDetails.ts
 * 
 * Subscription Callers:
 * - npx tsx src/callers/subscription/getUserSubscriptions.ts
 * - npx tsx src/callers/subscription/createSubscription.ts
 * - npx tsx src/callers/subscription/cancelSubscription.ts
 * 
 * Checkout Callers:
 * - npx tsx src/callers/checkout/getCheckoutTheme.ts
 * - npx tsx src/callers/checkout/getCheckoutRedirectItem.ts
 * - npx tsx src/callers/checkout/getCheckoutRedirectProduct.ts
 * - npx tsx src/callers/checkout/getCheckoutRedirectSubs.ts
 * 
 * See individual README files in each directory for more details.
 */

// Note: These are executable scripts, not modules to import.
// Run them directly using tsx as shown above.
