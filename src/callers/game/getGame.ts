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
    console.log('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    console.log('🎮 Fetching game information...\n');
    console.log('⏳ Calling API...\n');

    const game = await client.game.getGame();

    console.log('✅ Success! Game information retrieved:');
    console.log('\n📋 Summary:');
    console.log(`   Game ID: ${game.gameId}`);
    console.log(`   Name: ${game.name}`);
    console.log(`   Description: ${game.description}`);
    console.log(`   Status: ${game.status}`);
    console.log(`   Environment: ${game.environment}`);
    console.log(`   Visible: ${game.isVisible}`);
    console.log(`   Affiliate Rate: ${game.affiliateRate}%`);
    console.log(`   Tip Enabled: ${game.enableTip}`);
    
    if (game.steamAppId) {
      console.log(`   Steam App ID: ${game.steamAppId}`);
    }
    if (game.discordUrl) {
      console.log(`   Discord: ${game.discordUrl}`);
    }
    if (game.demoUrl) {
      console.log(`   Demo URL: ${game.demoUrl}`);
    }
    
    console.log(`\n📸 Images:`);
    console.log(`   Main Image: ${game.imageUrl}`);
    console.log(`   Small Image: ${game.smallImageUrl}`);
    console.log(`   Store Image: ${game.storeImageUrl}`);
    
    if (game.screenshots && game.screenshots.length > 0) {
      console.log(`\n📷 Screenshots: ${game.screenshots.length}`);
      game.screenshots.forEach((url, index) => {
        console.log(`   ${index + 1}. ${url}`);
      });
    }

    console.log(`\n📅 Timestamps:`);
    console.log(`   Created: ${game.createdAt}`);
    console.log(`   Updated: ${game.updatedAt}`);

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
