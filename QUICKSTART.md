## 🚀 Quick Start Guide - Pokémon Explorer

### One-Line Setup (Windows)
```bash
setup.bat
npm start
```

### One-Line Setup (Mac/Linux)
```bash
chmod +x setup.sh
./setup.sh
npm start
```

### Manual Setup

1. **Install Node.js & npm**
   - Download from https://nodejs.org/
   - Verify: `node --version && npm --version`

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

4. **Open in Browser**
   ```
   http://localhost:5000
   ```

---

## 📱 Website Features

### 🏠 Home Page
- Search Pokémon by name or ID
- View detailed information
- Add to favorites

### 📚 Pokédex
- Browse all Pokémon
- Paginated view
- Click any Pokémon for details

### ⭐ Favorites
- Your saved Pokémon
- Stored locally in browser
- Remove favorites anytime

---

## 🔌 Backend API

### Test the API
```bash
# Get a Pokémon
curl http://localhost:5000/api/pokemon/pikachu

# Get all Pokémon
curl http://localhost:5000/api/pokemon?limit=20

# Get by type
curl http://localhost:5000/api/type/fire

# Search
curl http://localhost:5000/api/search/pika
```

---

## 📂 Project Files

| File | Purpose |
|------|---------|
| `index.html` | Main website page |
| `script.js` | Frontend functionality |
| `style.css` | Website styling |
| `server.js` | Backend API server |
| `package.json` | Dependencies config |
| `README.md` | Full documentation |

---

## 🐛 Troubleshooting

**Port 5000 is already in use?**
```bash
# Use different port
PORT=3000 npm start
```

**Dependencies won't install?**
```bash
npm cache clean --force
npm install
```

**Want to use nodemon (auto-reload)?**
```bash
npm install -g nodemon
npm run dev
```

---

## 💡 Tips

- **Favorites persist** even after closing the browser
- **No internet?** Some features won't work (relies on PokéAPI)
- **Images not showing?** Check your internet connection
- **Slow loading?** The PokéAPI might be rate-limiting requests

---

## 🎮 Example Searches

Try searching for:
- `pikachu` - Electric type starter
- `25` - Pokémon ID number
- `charizard` - Fire/Flying type
- `gengar` - Ghost/Poison type
- `dragonite` - Dragon/Flying type

---

**Enjoy exploring! 🎉**
