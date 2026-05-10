// ==================== API CONFIGURATION ====================
// This file stores API keys and configuration
// For production, consider using environment variables with a build process

const API_KEYS = {
    // Skyscanner API (RapidAPI)
    VITE_SKYSCANNER_API_KEY: 'ec104fd914msh5d83f016ffdfcd3p1a5103jsn8da41c54678d',
    VITE_SKYSCANNER_API_HOST: 'skyscanner44.p.rapidapi.com',
    
    // Amadeus API (get key at https://developers.amadeus.com/)
    VITE_AMADEUS_API_KEY: '',
    VITE_AMADEUS_API_SECRET: '',
    
    // Kiwi.com API (get key at https://tequila.kiwi.com/)
    VITE_KIWI_API_KEY: '',
    
    // Kayak API (via RapidAPI)
    VITE_KAYAK_API_KEY: '',
    
    // SerpAPI (Google Flights - get key at https://serpapi.com/)
    VITE_SERPAPI_KEY: '',
    
    // Weather API
    VITE_OPENWEATHER_API_KEY: '',
    
    // AI APIs
    VITE_HUGGING_FACE_API_KEY: '',
    VITE_OPENAI_API_KEY: '',
    
    // Firebase Configuration
    FIREBASE_API_KEY: 'AIzaSyCFd7mrGybVT84NDI6OKcWMoS9EErgQkgs',
    FIREBASE_AUTH_DOMAIN: 'flight-prediction-9ab7b.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'flight-prediction-9ab7b',
    FIREBASE_STORAGE_BUCKET: 'flight-prediction-9ab7b.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '1234567890',
    FIREBASE_APP_ID: '1:1234567890:web:1234567890abcdef'
};

// Export for use in other modules
window.API_KEYS = API_KEYS;

// Make keys accessible to the apiConfig Map object
if (typeof apiConfig !== 'undefined' && apiConfig instanceof Map) {
    Object.entries(API_KEYS).forEach(([key, value]) => {
        apiConfig.set(key, value);
    });
}

console.log('[API Config] Loaded API configuration');
console.log('[API Config] Skyscanner API:', API_KEYS.VITE_SKYSCANNER_API_HOST ? 'Configured' : 'Missing');
console.log('[API Config] Amadeus API:', API_KEYS.VITE_AMADEUS_API_KEY ? 'Configured' : 'Missing');
