#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for getting user subscriptions
 * Run: npx tsx src/callers/subscription/getUserSubscriptions.ts
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
    const userRef = process.env.ONCADE_USER_REF || process.env.ONCADE_LUIYIT_USER_REF || 'test_user_ref';
    const limit = parseInt(process.env.ONCADE_LIMIT || '10');
    const offset = parseInt(process.env.ONCADE_OFFSET || '0');

    console.info(`📋 Getting subscriptions for user: ${userRef}`);
    console.info(`   Limit: ${limit}, Offset: ${offset}\n`);
    console.info('⏳ Calling API...\n');

    const response = await client.subscription.getUserSubscriptions({
      userRef,
      limit,
      offset,
    });

    console.info('✅ Success! User subscriptions retrieved');
    console.info(`   Returned: ${response.subscriptions.length}\n`);

    if (response.subscriptions.length > 0) {
      console.info('📦 Subscriptions:');
      response.subscriptions.forEach((sub, index) => {
        console.info(`\n   ${index + 1}. Subscription ID: ${sub.subscriptionId}`);
        console.info(`      Item ID: ${sub.itemId}`);
        console.info(`      Status: ${sub.status}`);
        console.info(`      Plan: ${sub.planCode} (${sub.planId})`);
      });
    } else {
      console.info('   No subscriptions found for this user');
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
