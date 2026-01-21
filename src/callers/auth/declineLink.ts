#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for declining account link
 * Run: npx tsx src/callers/auth/declineLink.ts
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
    const sessionKey = process.env.ONCADE_USER_SESSION_KEY;

    if (!sessionKey) {
      console.error('⚠️  ONCADE_USER_SESSION_KEY environment variable is required');
      console.log('\n💡 Run initiateAccountLink first to get a session key:');
      console.log('   npx tsx src/callers/auth/initiateAccountLink.ts');
      process.exit(1);
    }

    console.log('❌ Declining account link');
    console.log(`   Session Key: ${sessionKey.substring(0, 20)}...`);
    console.log('\n⏳ Calling API...\n');

    const response = await client.auth.declineLink({
      sessionKey,
    });

    console.log('✅ Success! Account link declined:\n');
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
