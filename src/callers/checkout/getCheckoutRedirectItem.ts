#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for getting checkout redirect URL for generic items
 * Run: npx tsx src/callers/checkout/getCheckoutRedirect.ts
 */
async function main() {
  try {
    console.log('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Parameters from environment or mock
    const gameId = process.env.ONCADE_GAME_ID || 'test-game';
    const itemId = process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID || 'test-item';
    const redirectUrl = process.env.ONCADE_REDIRECT_URL;
    const affiliateCode = process.env.ONCADE_AFFILIATE_CODE;
    const dealCode = process.env.ONCADE_DEAL_CODE;
    const checkoutMethod = process.env.ONCADE_CHECKOUT_METHOD as 'credit' | 'stripe' | 'paypal' | undefined;

    console.log('🔗 Getting checkout redirect URL');
    console.log(`   Game ID: ${gameId}`);
    console.log(`   Item ID: ${itemId}`);
    if (redirectUrl) console.log(`   Redirect URL: ${redirectUrl}`);
    if (affiliateCode) console.log(`   Affiliate Code: ${affiliateCode}`);
    if (dealCode) console.log(`   Deal Code: ${dealCode}`);
    if (checkoutMethod) console.log(`   Checkout Method: ${checkoutMethod}`);
    console.log('\n⏳ Calling API...\n');

    const response = await client.checkout.getCheckoutRedirect({
      gameId,
      itemId,
      redirectUrl,
      affiliateCode,
      dealCode,
      checkoutMethod,
    });

    console.log('✅ Success! Checkout redirect URL retrieved:\n');
    console.log('📋 Summary:');
    console.log(`   Checkout URL: ${response.url}`);
    console.log('\n🌐 You can open this URL in a browser to proceed with checkout');

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
