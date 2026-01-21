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
    console.log('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // User reference from environment or mock
    const userRef = process.env.ONCADE_USER_REF || process.env.ONCADE_LUIYIT_USER_REF || 'test_user_ref';
    const limit = parseInt(process.env.ONCADE_LIMIT || '10');
    const offset = parseInt(process.env.ONCADE_OFFSET || '0');

    console.log(`📋 Getting subscriptions for user: ${userRef}`);
    console.log(`   Limit: ${limit}, Offset: ${offset}\n`);
    console.log('⏳ Calling API...\n');

    const response = await client.subscription.getUserSubscriptions({
      userRef,
      limit,
      offset,
    });

    console.log('✅ Success! User subscriptions retrieved:', response);
    console.log(`   Total Subscriptions: ${response.total}`);
    console.log(`   Returned: ${response.subscriptions.length}\n`);

    if (response.subscriptions.length > 0) {
      console.log('📦 Subscriptions:');
      response.subscriptions.forEach((subscription, index) => {
        console.log(`\n   ${index + 1}. Subscription ID: ${subscription.subscriptionId}`);
        console.log(`      Item ID: ${subscription.itemId}`);
        console.log(`      Status: ${subscription.status}`);
        console.log(`      Current Period: ${subscription.currentPeriodStart} to ${subscription.currentPeriodEnd}`);
        console.log(`      Cancel at Period End: ${subscription.cancelAtPeriodEnd}`);
        if (subscription.cancelledAt) {
          console.log(`      Cancelled At: ${subscription.cancelledAt}`);
        }
        console.log(`      Created: ${subscription.createdAt}`);
      });
    } else {
      console.log('   No subscriptions found for this user');
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
