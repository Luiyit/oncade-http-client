#!/usr/bin/env tsx
import { OncadeClient } from '../../client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Test script for getting checkout theme
 * Run: npx tsx src/callers/checkout/getCheckoutTheme.ts
 */
async function main() {
  try {
    console.info('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Game ID and optional item ID from environment
    const gameId = process.env.ONCADE_GAME_ID || 'test-game';
    const itemId = process.env.ONCADE_ITEM_ID || process.env.ONCADE_PRODUCT_ID || process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID;

    console.info('🎨 Fetching checkout theme');
    console.info(`   Game ID: ${gameId}`);
    if (itemId) {
      console.info(`   Item ID: ${itemId}`);
    }
    console.info('\n⏳ Calling API...\n');

    const theme = await client.checkout.getCheckoutTheme({
      gameId,
      itemId,
    });

    console.info('✅ Success! Checkout theme retrieved:');
    console.info(JSON.stringify(theme, null, 2));
    console.info('\n🎨 Theme Colors:');
    console.info(`   Primary Button: ${theme.primaryButtonColor}`);
    console.info(`   Secondary Button: ${theme.secondaryButtonColor}`);
    console.info(`   Notify Button: ${theme.notifyButtonColor}`);
    console.info(`   Background: ${theme.backgroundColor}`);
    console.info(`   Border: ${theme.borderColor}`);
    console.info(`   Price Override: ${theme.priceOverrideColor}`);
    
    if (theme.logoUrl) {
      console.info(`\n🖼️  Logo: ${theme.logoUrl}`);
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
