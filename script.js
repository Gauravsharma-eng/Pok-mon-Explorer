// Get high-quality Pokemon image URLs
function getPokemonImageUrl(pokemonId) {
    // Try official artwork first (best quality)
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}

function getPokemonCardImageUrl(pokemonId) {
    // Fallback: regular sprite
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
}

// State management
let currentPage = 0;
let allPokemon = [];
const favoritesKey = 'pokemonFavorites';
const itemsPerPage = 20;

// Chatbot state
let chatbotMessages = [];
const chatbotResponses = {
    greeting: [
        "Hey there, Pokémon trainer! 👋 Welcome to Pokémon Explorer. What would you like to know?",
        "Greetings! I'm your Pokémon Assistant. How can I help you today?",
        "Welcome! Ready to explore the world of Pokémon? 🌟"
    ],
    help: [
        "I can help you with:\n• Search for specific Pokémon by name or ID\n• Learn about Pokémon types and stats\n• Get information about your favorite Pokémon\n• Browse the Pokédex\n\nWhat would you like to know?",
        "You can ask me about:\n• Any Pokémon's stats, types, and abilities\n• Famous Pokémon like Pikachu, Charizard, etc.\n• Pokémon types and their characteristics\n• Tips on the app features\n\nWhat interests you?"
    ],
    notFound: [
        "I'm not sure about that. Try asking about a specific Pokémon or type! 🔍",
        "I couldn't find information about that. Want to search for a Pokémon instead?",
        "Hmm, I'm not familiar with that topic. Ask me about your favorite Pokémon! 😊"
    ],
    pokemon: [
        "Great choice! {pokemon} is awesome! 🌟",
        "Ah yes, {pokemon}! One of the favorites! 💪",
        "{pokemon} is a fantastic Pokémon! 🎉"
    ],
    type: [
        "{type}-type Pokémon are known for their unique characteristics! Would you like to know about specific {type}-types?",
        "Ah, {type}-types! They have fascinating abilities. Want more details?"
    ],
    fun: [
        "Did you know? Pikachu has appeared in every main Pokémon game! ⚡",
        "Fun fact: Pokémon was first released in 1996! 🎮",
        "Interesting: Charizard can fly at speeds up to 30,000 feet! 🔥",
        "Cool fact: There are over 1,000 different Pokémon species! 🌍"
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    initializeChatbot();
});

// Navigation functions
function showHome() {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('homeSection').classList.add('active');
}

function showPokedex() {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('pokedexSection').classList.add('active');
    loadPokedex();
}

function showFavorites() {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('favoritesSection').classList.add('active');
    displayFavorites();
}

// Search function
async function fetchPokemon() {
    const input = document.getElementById('pokemonInput').value.toLowerCase().trim();
    if (!input) {
        document.getElementById('pokemonDisplay').innerHTML = '<div class="placeholder">Enter a Pokémon name or ID</div>';
        return;
    }
    
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
        if (!response.ok) throw new Error('Not found');
        
        const data = await response.json();
        displayPokemonDetail(data);
    } catch (error) {
        document.getElementById('pokemonDisplay').innerHTML = '<div class="placeholder">❌ Pokémon not found! Try another name.</div>';
    }
}

function handleSearch() {
    const input = document.getElementById('pokemonInput').value;
    if (input.length > 2) {
        fetchPokemon();
    }
}

// Display Pokemon details
function displayPokemonDetail(data) {
    const isFavorite = checkIfFavorite(data.id);
    
    const typesBadges = data.types.map(type => 
        `<span class="type-badge type-${type.type.name}">${type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>`
    ).join('');

    const statsHtml = data.stats.map(stat => {
        const maxStat = 255;
        const percentage = (stat.base_stat / maxStat) * 100;
        return `
            <div class="stat">
                <strong>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</strong>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span>${stat.base_stat}</span>
                </div>
            </div>
        `;
    }).join('');

    const display = document.getElementById('pokemonDisplay');
    display.innerHTML = `
        <div class="pokemon-info">
            <div class="pokemon-image-section">
                <img src="${getPokemonImageUrl(data.id)}" alt="${data.name}" class="pokemon-sprite" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png'">
                <button class="btn-favorite" onclick="toggleFavorite(${data.id}, '${data.name}')">${isFavorite ? '⭐ Unfavorite' : '☆ Add to Favorites'}</button>
            </div>
            <div class="pokemon-details">
                <h2>#${data.id} ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <p><strong>Height:</strong> ${(data.height / 10).toFixed(1)} m</p>
                <p><strong>Weight:</strong> ${(data.weight / 10).toFixed(1)} kg</p>
                <p><strong>Types:</strong></p>
                <div class="types">${typesBadges}</div>
                <h3 style="margin-top: 1.5rem; margin-bottom: 1rem;">Base Stats</h3>
                <div class="stats">${statsHtml}</div>
            </div>
        </div>
    `;
}

// Pokedex loading
async function loadPokedex() {
    try {
        if (allPokemon.length === 0) {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');
            const data = await response.json();
            allPokemon = data.results;
        }
        displayPokedexPage();
    } catch (error) {
        console.error('Error loading Pokédex:', error);
    }
}

function displayPokedexPage() {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = allPokemon.slice(start, end);

    let html = '';
    pageItems.forEach((pokemon, index) => {
        const pokemonId = start + index + 1;
        const imageUrl = getPokemonImageUrl(pokemonId);
        const fallbackUrl = getPokemonCardImageUrl(pokemonId);
        
        html += `
            <div class="pokemon-card" onclick="searchAndDisplay('${pokemon.name}')">
                <div class="pokemon-card-image">
                    <img src="${imageUrl}" alt="${pokemon.name}" onerror="this.src='${fallbackUrl}'">
                </div>
                <div class="pokemon-card-content">
                    <h3>#${pokemonId}</h3>
                    <p>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                </div>
            </div>
        `;
    });

    document.getElementById('pokedexGrid').innerHTML = html;
    document.getElementById('pageInfo').innerText = `Page ${currentPage + 1} of ${Math.ceil(allPokemon.length / itemsPerPage)}`;
}

function nextPage() {
    const maxPages = Math.ceil(allPokemon.length / itemsPerPage);
    if (currentPage < maxPages - 1) {
        currentPage++;
        displayPokedexPage();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayPokedexPage();
    }
}

function loadGeneration() {
    currentPage = 0;
    loadPokedex();
}

function filterPokedex() {
    const filter = document.getElementById('filterType').value.toLowerCase();
    // Implement type filtering here
}

async function searchAndDisplay(name) {
    document.getElementById('pokemonInput').value = name;
    showHome();
    await fetchPokemon();
}

// Quick search function
function quickSearch(name) {
    searchAndDisplay(name);
}

// Favorites management
function toggleFavorite(id, name) {
    let favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    const index = favorites.findIndex(f => f.id === id);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push({ id, name });
    }
    
    localStorage.setItem(favoritesKey, JSON.stringify(favorites));
    fetchPokemon(); // Refresh to update button
}

function checkIfFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    return favorites.some(f => f.id === id);
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem(favoritesKey) || '[]');
    return favorites;
}

async function displayFavorites() {
    const favorites = loadFavorites();
    
    if (favorites.length === 0) {
        document.getElementById('favoritesList').innerHTML = '<div class="placeholder"><div class="placeholder-icon">💔</div><p>No favorites yet! Add some Pokémon to your favorites.</p></div>';
        return;
    }

    let html = '';
    for (const fav of favorites) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${fav.id}`);
            const data = await response.json();
            const imageUrl = getPokemonImageUrl(data.id);
            const fallbackUrl = getPokemonCardImageUrl(data.id);
            
            html += `
                <div class="pokemon-card" onclick="searchAndDisplay('${data.name}')">
                    <div class="pokemon-card-image">
                        <img src="${imageUrl}" alt="${data.name}" onerror="this.src='${fallbackUrl}'">
                    </div>
                    <div class="pokemon-card-content">
                        <h3>#${data.id}</h3>
                        <p>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
                        <button class="btn-favorite" onclick="event.stopPropagation(); toggleFavorite(${data.id}, '${data.name}')">Remove</button>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error loading favorite:', error);
        }
    }
    
    document.getElementById('favoritesList').innerHTML = html;
}
// ========== CHATBOT FUNCTIONS ==========

function initializeChatbot() {
    const messagesContainer = document.getElementById('chatbotMessages');
    messagesContainer.innerHTML = '';
    chatbotMessages = [];
    
    // Send welcome message
    const greeting = chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
    addChatMessage(greeting, 'bot');
}

function toggleChatbot() {
    const window = document.getElementById('chatbotWindow');
    window.classList.toggle('hidden');
    if (!window.classList.contains('hidden')) {
        document.getElementById('chatbotInput').focus();
    }
}

function closeChatbot() {
    document.getElementById('chatbotWindow').classList.add('hidden');
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = message;
    
    messageDiv.appendChild(bubble);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    chatbotMessages.push({ message, sender });
}

function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Generate bot response
    setTimeout(() => {
        const response = generateChatbotResponse(message);
        addChatMessage(response, 'bot');
    }, 300);
}

function generateChatbotResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Check for greeting
    if (msg.match(/^(hi|hello|hey|greetings|howdy)/)) {
        return chatbotResponses.greeting[Math.floor(Math.random() * chatbotResponses.greeting.length)];
    }
    
    // Check for help
    if (msg.match(/(help|what can you do|capabilities|features)/)) {
        return chatbotResponses.help[Math.floor(Math.random() * chatbotResponses.help.length)];
    }
    
    // Check for popular Pokemon
    const popularPokemon = ['pikachu', 'charizard', 'blastoise', 'venusaur', 'dragonite', 'alakazam', 
                            'arcanine', 'lapras', 'machamp', 'golem', 'arbok', 'gengar', 'articuno', 
                            'zapdos', 'moltres', 'mewtwo', 'mew'];
    if (popularPokemon.some(pokemon => msg.includes(pokemon))) {
        const found = popularPokemon.find(pokemon => msg.includes(pokemon));
        const response = chatbotResponses.pokemon[Math.floor(Math.random() * chatbotResponses.pokemon.length)];
        return response.replace('{pokemon}', found.charAt(0).toUpperCase() + found.slice(1));
    }
    
    // Check for types
    const types = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 
                   'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
    if (types.some(type => msg.includes(type))) {
        const found = types.find(type => msg.includes(type));
        const response = chatbotResponses.type[Math.floor(Math.random() * chatbotResponses.type.length)];
        return response.replace('{type}', found.charAt(0).toUpperCase() + found.slice(1));
    }
    
    // Check for fun fact
    if (msg.match(/(fun fact|did you know|interesting|cool|amazing)/)) {
        return chatbotResponses.fun[Math.floor(Math.random() * chatbotResponses.fun.length)];
    }
    
    // Check for search intent
    if (msg.match(/(search|find|look for|show me)/)) {
        const nameMatch = msg.match(/(search|find|look for|show me)\s+(?:for\s+)?([a-z\s]+)/i);
        if (nameMatch && nameMatch[2]) {
            const pokemonName = nameMatch[2].trim();
            return `Let me help you find ${pokemonName}! You can search for it using the search bar on the home page. Would you like me to help with anything else about Pokémon? 🔍`;
        }
        return "I can help you search! Try asking me about a specific Pokémon name or type, and I'll guide you through finding it! 🔍";
    }
    
    // Default responses
    const defaultResponses = [
        "That's interesting! 🤔 Want to know about a specific Pokémon instead?",
        "I'm still learning! 📚 Ask me about your favorite Pokémon or Pokémon types!",
        "Great question! 💡 Try searching for a Pokémon or asking about types!",
        "Hmm, I'm not sure about that. How about we explore some Pokémon together? 🌟"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}