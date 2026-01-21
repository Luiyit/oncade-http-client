#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for updating a product
 * Run: npx tsx src/callers/store/updateProduct.ts
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

    // Mock data for product update
    const updateData = {
      productId,
      name: 'Updated Product Name - ' + new Date().toISOString(),
      description: 'Updated description via caller script',
      price: 1499, // $14.99 in cents
      isVisible: true,
      forSale: true,
    };

    console.log(`✏️  Updating product: ${productId}`);
    console.log('\n📝 Update data:');
    console.log(JSON.stringify(updateData, null, 2));
    console.log('\n⏳ Calling API...\n');

    const response = await client.store.updateProduct(updateData);

    console.log('✅ Success! Product updated:\n');
    console.log('📋 Summary:');
    console.log(`   Product ID: ${response._id}`);
    console.log(`   Name: ${response.name}`);
    console.log(`   Price: $${(response.price / 100).toFixed(2)}`);
    console.log(`   Visible: ${response.isVisible}`);
    console.log(`   For Sale: ${response.forSale}`);

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
