#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for creating a subscription
 * Run: npx tsx src/callers/subscription/createSubscription.ts
 */
async function main() {
  try {
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // User reference and item ID from environment or mock
    const userRef = process.env.ONCADE_USER_REF || 
                    'test_user_ref';
                    
    const itemId =  process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID_V2 || 
                    process.env.ONCADE_ITEM_ID || 
                    process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID || 
                    'test_item_id';

    console.info('📝 Creating subscription');
    console.info(`   User: ${userRef}`);
    console.info(`   Item ID: ${itemId}\n`);
    console.info('⏳ Calling API...\n');

    const response = await client.subscription.createSubscription({
      userRef,
      itemId,
    });

    console.info('✅ Success! Subscription created:\n');
    console.info('📋 Summary:');
    console.info(`   Subscription ID: ${response.subscription.subscriptionId}`);
    console.info(`   Item ID: ${response.subscription.itemId}`);
    console.info(`   Status: ${response.subscription.status}`);
    console.info(`   Plan: ${response.subscription.planCode} (${response.subscription.planId})`);
    if (response.message) console.info(`   Message: ${response.message}`);

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
