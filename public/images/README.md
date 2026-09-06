# Pokemon Images Directory

This directory is for storing local Pokémon image assets.

## Image Naming Convention
- Use format: `{pokemon-name}.png` for single image
- Example: `pikachu.png`, `charizard.png`

## Image Sources
- **Online Source**: PokéAPI provides sprites at runtime
- **Local Assets**: You can add custom images here

## Directory Structure
```
public/
├── images/
│   ├── pokemon/      # Official Pokémon sprites
│   ├── types/        # Type icons
│   ├── stats/        # Stat visualizations
│   └── ui/           # UI elements
```

## Usage in Code
```javascript
// Fetch from PokéAPI (used by default)
const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

// Or use local images
const localImage = `/public/images/pokemon/${pokemonName}.png`;
```

**Note**: Currently, images are fetched from PokéAPI at runtime for best performance and minimal storage.