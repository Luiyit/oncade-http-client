#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for getting game information
 * Run: npx tsx src/callers/game/getGame.ts
 */
async function main() {
  try {
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    console.info('🎮 Fetching game information...\n');
    console.info('⏳ Calling API...\n');

    const game = await client.game.getGame();

    console.info('✅ Success! Game information retrieved:');
    console.info('\n📋 Summary:');
    console.info(`   Game ID: ${game.gameId}`);
    console.info(`   Name: ${game.name}`);
    console.info(`   Description: ${game.description}`);
    console.info(`   Status: ${game.status}`);
    console.info(`   Environment: ${game.environment}`);
    console.info(`   Visible: ${game.isVisible}`);
    console.info(`   Affiliate Rate: ${game.affiliateRate}%`);
    console.info(`   Tip Enabled: ${game.enableTip}`);
    
    if (game.steamAppId) {
      console.info(`   Steam App ID: ${game.steamAppId}`);
    }
    if (game.discordUrl) {
      console.info(`   Discord: ${game.discordUrl}`);
    }
    if (game.demoUrl) {
      console.info(`   Demo URL: ${game.demoUrl}`);
    }
    
    console.info(`\n📸 Images:`);
    console.info(`   Main Image: ${game.imageUrl}`);
    console.info(`   Small Image: ${game.smallImageUrl}`);
    console.info(`   Store Image: ${game.storeImageUrl}`);
    
    if (game.screenshots && game.screenshots.length > 0) {
      console.info(`\n📷 Screenshots: ${game.screenshots.length}`);
      game.screenshots.forEach((url, index) => {
        console.info(`   ${index + 1}. ${url}`);
      });
    }

    console.info(`\n📅 Timestamps:`);
    console.info(`   Created: ${game.createdAt}`);
    console.info(`   Updated: ${game.updatedAt}`);

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
