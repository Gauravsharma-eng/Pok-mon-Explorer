// api-test.js - Test the backend API endpoints

const BASE_URL = 'http://localhost:5000';

// Color console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
};

function log(color, title, data) {
    console.log(`\n${color}${colors.bright}${title}${colors.reset}`);
    console.log(JSON.stringify(data, null, 2));
}

async function testAPI() {
    console.log(colors.blue + colors.bright + '🧪 Pokémon Explorer API Tests\n' + colors.reset);

    try {
        // Test 1: Health check
        log(colors.green, '✅ Test 1: Health Check', '');
        const health = await fetch(`${BASE_URL}/api/health`).then(r => r.json());
        console.log(health);

        // Test 2: Get single Pokémon
        log(colors.green, '✅ Test 2: Get Single Pokémon (Pikachu)', '');
        const pikachu = await fetch(`${BASE_URL}/api/pokemon/pikachu`).then(r => r.json());
        console.log({
            id: pikachu.id,
            name: pikachu.name,
            height: `${pikachu.height / 10}m`,
            weight: `${pikachu.weight / 10}kg`,
            types: pikachu.types.map(t => t.type.name),
        });

        // Test 3: Get by ID
        log(colors.green, '✅ Test 3: Get Pokémon by ID (ID: 25)', '');
        const pkm25 = await fetch(`${BASE_URL}/api/pokemon/25`).then(r => r.json());
        console.log({ id: pkm25.id, name: pkm25.name });

        // Test 4: Get all Pokémon (paginated)
        log(colors.green, '✅ Test 4: Get All Pokémon (Paginated)', '');
        const allPkm = await fetch(`${BASE_URL}/api/pokemon?limit=5&offset=0`).then(r => r.json());
        console.log({
            count: allPkm.count,
            results: allPkm.results.map(r => r.name),
        });

        // Test 5: Get by type
        log(colors.green, '✅ Test 5: Get Pokémon by Type (Fire)', '');
        const fireType = await fetch(`${BASE_URL}/api/type/fire`).then(r => r.json());
        console.log({
            type: fireType.name,
            pokemonCount: fireType.pokemon.length,
            firstFive: fireType.pokemon.slice(0, 5).map(p => p.pokemon.name),
        });

        // Test 6: Get all types
        log(colors.green, '✅ Test 6: Get All Types', '');
        const types = await fetch(`${BASE_URL}/api/types`).then(r => r.json());
        console.log({
            totalTypes: types.count,
            types: types.results.map(t => t.name),
        });

        // Test 7: Get generation
        log(colors.green, '✅ Test 7: Get Generation 1 (Kanto)', '');
        const gen1 = await fetch(`${BASE_URL}/api/generation/1`).then(r => r.json());
        console.log({
            generation: gen1.name,
            pokemonCount: gen1.pokemon_species.length,
            firstFive: gen1.pokemon_species.slice(0, 5).map(p => p.name),
        });

        // Test 8: Search
        log(colors.green, '✅ Test 8: Search Pokémon (Query: "pika")', '');
        const search = await fetch(`${BASE_URL}/api/search/pika`).then(r => r.json());
        console.log({
            query: 'pika',
            results: search.results.map(r => r.name),
        });

        log(colors.blue, '✨ All tests completed successfully!', '');

    } catch (error) {
        log(colors.red, '❌ Error during tests:', error.message);
    }
}

// Run tests
testAPI();
