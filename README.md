# Pokémon Explorer 🚀

A comprehensive, feature-rich Pokémon exploration website built with modern web technologies.

## Features

### Frontend
- 🔍 **Search Functionality** - Search Pokémon by name or ID
- 📚 **Pokédex Browser** - Browse all Pokémon with pagination
- ⭐ **Favorites System** - Save your favorite Pokémon (stored in localStorage)
- 📊 **Detailed Stats** - View comprehensive stats with visual progress bars
- 🎨 **Modern UI** - Responsive design with beautiful gradients and animations
- 🏷️ **Type Badges** - Color-coded type system for easy identification

### Backend
- **Node.js/Express Server** - RESTful API for Pokémon data
- **CORS Support** - Cross-origin requests enabled
- **Pagination** - Efficient data loading
- **Search & Filter** - Advanced search capabilities
- **Error Handling** - Comprehensive error management

## Project Structure

```
pokemon/
├── index.html          # Main HTML page
├── style.css           # Responsive styling
├── script.js           # Frontend JavaScript
├── server.js           # Node.js backend
├── package.json        # Dependencies
├── README.md           # This file
└── public/
    └── images/         # Pokemon images directory (optional)
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   npm start
   ```

3. **Open in browser**
   ```
   http://localhost:5000
   ```

### Development Mode (with auto-reload)
```bash
npm install -g nodemon
npm run dev
```

## API Endpoints

### Get Pokémon
```
GET /api/pokemon/:identifier
```
Get a specific Pokémon by name or ID
- Example: `/api/pokemon/pikachu` or `/api/pokemon/25`

### List All Pokémon
```
GET /api/pokemon?limit=150&offset=0
```
Get paginated list of Pokémon

### Get by Type
```
GET /api/type/:type
```
Get all Pokémon of a specific type
- Example: `/api/type/fire`

### Get All Types
```
GET /api/types
```
Get all available types

### Get by Generation
```
GET /api/generation/:id
```
Get all Pokémon from a specific generation

### Search
```
GET /api/search/:query
```
Search Pokémon by query

### Health Check
```
GET /api/health
```
Server status check

## Usage

### Search for Pokémon
1. Go to **Home** section
2. Enter Pokémon name or ID in the search bar
3. Click **Search** or press Enter
4. View detailed stats, types, and information
5. Click **Add to Favorites** to save

### Browse Pokédex
1. Click **Pokédex** in navigation
2. Browse through pages of Pokémon
3. Click on any Pokémon card to view details
4. Use filters to narrow down results

### View Favorites
1. Click **Favorites** in navigation
2. See all your saved Pokémon
3. Click to view details or remove from favorites

## Data Source

This application uses the **PokéAPI** (https://pokeapi.co/) for all Pokémon data:
- Complete Pokémon information
- Stats and abilities
- Types and classifications
- Sprites and images

## Technologies Used

### Frontend
- HTML5
- CSS3 (Grid, Flexbox, Gradients)
- Vanilla JavaScript (ES6+)
- LocalStorage API

### Backend
- Node.js
- Express.js
- Axios (HTTP client)
- CORS middleware

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features in Development
- Advanced filtering by type, generation, stats
- Pokémon comparison tool
- Team builder
- Evolution chains
- Move database
- Ability information

## Troubleshooting

### Server won't start
- Ensure port 5000 is not in use
- Check Node.js installation: `node --version`
- Check npm installation: `npm --version`

### Pokémon images not loading
- Check internet connection (fetching from PokéAPI)
- Server may be rate-limited; wait a moment and refresh

### Favorites not saving
- Clear browser cache and try again
- Check if localStorage is enabled

## Contributing
Feel free to fork and submit pull requests!

## License
MIT License - feel free to use this project for personal or commercial use.

## Credits
- **Data**: [PokéAPI](https://pokeapi.co/) - Comprehensive Pokémon database
- **Images**: Official Pokémon sprites from PokéAPI
- **Icons**: Pokémon Trainer inspired design

---

**Enjoy exploring Pokémon! 🎮**
