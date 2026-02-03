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
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Use product ID from environment or a default mock ID
    const productId = process.env.ONCADE_PRODUCT_ID || process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID || '69394e4b3bc19b79fff5de65';

    console.info(`🔍 Fetching product: ${productId}\n`);
    console.info('⏳ Calling API...\n');

    const product = await client.store.getProduct({ productId });

    console.info('✅ Success! Product details:');
    console.info(JSON.stringify(product, null, 2));
    console.info('\n📋 Summary:');
    console.info(`   ID: ${product._id}`);
    console.info(`   Name: ${product.name}`);
    console.info(`   Type: ${product.type}`);
    console.info(`   Status: ${product.status}`);
    console.info(`   Price: $${(product.price / 100).toFixed(2)}`);
    console.info(`   Category: ${product.category || 'N/A'}`);
    console.info(`   For Sale: ${product.forSale}`);
    console.info(`   Fulfillment: ${product.fulfillmentType}`);
    console.info(`   Created: ${product.createdAt}`);

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
