#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for initiating a purchase
 * Run: npx tsx src/callers/store/initiatePurchase.ts
 */
async function main() {
  try {
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Mock data for purchase initiation
    const userRef = process.env.ONCADE_USER_REF || process.env.ONCADE_LUIYIT_USER_REF || 'test_user_ref';
    const productId = process.env.ONCADE_PRODUCT_ID || process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID || 'test_product_id';
    const amount = parseInt(process.env.ONCADE_AMOUNT || '999'); // Default $9.99
    const paymentMethod = process.env.ONCADE_PAYMENT_METHOD || 'credit';

    console.info('💳 Initiating purchase');
    console.info(`   User: ${userRef}`);
    console.info(`   Product ID: ${productId}`);
    console.info(`   Amount: $${(amount / 100).toFixed(2)}`);
    console.info(`   Payment Method: ${paymentMethod}\n`);
    console.info('⏳ Calling API...\n');

    const response = await client.store.initiatePurchase({
      userRef,
      productId,
      amount,
      paymentMethod,
    });

    console.info('✅ Success! Purchase initiated:\n');
    console.info('📋 Summary:');
    console.info(`   Purchase ID: ${response.purchase.id}`);
    console.info(`   User: ${response.purchase.userRef}`);
    console.info(`   Product ID: ${response.purchase.productId}`);
    console.info(`   Amount: $${(response.purchase.amount / 100).toFixed(2)}`);
    console.info(`   Payment Method: ${response.purchase.paymentMethod}`);
    console.info(`   Status: ${response.purchase.status}`);
    console.info(`   Created: ${response.purchase.createdAt}`);

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
