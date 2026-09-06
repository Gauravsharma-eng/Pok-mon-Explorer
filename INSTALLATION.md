## 🎮 Pokémon Explorer - Complete Documentation

### 📋 Table of Contents
1. [Getting Started](#getting-started)
2. [Website Features](#website-features)
3. [Backend API](#backend-api)
4. [File Structure](#file-structure)
5. [Development](#development)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Installation Steps

**1. Prerequisites:**
- Node.js 14+ ([Download](https://nodejs.org/))
- npm (comes with Node.js)

**2. Setup (Choose One):**

**Option A: Automated Setup (Windows)**
```cmd
setup.bat
```

**Option B: Automated Setup (Mac/Linux)**
```bash
chmod +x setup.sh
./setup.sh
```

**Option C: Manual Setup**
```bash
# Navigate to project directory
cd d:\pokemon

# Install dependencies
npm install

# Start server
npm start

# Open browser to http://localhost:5000
```

**3. First Run:**
- Visit `http://localhost:5000` in your browser
- Try searching "pikachu"
- Explore the Pokédex
- Add favorites

---

## 🌟 Website Features

### 1. **Home - Search & Details**
- 🔍 Search Pokémon by name (e.g., "pikachu") or ID (e.g., "25")
- 📊 View comprehensive stats with visual progress bars
- 🏷️ See type classification with color-coded badges
- 📏 Check height, weight, and other metrics
- ⭐ Add to favorites for quick access

**Popular Searches:**
```
pikachu          → Electric starter
charizard        → Fire evolution
gengar           → Ghost type
dragonite        → Dragon type powerhouse
alakazam         → Psychic type genius
```

### 2. **Pokédex - Browse All**
- 📚 View all 150+ Pokémon in first generation
- 📄 Pagination (20 Pokémon per page)
- 🔗 Click any card to view full details
- 🎯 Extensible filtering system
- ⚙️ Generation selector (extensible)

### 3. **Favorites - Your Collection**
- ⭐ Save favorite Pokémon permanently (browser storage)
- 📱 Persistent across browser sessions
- 🗑️ Remove from favorites anytime
- 🎯 Quick access to your favorites

### 4. **Responsive Design**
- 📱 Mobile-friendly layout
- 💻 Desktop optimized
- 🖥️ Tablet support
- ♿ Accessible navigation

---

## 🔌 Backend API

### Starting the Server

```bash
npm start
# Server running at http://localhost:5000
```

### API Testing

**Option 1: Using Node.js Test Script**
```bash
npm start &    # Start server in background
node api-test.js
```

**Option 2: Using curl**
```bash
curl http://localhost:5000/api/pokemon/pikachu
```

**Option 3: Using Postman**
- Import API endpoints into Postman
- Test each endpoint interactively

### Available Endpoints

#### 1. Get Single Pokémon
```
GET /api/pokemon/:identifier
```
**Parameters:**
- `identifier` - Pokémon name or ID (e.g., "pikachu" or "25")

**Example:**
```bash
curl http://localhost:5000/api/pokemon/charizard
```

**Response:**
```json
{
  "id": 6,
  "name": "charizard",
  "height": 17,
  "weight": 905,
  "sprites": { "front_default": "..." },
  "types": [
    { "type": { "name": "fire" } },
    { "type": { "name": "flying" } }
  ],
  "stats": [ ... ]
}
```

#### 2. Get All Pokémon
```
GET /api/pokemon?limit=20&offset=0
```
**Query Parameters:**
- `limit` - Number of results (default: 150)
- `offset` - Starting position (default: 0)

**Example:**
```bash
curl "http://localhost:5000/api/pokemon?limit=10&offset=0"
```

#### 3. Get Pokémon by Type
```
GET /api/type/:type
```
**Parameters:**
- `type` - Pokémon type (e.g., "fire", "water", "grass")

**Example:**
```bash
curl http://localhost:5000/api/type/water
```

#### 4. Get All Types
```
GET /api/types
```
**Example:**
```bash
curl http://localhost:5000/api/types
```

#### 5. Get by Generation
```
GET /api/generation/:id
```
**Parameters:**
- `id` - Generation number (1-8)

**Example:**
```bash
curl http://localhost:5000/api/generation/1
```

#### 6. Search Pokémon
```
GET /api/search/:query
```
**Parameters:**
- `query` - Search term

**Example:**
```bash
curl http://localhost:5000/api/search/pika
```

#### 7. Health Check
```
GET /api/health
```
**Example:**
```bash
curl http://localhost:5000/api/health
```

---

## 📁 File Structure

```
pokemon/
│
├── 📄 index.html                 # Main HTML page
│   ├── Navigation bar
│   ├── Home section with search
│   ├── Pokédex section
│   └── Favorites section
│
├── 🎨 style.css                  # Styling (400+ lines)
│   ├── Navbar styles
│   ├── Responsive grid layouts
│   ├── Type badges colors
│   ├── Animations and transitions
│   └── Mobile breakpoints
│
├── 🎯 script.js                  # Frontend JavaScript (2000+ lines)
│   ├── Navigation functions
│   ├── Pokemon fetching & display
│   ├── Favorites management
│   ├── Search functionality
│   ├── Pagination logic
│   └── LocalStorage integration
│
├── 🚀 server.js                  # Backend server (150+ lines)
│   ├── Express app setup
│   ├── API endpoints
│   ├── Error handling
│   ├── CORS configuration
│   └── Static file serving
│
├── 📦 package.json               # Project dependencies
│   ├── express
│   ├── cors
│   ├── axios
│   └── nodemon (dev)
│
├── 📖 README.md                  # Full documentation
├── 🚀 QUICKSTART.md              # Quick start guide
├── 📊 PROJECT_SUMMARY.md         # This project overview
├── 📝 INSTALLATION.md            # Setup instructions
│
├── ⚙️ .env.example               # Environment variables template
├── 🔒 .gitignore                 # Git ignore patterns
│
├── 🐧 setup.sh                   # Unix setup script
├── 🪟 setup.bat                  # Windows setup script
├── 🧪 api-test.js                # API testing script
│
└── 📁 public/
    └── 🖼️ images/
        └── README.md             # Images directory guide
```

---

## 👨‍💻 Development

### Development Mode with Auto-Reload

```bash
# Install nodemon globally
npm install -g nodemon

# Start server with auto-reload
npm run dev
```

### Making Code Changes

**Frontend Changes:**
- Edit `index.html` for HTML structure
- Edit `style.css` for styling
- Edit `script.js` for JavaScript logic
- Refresh browser to see changes

**Backend Changes:**
- Edit `server.js` for API endpoints
- Server auto-reloads if using `npm run dev`
- Test with `npm run test:api` or curl

### Adding New Features

**Example: Adding a new API endpoint**

```javascript
// In server.js
app.get('/api/custom/:param', async (req, res) => {
    try {
        const result = await someFunction(req.params.param);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Custom error message' });
    }
});
```

**Example: Adding a new frontend section**

```html
<!-- In index.html -->
<section id="customSection" class="section">
    <h2>Custom Section</h2>
    <!-- Content here -->
</section>
```

```javascript
// In script.js
function showCustom() {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('customSection').classList.add('active');
}
```

---

## 🐛 Troubleshooting

### Server Issues

**Problem:** Port 5000 already in use
```bash
# Use different port
PORT=3000 npm start
```

**Problem:** npm install fails
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

**Problem:** Node modules corrupted
```bash
# Remove and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Issues

**Problem:** Images not loading
- Check internet connection
- Try refreshing the page
- PokéAPI might be rate-limiting

**Problem:** Search not working
- Ensure server is running
- Check browser console for errors
- Verify Pokémon name spelling

**Problem:** Favorites not persisting
- Check if localStorage is enabled
- Clear browser cache
- Try incognito mode to test

### API Issues

**Problem:** API returns 404
- Check endpoint spelling
- Verify Pokémon name/ID exists
- Ensure server is running on port 5000

**Problem:** CORS errors
- Server has CORS enabled
- Check browser console for details
- Try accessing via curl to isolate issue

**Problem:** Slow API responses
- PokéAPI might be slow
- Check internet connection
- Try again in a few moments

---

## 🔧 Configuration

### Environment Variables (.env)
```env
NODE_ENV=development
PORT=5000
POKE_API_BASE=https://pokeapi.co/api/v2
CORS_ORIGIN=*
```

### Using Custom .env
```bash
# Create .env from template
cp .env.example .env

# Edit .env with your values
nano .env

# Restart server
npm start
```

---

## 📊 Performance Tips

1. **Caching:** Browser caches Pokémon data automatically
2. **Pagination:** Only loads 20 Pokémon at a time
3. **Lazy Loading:** Images load on demand
4. **Optimization:** Use minified files in production

---

## 🌐 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to Vercel (Frontend only)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [PokéAPI Docs](https://pokeapi.co/docs/v2)
- [JavaScript MDN](https://developer.mozilla.org/docs/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## 📞 Support

For issues or questions:
1. Check the [README.md](README.md)
2. Review [QUICKSTART.md](QUICKSTART.md)
3. Check browser console for errors
4. Test API with `node api-test.js`

---

**Happy Pokémon exploring! 🎮⚡**
