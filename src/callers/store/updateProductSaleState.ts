#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for updating product sale state
 * Run: npx tsx src/callers/store/updateProductSaleState.ts
 */
async function main() {
  try {
    console.log('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Use product ID from environment or a default mock ID
    const productId = process.env.ONCADE_PRODUCT_ID || process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID || '69394e4b3bc19b79fff5de65';
    const forSale = process.env.ONCADE_FOR_SALE === 'false' ? false : true;

    console.log(`🔄 Updating sale state for product: ${productId}`);
    console.log(`   Setting forSale to: ${forSale}\n`);
    console.log('⏳ Calling API...\n');

    const response = await client.store.updateProductSaleState({
      productId,
      forSale,
    });

    console.log('✅ Success! Product sale state updated:\n');
    console.log('📋 Summary:');
    console.log(`   Product ID: ${response._id}`);
    console.log(`   Name: ${response.name}`);
    console.log(`   For Sale: ${response.forSale}`);
    console.log(`   Status: ${response.status}`);

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
