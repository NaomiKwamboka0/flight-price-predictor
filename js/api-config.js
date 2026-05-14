// ==================== API CONFIGURATION ====================
// This file stores API keys and configuration
// For production, consider using environment variables with a build process

// SECURITY: Server-side API keys (Skyscanner, Amadeus, Kiwi, etc.) are NOT in
// this file anymore. They live in Vercel environment variables and are only
// read by /api/flights.js on the server. Anything left here is shipped to the
// browser and is therefore PUBLIC — only put public/restricted-by-domain keys
// (e.g. Firebase web SDK keys, which are safe by design) below.
const API_KEYS = {
    // The frontend now hits /api/flights (our serverless proxy) instead of
    // RapidAPI directly. We just need a flag so flightAPI.js knows the
    // proxy is available.
    USE_PROXY: true,

    // Firebase web SDK keys are safe to expose — they identify the project,
    // and access is restricted by Firebase Security Rules + Auth domain allowlist.
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

console.log('[API Config] Loaded — flight search routes through /api/flights (server-side).');
