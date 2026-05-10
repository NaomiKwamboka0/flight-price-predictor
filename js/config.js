// ==================== API CONFIGURATION ====================

const API_CONFIG = {
    // Flight Search API
    flightAPI: {
        // Using Skyscanner or RapidAPI endpoints
        // You'll need to get your own API key from: https://rapidapi.com/
        provider: 'rapidapi', // 'rapidapi', 'amadeus', or 'skyscanner'
        apiKey: 'YOUR_API_KEY_HERE', // Replace with your RapidAPI key
        rapidApiHost: 'skyscanner44.p.rapidapi.com',
        baseUrl: 'https://skyscanner44.p.rapidapi.com/search',
    },

    // Weather API (OpenWeatherMap)
    weather: {
        apiKey: 'YOUR_OPENWEATHERMAP_KEY', // Get from: https://openweathermap.org/api
        baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
    },

    // AI Chatbot API (Hugging Face)
    chatbot: {
        apiKey: 'YOUR_HUGGING_FACE_API_KEY', // Get from: https://huggingface.co/
        modelId: 'gpt2', // or use 'meta-llama/Llama-2-7b-chat-hf'
        baseUrl: 'https://api-inference.huggingface.co/models/'
    },

    // Safety/Travel Advisory APIs
    safety: {
        // Uses public APIs - no key needed for basic info
        advisoryUrl: 'https://www.travel.state.gov/content/dam/students-abroad/json/travelwarnings.json',
        healthUrl: 'https://www.cdc.gov/covid-data-tracker/' // CDC data
    }
};

// ==================== HELPER FUNCTIONS ====================

// Save search parameters to localStorage
function saveSearchParams(params) {
    localStorage.setItem('lastSearch', JSON.stringify(params));
}

// Get saved search parameters
function getLastSearch() {
    const saved = localStorage.getItem('lastSearch');
    return saved ? JSON.parse(saved) : null;
}

// Save flight data for price prediction
function saveFlightData(flights) {
    const timestamp = new Date().toISOString();
    const searchHistory = JSON.parse(localStorage.getItem('flightHistory') || '[]');
    
    const entry = {
        timestamp,
        flights: flights.slice(0, 10) // Save top 10
    };
    
    searchHistory.push(entry);
    // Keep only last 30 days of data
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const filteredHistory = searchHistory.filter(e => e.timestamp > thirtyDaysAgo);
    
    localStorage.setItem('flightHistory', JSON.stringify(filteredHistory));
}

// Format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Format time
function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Calculate flight duration
function calculateDuration(departTime, arriveTime) {
    const dept = new Date(departTime);
    const arrive = new Date(arriveTime);
    const diffMs = arrive - dept;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours === 0) {
        return `${diffMins}m`;
    }
    return `${diffHours}h ${diffMins}m`;
}

// Validate airport code
function isValidAirportCode(code) {
    return /^[A-Z]{3}$/.test(code.toUpperCase());
}

// Get minimum date (today)
function getMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export {
    API_CONFIG,
    saveSearchParams,
    getLastSearch,
    saveFlightData,
    formatCurrency,
    formatDate,
    formatTime,
    calculateDuration,
    isValidAirportCode,
    getMinDate
};
