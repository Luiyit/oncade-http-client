#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for listing creator products
 * Run: npx tsx src/callers/store/listCreatorProducts.ts
 */
async function main() {
  try {
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // User reference from environment or mock
    const userRef = process.env.ONCADE_LUIYIT_USER_REF || process.env.ONCADE_USER_REF || 'test_user_ref';

    console.info(`👤 Listing products for creator: ${userRef}\n`);
    console.info('⏳ Calling API...\n');

    const response = await client.store.listCreatorProducts({ userRef });

    console.info('✅ Success! Creator products retrieved:');
    console.info(`   Total Products: ${response.products.length}\n`);

    if (response.products.length > 0) {
      console.info('📦 Products:');
      response.products.forEach((product, index) => {
        console.info(`\n   ${index + 1}. ${product.name}`);
        console.info(`      ID: ${product._id}`);
        console.info(`      Type: ${product.type}`);
        console.info(`      Status: ${product.status}`);
        console.info(`      Price: $${(product.price / 100).toFixed(2)}`);
        console.info(`      For Sale: ${product.forSale}`);
        console.info(`      Created: ${product.createdAt}`);
      });
    } else {
      console.info('   No products found for this creator');
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
