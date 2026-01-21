#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for listing products
 * Run: npx tsx src/callers/store/listProducts.ts
 */
async function main() {
  try {
    console.log('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Optional category filter from environment
    const category = process.env.ONCADE_PRODUCT_CATEGORY;

    if (category) {
      console.log(`📋 Listing products in category: ${category}\n`);
    } else {
      console.log('📋 Listing all products\n');
    }
    
    console.log('⏳ Calling API...\n');

    const response = await client.store.listProducts(
      category ? { category } : undefined
    );

    console.log('✅ Success! Products retrieved:');
    console.log(`   Total Products: ${response.products.length}\n`);

    if (response.products.length > 0) {
      console.log('📦 Products:');
      response.products.forEach((product, index) => {
        console.log(`\n   ${index + 1}. ${product.name}`);
        console.log(`      ID: ${product._id}`);
        console.log(`      Type: ${product.type}`);
        console.log(`      Status: ${product.status}`);
        console.log(`      Price: $${(product.price / 100).toFixed(2)}`);
        console.log(`      Category: ${product.category || 'N/A'}`);
        console.log(`      For Sale: ${product.forSale}`);
      });
    } else {
      console.log('   No products found');
    }

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
