#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for reviewing a product (approve/decline)
 * Run: npx tsx src/callers/store/reviewProduct.ts
 */
async function main() {
  try {
    console.log('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // User reference and product ID from environment
    const userRef = process.env.ONCADE_LUIYIT_USER_REF || process.env.ONCADE_USER_REF || 'test_user_ref';
    const productId = process.env.ONCADE_PRODUCT_ID || process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID || '69394e4b3bc19b79fff5de65';
    const decision = (process.env.ONCADE_REVIEW_DECISION as 'approve' | 'decline') || 'approve';

    console.log(`⚖️  Reviewing product`);
    console.log(`   User: ${userRef}`);
    console.log(`   Product: ${productId}`);
    console.log(`   Decision: ${decision}\n`);
    console.log('⏳ Calling API...\n');

    const response = await client.store.reviewProduct({
      userRef,
      productId,
      decision,
    });

    console.log(`✅ Success! Product ${decision}d:\n');
    console.log('📋 Summary:');
    console.log(`   Product ID: ${response._id}`);
    console.log(`   Name: ${response.name}`);
    console.log(`   Status: ${response.status}`);
    console.log(`   Creator: ${response.userRef}`);

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
