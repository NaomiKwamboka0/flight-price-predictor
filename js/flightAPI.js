// ==================== FLIGHT API CLIENT ====================
// All real API calls go through our server-side proxy at /api/flights.
// The API key never reaches the browser, and CORS is no longer an issue.

class FlightAPIHandler {
    constructor() {
        this.cache = {};
        this.cacheExpiry = 60 * 60 * 1000; // 1h
        this.proxyEndpoint = '/api/flights';
    }

    cacheKey(params) {
        return `flight_${params.from}_${params.to}_${params.departDate}_${params.tripType || 'oneWay'}`;
    }

    async searchFlights(params) {
        const key = this.cacheKey(params);
        const cached = this.cache[key];
        if (cached && Date.now() - cached.time < this.cacheExpiry) {
            console.log('[FlightAPI] Cache hit');
            return cached.data;
        }

        const url = `${this.proxyEndpoint}?` + new URLSearchParams({
            from: params.from,
            to: params.to,
            date: params.departDate,
            adults: '1'
        }).toString();

        console.log('[FlightAPI] → GET', url);

        let response;
        try {
            response = await fetch(url, { headers: { Accept: 'application/json' } });
        } catch (err) {
            throw new ProxyError(
                'Could not reach /api/flights — is the backend deployed?',
                { networkError: err.message }
            );
        }

        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new ProxyError(
                body.error || `Proxy returned ${response.status}`,
                {
                    status: response.status,
                    detail: body.detail,
                    hint: body.hint
                }
            );
        }

        const flights = Array.isArray(body.flights) ? body.flights : [];
        this.cache[key] = { data: flights, time: Date.now() };
        return flights;
    }

    clearCache() {
        this.cache = {};
    }
}

class ProxyError extends Error {
    constructor(message, info = {}) {
        super(message);
        this.name = 'ProxyError';
        this.info = info;
    }
}

const flightAPIHandler = new FlightAPIHandler();
window.flightAPIHandler = flightAPIHandler;
window.FlightAPIHandler = FlightAPIHandler;
window.ProxyError = ProxyError;
console.log('[FlightAPI] Client ready. Proxy endpoint:', flightAPIHandler.proxyEndpoint);
