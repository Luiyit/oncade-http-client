#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for getting checkout redirect URL for subscriptions
 * Run: npx tsx src/callers/checkout/getCheckoutRedirectSubs.ts
 */
async function main() {
  try {
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Parameters from environment or mock
    const gameId = process.env.ONCADE_GAME_ID || 'test-game';
    const itemId = process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID || 'test-subscription-id';
    const redirectUrl = process.env.ONCADE_REDIRECT_URL;
    const affiliateCode = process.env.ONCADE_AFFILIATE_CODE;
    const dealCode = process.env.ONCADE_DEAL_CODE;
    const checkoutMethod = process.env.ONCADE_CHECKOUT_METHOD as 'credit' | 'stripe' | 'paypal' | undefined;

    console.info('🔗 Getting checkout redirect URL for Subscription');
    console.info(`   Game ID: ${gameId}`);
    console.info(`   Subscription Product ID: ${itemId}`);
    if (redirectUrl) console.info(`   Redirect URL: ${redirectUrl}`);
    if (affiliateCode) console.info(`   Affiliate Code: ${affiliateCode}`);
    if (dealCode) console.info(`   Deal Code: ${dealCode}`);
    if (checkoutMethod) console.info(`   Checkout Method: ${checkoutMethod}`);
    console.info('\n⏳ Calling API...\n');

    const response = await client.checkout.getCheckoutRedirect({
      gameId,
      itemId,
      redirectUrl,
      affiliateCode,
      dealCode,
      checkoutMethod,
    });

    console.info('✅ Success! Subscription checkout redirect URL retrieved:\n');
    console.info('📋 Summary:');
    console.info(`   Checkout URL: ${response.url}`);
    console.info('\n🌐 You can open this URL in a browser to proceed with subscription checkout');

  } catch (error) {
    console.error('❌ Error occurred:', error instanceof Error ? error.message : String(error));
    if ((error as any).response) {
      console.error('Response status:', (error as any).response.status);
      console.error('Response data:', JSON.stringify((error as any).response.data, null, 2));
    }
    process.exit(1);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

export { main };
