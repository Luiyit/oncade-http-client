# Game Callers

Executable test scripts for Game API endpoints with built-in mock data.

## Setup

Ensure you have your `.env` file configured with:

```env
ONCADE_SDK_API_KEY=your_api_key
ONCADE_GAME_ID=your_game_id
```

## Available Scripts

### Get Game Information
```bash
npx tsx src/callers/game/getGame.ts
```
Retrieves complete information about the game associated with your API key, including:
- Game metadata (name, description, status)
- Images and screenshots
- Configuration (affiliate rate, tip settings)
- Social links (Discord, Steam, Demo)
- Timestamps

## Usage Pattern

Each script:
- ✅ Has built-in mock data
- ✅ Loads configuration from environment
- ✅ Can be run directly with tsx
- ✅ Provides detailed console output
- ✅ Returns proper exit codes

## Examples

```bash
# Get game information
npx tsx src/callers/game/getGame.ts

# With specific API key
ONCADE_SDK_API_KEY=your_key ONCADE_GAME_ID=your_game npx tsx src/callers/game/getGame.ts
```

## Output Example

The script provides comprehensive information about your game:
- Game ID and basic info
- Status and visibility
- Affiliate configuration
- All image URLs
- Screenshots list
- Social/external links
- Creation and update timestamps
