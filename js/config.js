// ==================== API CONFIGURATION ====================
// Load environment variables from multiple sources

class APIConfig {
    constructor() {
        this.config = {};
        this.loadEnvironment();
    }

    loadEnvironment() {
        // Priority 1: Check localStorage (persisted from .env)
        const stored = localStorage.getItem('api_config');
        if (stored) {
            this.config = JSON.parse(stored);
            console.log('[Config] Loaded from localStorage');
            return;
        }

        // Priority 2: Check window object (if loaded via script)
        if (window.API_KEYS) {
            this.config = window.API_KEYS;
            localStorage.setItem('api_config', JSON.stringify(this.config));
            console.log('[Config] Loaded from window.API_KEYS');
            return;
        }

        // Priority 3: Load from .env file (try to fetch)
        this.loadFromEnvFile();
    }

    async loadFromEnvFile() {
        try {
            const response = await fetch('.env');
            if (response.ok) {
                const text = await response.text();
                const envVars = this.parseEnvFile(text);
                this.config = envVars;
                localStorage.setItem('api_config', JSON.stringify(envVars));
                console.log('[Config] Loaded from .env file');
            }
        } catch (error) {
            console.warn('[Config] Could not load .env file, using defaults');
        }
    }

    parseEnvFile(text) {
        const config = {};
        const lines = text.split('\n');
        lines.forEach(line => {
            if (line && !line.startsWith('#')) {
                const [key, ...valueParts] = line.split('=');
                const value = valueParts.join('=').trim();
                if (key && value) {
                    config[key.trim()] = value;
                }
            }
        });
        return config;
    }

    get(key, defaultValue = null) {
        return this.config[key] || defaultValue;
    }

    set(key, value) {
        this.config[key] = value;
        localStorage.setItem('api_config', JSON.stringify(this.config));
    }

    hasKey(key) {
        return !!(this.config[key] && this.config[key].length > 0);
    }
}

const apiConfig = new APIConfig();

// Legacy API_CONFIG object for backwards compatibility
const API_CONFIG = {
    flightAPI: {
        provider: 'rapidapi',
        apiKey: apiConfig.get('VITE_SKYSCANNER_API_KEY', ''),
        rapidApiHost: 'skyscanner44.p.rapidapi.com',
        baseUrl: 'https://skyscanner44.p.rapidapi.com/search',
    },
    weather: {
        apiKey: apiConfig.get('VITE_OPENWEATHER_API_KEY', ''),
        baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
    },
    chatbot: {
        apiKey: apiConfig.get('VITE_HUGGING_FACE_API_KEY', ''),
        modelId: 'gpt2',
        baseUrl: 'https://api-inference.huggingface.co/models/'
    },
    safety: {
        advisoryUrl: 'https://www.travel.state.gov/content/dam/students-abroad/json/travelwarnings.json',
        healthUrl: 'https://www.cdc.gov/covid-data-tracker/'
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
