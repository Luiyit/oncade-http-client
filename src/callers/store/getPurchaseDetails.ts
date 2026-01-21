#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for getting purchase details
 * Run: npx tsx src/callers/store/getPurchaseDetails.ts
 */
async function main() {
  try {
    console.log('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Purchase ID from environment or mock
    const purchaseId = process.env.ONCADE_PURCHASE_ID || 'test_purchase_id';

    console.log(`🔍 Fetching purchase details: ${purchaseId}\n`);
    console.log('⏳ Calling API...\n');

    const response = await client.store.getPurchaseDetails({ purchaseId });

    console.log('✅ Success! Purchase details retrieved:\n');
    console.log('📋 Summary:');
    console.log(`   Purchase ID: ${response.purchase.id}`);
    console.log(`   User: ${response.purchase.userRef}`);
    console.log(`   Product ID: ${response.purchase.productId}`);
    console.log(`   Amount: $${(response.purchase.amount / 100).toFixed(2)}`);
    console.log(`   Payment Method: ${response.purchase.paymentMethod}`);
    console.log(`   Status: ${response.purchase.status}`);
    console.log(`   Created: ${response.purchase.createdAt}`);

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
