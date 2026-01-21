#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for getting a product by ID
 * Run: npx tsx src/callers/store/getProduct.ts
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

    console.log(`🔍 Fetching product: ${productId}\n`);
    console.log('⏳ Calling API...\n');

    const product = await client.store.getProduct({ productId });

    console.log('✅ Success! Product details:');
    console.log(JSON.stringify(product, null, 2));
    console.log('\n📋 Summary:');
    console.log(`   ID: ${product._id}`);
    console.log(`   Name: ${product.name}`);
    console.log(`   Type: ${product.type}`);
    console.log(`   Status: ${product.status}`);
    console.log(`   Price: $${(product.price / 100).toFixed(2)}`);
    console.log(`   Category: ${product.category || 'N/A'}`);
    console.log(`   For Sale: ${product.forSale}`);
    console.log(`   Fulfillment: ${product.fulfillmentType}`);
    console.log(`   Created: ${product.createdAt}`);

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
