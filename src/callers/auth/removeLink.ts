#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for removing account link
 * Run: npx tsx src/callers/auth/removeLink.ts
 */
async function main() {
  try {
    console.log('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Parameters from environment or mock
    const userRef = process.env.ONCADE_USER_REF;

    if (!userRef) {
      console.error('⚠️  ONCADE_USER_REF environment variable is required');
      console.log('\n💡 Set the user reference from a previous link:');
      console.log('   export ONCADE_USER_REF="your-user-ref"');
      process.exit(1);
    }

    console.log('🗑️  Removing account link');
    console.log(`   User Reference: ${userRef}`);
    console.log('\n⏳ Calling API...\n');

    const response = await client.auth.removeLink({
      userRef,
    });

    console.log('✅ Success! Account link removed:\n');
    console.log('📋 Summary:');
    console.log(`   Success: ${response.success}`);

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
