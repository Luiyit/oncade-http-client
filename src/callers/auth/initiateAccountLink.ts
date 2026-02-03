#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for initiating account link
 * Run: npx tsx src/callers/auth/initiateAccountLink.ts
 */
async function main() {
  try {
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Parameters from environment or mock
    const email = process.env.ONCADE_USER_EMAIL || 'test@example.com';
    const sessionKey = process.env.ONCADE_USER_SESSION_KEY;

    console.info('🔗 Initiating account link');
    console.info(`   Email: ${email}`);
    if (sessionKey) console.info(`   Session Key: ${sessionKey.substring(0, 20)}...`);
    console.info('\n⏳ Calling API...\n');

    const response = await client.auth.initiateAccountLink({
      email,
      sessionKey,
    });

    console.info('✅ Success! Account link initiated:\n');
    console.info('📋 Summary:');
    console.info(`   Session Key: ${response.sessionKey}`);
    console.info(`   URL: ${response.url}`);
    console.info('\n💡 Use this session key with getLinkStatus to check the link status');
    console.info(`   Export it: export ONCADE_USER_SESSION_KEY="${response.sessionKey}"`);

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
