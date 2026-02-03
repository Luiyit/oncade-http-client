#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for creating a UGC product
 * Run: npx tsx src/callers/store/createUGCProduct.ts
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

    // Mock data for UGC product creation
    const mockUGCProduct = {
      name: 'UGC Product - ' + new Date().toISOString(),
      type: 'purchase' as const,
      fulfillmentType: 'WEBHOOK' as const,
      description: 'A user-generated content product created via caller script',
      price: 599, // $5.99 in cents
      content: JSON.stringify({
        itemType: 'skin',
        itemData: {
          color: '#FF5733',
          texture: 'metallic',
          rarity: 'epic'
        }
      }),
    };

    console.info(`👤 Creating UGC product for user: ${userRef}`);
    console.info('\n📦 Product data:');
    console.info(JSON.stringify(mockUGCProduct, null, 2));
    console.info('\n⏳ Calling API...\n');

    const response = await client.store.createUGCProduct(userRef, mockUGCProduct);

    console.info('✅ Success! UGC product created:\n');
    console.info('📋 Summary:');
    console.info(`   Product ID: ${response._id}`);
    console.info(`   Name: ${response.name}`);
    console.info(`   Price: $${(response.price / 100).toFixed(2)}`);
    console.info(`   Status: ${response.status}`);
    console.info(`   Creator: ${response.userRef}`);
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
