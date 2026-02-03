#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for creating a product
 * Run: npx tsx src/callers/store/createProduct.ts
 */
async function main() {
  try {
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Mock data for product creation
    const mockProduct = {
      name: 'Test Product - ' + new Date().toISOString(),
      type: 'purchase' as const,
      fulfillmentType: 'WEBHOOK' as const,
      description: 'A test product created via caller script',
      price: 999, // $9.99 in cents
      category: 'test',
      imageUrl: 'https://example.com/product.png',
      perUserLimit: 10,
    };

    console.info('📦 Creating product with mock data:');
    console.info(JSON.stringify(mockProduct, null, 2));
    console.info('\n⏳ Calling API...\n');

    const response = await client.store.createProduct(mockProduct);

    console.info('✅ Success! Product created:\n');
    console.info('📋 Summary:');
    console.info(`   Product ID: ${response._id}`);
    console.info(`   Name: ${response.name}`);
    console.info(`   Price: $${(response.price / 100).toFixed(2)}`);
    console.info(`   Status: ${response.status}`);
    console.info(`   For Sale: ${response.forSale}`);

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
