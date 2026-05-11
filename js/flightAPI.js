// ==================== MULTI-FLIGHT API HANDLER ====================
// This module handles multiple flight search APIs with fallback logic

class FlightAPIHandler {
    constructor() {
        this.apis = {
            skyscanner: null,
            amadeus: null,
            kiwi: null,
            kayak: null,
            serpapi: null
        };
        this.cache = {};
        this.cacheExpiry = 60 * 60 * 1000; // 1 hour
        this.initAPIs();
    }

    initAPIs() {
        // Initialize all available APIs
        this.apis.skyscanner = {
            enabled: !!this.getEnvVar('VITE_SKYSCANNER_API_KEY'),
            name: 'Skyscanner',
            priority: 1,
            handler: this.searchSkyscanner.bind(this)
        };

        this.apis.amadeus = {
            enabled: !!this.getEnvVar('VITE_AMADEUS_API_KEY'),
            name: 'Amadeus',
            priority: 2,
            handler: this.searchAmadeus.bind(this)
        };

        this.apis.kiwi = {
            enabled: !!this.getEnvVar('VITE_KIWI_API_KEY'),
            name: 'Kiwi.com',
            priority: 3,
            handler: this.searchKiwi.bind(this)
        };

        this.apis.kayak = {
            enabled: !!this.getEnvVar('VITE_KAYAK_API_KEY'),
            name: 'Kayak',
            priority: 4,
            handler: this.searchKayak.bind(this)
        };

        this.apis.serpapi = {
            enabled: !!this.getEnvVar('VITE_SERPAPI_KEY'),
            name: 'Google Flights (SerpAPI)',
            priority: 5,
            handler: this.searchSerpAPI.bind(this)
        };

        // Log which APIs are enabled
        const enabledAPIs = Object.values(this.apis).filter(api => api.enabled);
        console.log(`[APIHandler] Initialized. Enabled APIs: ${enabledAPIs.map(a => a.name).join(', ') || 'None (will use mock data)'}`);
    }

    getEnvVar(key) {
        // Load from multiple sources in priority order
        // 1. window.API_KEYS (from api-config.js)
        if (typeof window.API_KEYS !== 'undefined' && window.API_KEYS[key]) {
            return window.API_KEYS[key];
        }
        // 2. apiConfig (from config.js)
        if (typeof window.apiConfig !== 'undefined') {
            const value = window.apiConfig.get(key);
            if (value) return value;
        }
        // 3. localStorage
        const stored = localStorage.getItem(key);
        if (stored) return stored;
        // 4. window object (legacy)
        return window[key] || '';
    }

    getCacheKey(params) {
        return `flight_${params.from}_${params.to}_${params.departDate}_${params.tripType}`;
    }

    async searchFlights(params) {
        const cacheKey = this.getCacheKey(params);
        
        // Check cache
        if (this.cache[cacheKey] && Date.now() - this.cache[cacheKey].time < this.cacheExpiry) {
            console.log('[Cache] Using cached results');
            return this.cache[cacheKey].data;
        }

        console.log('[Search] Searching with multiple APIs...');
        const enabledAPIs = Object.values(this.apis)
            .filter(api => api.enabled)
            .sort((a, b) => a.priority - b.priority);

        if (enabledAPIs.length === 0) {
            throw new Error('No flight APIs configured. Please add API keys to .env file.');
        }

        let allFlights = [];
        const errors = [];

        // Try each API in priority order
        for (const api of enabledAPIs) {
            try {
                console.log(`[${api.name}] Searching...`);
                const flights = await api.handler(params);
                
                if (flights && flights.length > 0) {
                    console.log(`[${api.name}] Found ${flights.length} flights`);
                    // Add API source to each flight
                    flights.forEach(f => f.source = api.name);
                    allFlights = allFlights.concat(flights);
                    break; // Success - no need to try other APIs
                }
            } catch (error) {
                console.warn(`[${api.name}] Error:`, error.message);
                errors.push({ api: api.name, error: error.message });
            }
        }

        if (allFlights.length === 0) {
            throw new Error(`All flight APIs failed. Errors: ${errors.map(e => `${e.api}: ${e.error}`).join('; ')}`);
        }

        // Deduplicate and normalize
        allFlights = this.deduplicateFlights(allFlights);
        allFlights.sort((a, b) => a.price - b.price);

        // Cache results
        this.cache[cacheKey] = {
            data: allFlights,
            time: Date.now()
        };

        return allFlights;
    }

    // ==================== INDIVIDUAL API HANDLERS ====================

    async searchSkyscanner(params) {
        const apiKey = this.getEnvVar('VITE_SKYSCANNER_API_KEY');
        const apiHost = this.getEnvVar('VITE_SKYSCANNER_API_HOST');

        if (!apiKey) throw new Error('Skyscanner API key not configured');

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        };

        const searchParams = new URLSearchParams({
            adults: 1,
            cabinClass: 'economy',
            departDate: params.departDate,
            from: params.from,
            to: params.to
        });

        const response = await fetch(
            `https://${apiHost}/search?${searchParams}`,
            options
        );

        if (!response.ok) throw new Error(`Skyscanner API error: ${response.status}`);

        const data = await response.json();
        return this.normalizeSkyscannerResults(data, params);
    }

    async searchAmadeus(params) {
        const apiKey = this.getEnvVar('VITE_AMADEUS_API_KEY');
        const apiSecret = this.getEnvVar('VITE_AMADEUS_API_SECRET');

        if (!apiKey || !apiSecret) throw new Error('Amadeus credentials not configured');

        // Amadeus requires OAuth token first
        const tokenResponse = await fetch('https://api.amadeus.com/v1/security/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`
        });

        if (!tokenResponse.ok) throw new Error('Failed to get Amadeus token');

        const tokenData = await tokenResponse.json();
        const token = tokenData.access_token;

        // Search flights
        const response = await fetch(
            `https://api.amadeus.com/v2/shopping/flight-offers?` +
            `originLocationCode=${params.from}&` +
            `destinationLocationCode=${params.to}&` +
            `departureDate=${params.departDate}&` +
            `adults=1&` +
            `currencyCode=USD`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        );

        if (!response.ok) throw new Error(`Amadeus API error: ${response.status}`);

        const data = await response.json();
        return this.normalizeAmadeusResults(data, params);
    }

    async searchKiwi(params) {
        const apiKey = this.getEnvVar('VITE_KIWI_API_KEY');

        if (!apiKey) throw new Error('Kiwi.com API key not configured');

        const response = await fetch(
            `https://tequila-api.kiwi.com/v2/search?` +
            `fly_from=${params.from}&` +
            `fly_to=${params.to}&` +
            `date_from=${params.departDate}&` +
            `date_to=${params.departDate}&` +
            `adults=1&` +
            `curr=USD&` +
            `apikey=${apiKey}`
        );

        if (!response.ok) throw new Error(`Kiwi API error: ${response.status}`);

        const data = await response.json();
        return this.normalizeKiwiResults(data, params);
    }

    async searchKayak(params) {
        const apiKey = this.getEnvVar('VITE_KAYAK_API_KEY');

        if (!apiKey) throw new Error('Kayak API key not configured');

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'kayak.p.rapidapi.com'
            }
        };

        const response = await fetch(
            `https://kayak.p.rapidapi.com/flights?` +
            `outbound=${params.from}-${params.to}-${params.departDate}&` +
            `adults=1&` +
            `class=economy`,
            options
        );

        if (!response.ok) throw new Error(`Kayak API error: ${response.status}`);

        const data = await response.json();
        return this.normalizeKayakResults(data, params);
    }

    async searchSerpAPI(params) {
        const apiKey = this.getEnvVar('VITE_SERPAPI_KEY');

        if (!apiKey) throw new Error('SerpAPI key not configured');

        const response = await fetch(
            `https://serpapi.com/search?` +
            `engine=google_flights&` +
            `departure_id=${params.from}&` +
            `arrival_id=${params.to}&` +
            `outbound_date=${params.departDate}&` +
            `api_key=${apiKey}`
        );

        if (!response.ok) throw new Error(`SerpAPI error: ${response.status}`);

        const data = await response.json();
        return this.normalizeSerpAPIResults(data, params);
    }

    // ==================== RESULT NORMALIZATION ====================

    normalizeSkyscannerResults(data, params) {
        if (!data.itineraries || !data.legs) return [];

        return data.itineraries.slice(0, 20).map(itinerary => {
            const outbound = data.legs[itinerary.legIds[0]];
            const price = itinerary.pricingOptions[0]?.price?.amount || 0;

            return {
                id: `skyscanner_${itinerary.id}`,
                airline: outbound.operating.name || outbound.marketing.name || 'Unknown',
                airlineCode: outbound.operating.id || '',
                price: Math.round(price),
                currency: 'USD',
                departure: {
                    airport: params.from,
                    time: outbound.departure,
                    terminal: null
                },
                arrival: {
                    airport: params.to,
                    time: outbound.arrival,
                    terminal: null
                },
                duration: this.calculateDuration(outbound.departure, outbound.arrival),
                stops: outbound.stops.length,
                bookingUrl: itinerary.pricingOptions[0]?.items[0]?.agent?.url || '#',
                amenities: { baggage: '1-2 bags', meal: false, wifi: false },
                rating: 4.0
            };
        });
    }

    normalizeAmadeusResults(data, params) {
        if (!data.data) return [];

        return data.data.slice(0, 20).map(offer => {
            const segment = offer.itineraries[0].segments[0];
            const price = parseFloat(offer.price.total);

            return {
                id: `amadeus_${offer.id}`,
                airline: segment.operating?.carrierCode || segment.carrierCode || 'Unknown',
                airlineCode: segment.carrierCode,
                price: Math.round(price),
                currency: offer.price.currency,
                departure: {
                    airport: segment.departure.iataCode,
                    time: segment.departure.at,
                    terminal: segment.departure.terminal || null
                },
                arrival: {
                    airport: segment.arrival.iataCode,
                    time: segment.arrival.at,
                    terminal: segment.arrival.terminal || null
                },
                duration: offer.itineraries[0].duration.replace('PT', ''),
                stops: offer.itineraries[0].segments.length - 1,
                bookingUrl: '#',
                amenities: { baggage: '1-2 bags', meal: false, wifi: false },
                rating: 4.0
            };
        });
    }

    normalizeKiwiResults(data, params) {
        if (!data.data) return [];

        return data.data.slice(0, 20).map(flight => ({
            id: `kiwi_${flight.id}`,
            airline: flight.airline_name || 'Unknown',
            airlineCode: flight.airlines[0] || '',
            price: Math.round(flight.price),
            currency: 'USD',
            departure: {
                airport: params.from,
                time: new Date(flight.local_departure * 1000).toISOString(),
                terminal: null
            },
            arrival: {
                airport: params.to,
                time: new Date(flight.local_arrival * 1000).toISOString(),
                terminal: null
            },
            duration: this.secondsToDuration(flight.duration),
            stops: flight.transfers,
            bookingUrl: flight.links?.booking || '#',
            amenities: { baggage: '1 bag', meal: false, wifi: false },
            rating: 4.0
        }));
    }

    normalizeKayakResults(data, params) {
        // Kayak results structure varies - implement based on actual response
        if (!data.flights) return [];
        
        return data.flights.slice(0, 20).map(flight => ({
            id: `kayak_${flight.id}`,
            airline: flight.airline || 'Unknown',
            airlineCode: '',
            price: Math.round(flight.price),
            currency: 'USD',
            departure: {
                airport: params.from,
                time: flight.departure_time,
                terminal: null
            },
            arrival: {
                airport: params.to,
                time: flight.arrival_time,
                terminal: null
            },
            duration: flight.duration,
            stops: flight.stops || 0,
            bookingUrl: flight.booking_url || '#',
            amenities: { baggage: '1-2 bags', meal: false, wifi: false },
            rating: 4.0
        }));
    }

    normalizeSerpAPIResults(data, params) {
        if (!data.flights) return [];

        return data.flights.slice(0, 20).map(flight => ({
            id: `serpapi_${flight.flight_number}`,
            airline: flight.airline || 'Unknown',
            airlineCode: '',
            price: Math.round(flight.price.split('$')[1]),
            currency: 'USD',
            departure: {
                airport: params.from,
                time: flight.departure_time,
                terminal: null
            },
            arrival: {
                airport: params.to,
                time: flight.arrival_time,
                terminal: null
            },
            duration: flight.duration,
            stops: flight.stops || 0,
            bookingUrl: `https://www.google.com/flights?hl=en#search;f=${params.from};t=${params.to};d=${params.departDate}`,
            amenities: { baggage: '1-2 bags', meal: false, wifi: false },
            rating: 4.0
        }));
    }

    // ==================== UTILITY METHODS ====================

    deduplicateFlights(flights) {
        const seen = new Set();
        return flights.filter(flight => {
            const key = `${flight.airline}_${flight.departure.airport}_${flight.arrival.airport}_${flight.departure.time}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    calculateDuration(departure, arrival) {
        const dept = new Date(departure);
        const arr = new Date(arrival);
        const diffMs = arr - dept;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return diffHours > 0 ? `${diffHours}h ${diffMins}m` : `${diffMins}m`;
    }

    secondsToDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${mins}m`;
    }

    clearCache() {
        this.cache = {};
    }
}

// Export singleton
const flightAPIHandler = new FlightAPIHandler();

// Make it globally accessible
window.flightAPIHandler = flightAPIHandler;

console.log('[FlightAPI] Handler initialized and exposed to window');
console.log('[FlightAPI] Checking API configuration...');
console.log('[FlightAPI] Skyscanner key available:', !!flightAPIHandler.getEnvVar('VITE_SKYSCANNER_API_KEY'));
console.log('[FlightAPI] Enabled APIs:', Object.values(flightAPIHandler.apis).filter(a => a.enabled).map(a => a.name).join(', ') || 'None - will use mock data');
