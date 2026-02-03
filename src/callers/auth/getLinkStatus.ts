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
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Parameters from environment or mock
    const session = process.env.ONCADE_USER_SESSION_KEY;

    if (!session) {
      console.error('⚠️  ONCADE_USER_SESSION_KEY environment variable is required');
      console.info('\n💡 Run initiateAccountLink first to get a session key:');
      console.info('   npx tsx src/callers/auth/initiateAccountLink.ts');
      process.exit(1);
    }

    console.info('🔍 Getting account link status');
    console.info(`   Session: ${session.substring(0, 20)}...`);
    console.info('\n⏳ Calling API...\n');

    const response = await client.auth.getLinkStatus({
      session,
    });

    console.info(JSON.stringify(response, null, 2));

    console.info('✅ Success! Link details retrieved:\n');
    console.info('📋 Summary:');
    console.info(`   Namespace: ${response.namespaceType}`);
    if (response.gameId) console.info(`   Game ID: ${response.gameId}`);
    if (response.gameName) console.info(`   Game: ${response.gameName}`);
    console.info(`   Prefilled email: ${response.prefilledEmail}`);
    if (response.userRef) console.info(`   User ref: ${response.userRef}`);
    if (response.spendPermission) {
      console.info(`   Spend permission: ${response.spendPermission.tenantName} (${response.spendPermission.networkKey})`);
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
