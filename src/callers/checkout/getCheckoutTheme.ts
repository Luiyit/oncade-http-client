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
    console.log('🚀 Setting up OncadeClient...\n');

    // Initialize client
    const client = new OncadeClient({
      apiKey: process.env.ONCADE_SDK_API_KEY || process.env.ONCADE_SERVER_API_KEY,
      gameId: process.env.ONCADE_GAME_ID,
    });

    // Game ID and optional item ID from environment
    const gameId = process.env.ONCADE_GAME_ID || 'test-game';
    const itemId = process.env.ONCADE_ITEM_ID || process.env.ONCADE_PRODUCT_ID || process.env.ONCADE_SUBSCRIPTION_PRODUCT_ID;

    console.log('🎨 Fetching checkout theme');
    console.log(`   Game ID: ${gameId}`);
    if (itemId) {
      console.log(`   Item ID: ${itemId}`);
    }
    console.log('\n⏳ Calling API...\n');

    const theme = await client.checkout.getCheckoutTheme({
      gameId,
      itemId,
    });

    console.log('✅ Success! Checkout theme retrieved:');
    console.log(JSON.stringify(theme, null, 2));
    console.log('\n🎨 Theme Colors:');
    console.log(`   Primary Button: ${theme.primaryButtonColor}`);
    console.log(`   Secondary Button: ${theme.secondaryButtonColor}`);
    console.log(`   Notify Button: ${theme.notifyButtonColor}`);
    console.log(`   Background: ${theme.backgroundColor}`);
    console.log(`   Border: ${theme.borderColor}`);
    console.log(`   Price Override: ${theme.priceOverrideColor}`);
    
    if (theme.logoUrl) {
      console.log(`\n🖼️  Logo: ${theme.logoUrl}`);
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
