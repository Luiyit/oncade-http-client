#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for getting account link status
 * Run: npx tsx src/callers/auth/getLinkStatus.ts
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
    const session = process.env.ONCADE_USER_SESSION_KEY;

    if (!session) {
      console.error('⚠️  ONCADE_USER_SESSION_KEY environment variable is required');
      console.log('\n💡 Run initiateAccountLink first to get a session key:');
      console.log('   npx tsx src/callers/auth/initiateAccountLink.ts');
      process.exit(1);
    }

    console.log('🔍 Getting account link status');
    console.log(`   Session: ${session.substring(0, 20)}...`);
    console.log('\n⏳ Calling API...\n');

    const response = await client.auth.getLinkStatus({
      session,
    });

    console.log(JSON.stringify(response, null, 2));

    console.log('✅ Success! Link details retrieved:\n');
    console.log('📋 Summary:');
    console.log(`   Namespace: ${response.namespaceType}`);
    if (response.gameId) console.log(`   Game ID: ${response.gameId}`);
    if (response.gameName) console.log(`   Game: ${response.gameName}`);
    console.log(`   Prefilled email: ${response.prefilledEmail}`);
    if (response.userRef) console.log(`   User ref: ${response.userRef}`);
    if (response.spendPermission) {
      console.log(`   Spend permission: ${response.spendPermission.tenantName} (${response.spendPermission.networkKey})`);
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
