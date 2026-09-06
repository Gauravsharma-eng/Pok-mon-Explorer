const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Base API URL
const POKE_API = 'https://pokeapi.co/api/v2';

// Routes

// Get single Pokémon by name or ID
app.get('/api/pokemon/:identifier', async (req, res) => {
    try {
        const identifier = req.params.identifier.toLowerCase();
        const response = await axios.get(`${POKE_API}/pokemon/${identifier}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Pokémon not found' });
    }
});

// Get all Pokémon (with pagination)
app.get('/api/pokemon', async (req, res) => {
    try {
        const limit = req.query.limit || 150;
        const offset = req.query.offset || 0;
        const response = await axios.get(`${POKE_API}/pokemon?limit=${limit}&offset=${offset}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Pokémon list' });
    }
});

// Get Pokémon by type
app.get('/api/type/:type', async (req, res) => {
    try {
        const type = req.params.type.toLowerCase();
        const response = await axios.get(`${POKE_API}/type/${type}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Type not found' });
    }
});

// Get all types
app.get('/api/types', async (req, res) => {
    try {
        const response = await axios.get(`${POKE_API}/type`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch types' });
    }
});

// Get Pokémon by generation
app.get('/api/generation/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`${POKE_API}/generation/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Generation not found' });
    }
});

// Get stats for comparison
app.get('/api/stats', async (req, res) => {
    try {
        const response = await axios.get(`${POKE_API}/stat`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Search Pokémon
app.get('/api/search/:query', async (req, res) => {
    try {
        const query = req.params.query.toLowerCase();
        const response = await axios.get(`${POKE_API}/pokemon?limit=1000&offset=0`);
        
        const filtered = response.data.results.filter(p => 
            p.name.includes(query) || p.url.includes(query)
        );
        
        res.json({ results: filtered.slice(0, 20) });
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!', timestamp: new Date() });
});

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Pokémon Server running on http://localhost:${PORT}`);
    console.log(`📚 API endpoints:`);
    console.log(`   GET  /api/pokemon/:identifier - Get Pokémon by name or ID`);
    console.log(`   GET  /api/pokemon - Get all Pokémon (paginated)`);
    console.log(`   GET  /api/type/:type - Get Pokémon by type`);
    console.log(`   GET  /api/types - Get all types`);
    console.log(`   GET  /api/generation/:id - Get Pokémon by generation`);
    console.log(`   GET  /api/search/:query - Search Pokémon`);
    console.log(`   GET  /api/health - Health check`);
});