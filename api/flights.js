// ==================== /api/flights — Vercel Serverless Function ====================
// Server-side proxy to the "Skyscanner Flights & Travel API" on RapidAPI.
// Host: skyscanner-flights-travel-api.p.rapidapi.com
//
// Flow:
//   1. Resolve origin IATA → { skyId, entityId } via /flights/searchAirport
//   2. Resolve destination IATA → { skyId, entityId } via /flights/searchAirport
//   3. Call /flights/searchFlights with the resolved IDs
//   4. Normalize the response into the shape script.js expects
//
// Required env vars (Vercel → Settings → Environment Variables):
//   SKYSCANNER_API_KEY   — your RapidAPI key
//   SKYSCANNER_API_HOST  — optional, defaults to skyscanner-flights-travel-api.p.rapidapi.com
//
// Frontend usage:
//   GET /api/flights?from=NBO&to=MBA&date=2026-05-21&adults=1

const DEFAULT_HOST = 'skyscanner-flights-travel-api.p.rapidapi.com';

// In-memory airport lookup cache (warm between invocations on the same Lambda instance).
const airportCache = new Map();

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');

    const { from, to, date, adults = '1', returnDate, cabinClass = 'economy', currency = 'USD' } = req.query;

    if (!from || !to || !date) {
        return res.status(400).json({
            error: 'Missing required query params',
            required: ['from', 'to', 'date'],
            example: '/api/flights?from=NBO&to=MBA&date=2026-05-21'
        });
    }

    const fromCode = String(from).toUpperCase();
    const toCode = String(to).toUpperCase();

    if (!/^[A-Z]{3}$/.test(fromCode) || !/^[A-Z]{3}$/.test(toCode)) {
        return res.status(400).json({ error: '`from` and `to` must be 3-letter IATA codes' });
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date))) {
        return res.status(400).json({ error: '`date` must be YYYY-MM-DD' });
    }

    const apiKey = process.env.SKYSCANNER_API_KEY;
    const apiHost = process.env.SKYSCANNER_API_HOST || DEFAULT_HOST;

    if (!apiKey) {
        return res.status(500).json({
            error: 'Server is not configured',
            detail: 'SKYSCANNER_API_KEY env variable is missing.',
            hint: 'Add it in Vercel → Project → Settings → Environment Variables, then redeploy.'
        });
    }

    const headers = {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
        'Content-Type': 'application/json'
    };

    // ----- Step 1+2: resolve IATA → skyId/entityId -----
    let origin, destination;
    try {
        [origin, destination] = await Promise.all([
            resolveAirport(fromCode, apiHost, headers),
            resolveAirport(toCode, apiHost, headers)
        ]);
    } catch (err) {
        return res.status(err.status || 502).json({
            error: 'Airport lookup failed',
            detail: err.detail || err.message,
            hint: 'searchAirport endpoint returned no match for the IATA code. Double-check the codes or upstream availability.'
        });
    }

    if (!origin || !destination) {
        return res.status(404).json({
            error: 'Could not resolve airports',
            detail: { fromResolved: !!origin, toResolved: !!destination, fromCode, toCode },
            hint: 'No SkyId/EntityId found for one of the IATA codes via /flights/searchAirport.'
        });
    }

    // ----- Step 3: search flights -----
    const searchUrl = `https://${apiHost}/flights/searchFlights?` + new URLSearchParams({
        originSkyId: origin.skyId,
        originEntityId: origin.entityId,
        destinationSkyId: destination.skyId,
        destinationEntityId: destination.entityId,
        date,
        adults: String(adults),
        childrens: '0',
        infants: '0',
        cabinClass,
        currency,
        market: 'US',
        countryCode: 'US',
        ...(returnDate ? { returnDate } : {})
    }).toString();

    let apiRes;
    try {
        apiRes = await fetch(searchUrl, { headers });
    } catch (err) {
        return res.status(502).json({
            error: 'Could not reach flight provider',
            detail: err.message
        });
    }

    const rawText = await apiRes.text();

    if (!apiRes.ok) {
        return res.status(apiRes.status === 429 ? 429 : 502).json({
            error: `Upstream API responded ${apiRes.status}`,
            detail: rawText.slice(0, 800),
            hint: apiRes.status === 429
                ? 'RapidAPI rate/quota limit hit. Wait or upgrade your plan.'
                : apiRes.status === 401 || apiRes.status === 403
                ? 'Auth failed. Double-check SKYSCANNER_API_KEY in Vercel env vars.'
                : 'Provider returned an error. The detail field shows their response.'
        });
    }

    let data;
    try {
        data = JSON.parse(rawText);
    } catch {
        return res.status(502).json({
            error: 'Upstream did not return JSON',
            detail: rawText.slice(0, 800)
        });
    }

    const flights = normalizeSkyscanner(data, fromCode, toCode, date);

    if (flights.length === 0) {
        return res.status(200).json({
            flights: [],
            source: 'Skyscanner',
            note: 'API responded but no itineraries found for this route/date.',
            // Expose a small slice so the user can iterate on the normalizer without redeploys.
            debug: { topLevelKeys: Object.keys(data || {}), sample: truncatePreview(data) }
        });
    }

    return res.status(200).json({ flights, source: 'Skyscanner', count: flights.length });
}

// ==================== Airport resolver ====================
// /flights/searchAirport returns a list of places. We pick the first entry whose
// skyId or IATA-like code matches the query, falling back to the first result.
async function resolveAirport(iata, apiHost, headers) {
    if (airportCache.has(iata)) return airportCache.get(iata);

    const url = `https://${apiHost}/flights/searchAirport?` + new URLSearchParams({
        query: iata,
        locale: 'en-US'
    }).toString();

    const res = await fetch(url, { headers });
    const text = await res.text();
    if (!res.ok) {
        const err = new Error(`searchAirport returned ${res.status}`);
        err.status = 502;
        err.detail = text.slice(0, 400);
        throw err;
    }

    let json;
    try { json = JSON.parse(text); } catch {
        const err = new Error('searchAirport returned non-JSON');
        err.status = 502;
        err.detail = text.slice(0, 400);
        throw err;
    }

    const list = Array.isArray(json) ? json
        : Array.isArray(json?.data) ? json.data
        : Array.isArray(json?.results) ? json.results
        : [];

    if (list.length === 0) return null;

    // Try to find a match for the IATA code in any nested shape, else use first result.
    const pick = list.find(item => containsIata(item, iata)) || list[0];
    const resolved = extractSkyIds(pick);
    if (!resolved) return null;

    airportCache.set(iata, resolved);
    return resolved;
}

function containsIata(item, iata) {
    if (!item || typeof item !== 'object') return false;
    const code = iata.toUpperCase();
    const candidates = [
        item.skyId, item.iata, item.iataCode, item.code, item.id,
        item?.navigation?.relevantFlightParams?.skyId,
        item?.presentation?.skyId,
        item?.presentation?.suggestionTitle,
        item?.presentation?.title
    ];
    return candidates.some(v => typeof v === 'string' && v.toUpperCase().includes(code));
}

function extractSkyIds(item) {
    if (!item || typeof item !== 'object') return null;
    const rel = item?.navigation?.relevantFlightParams || {};
    const skyId =
        rel.skyId ||
        item.skyId ||
        item.iata ||
        item.iataCode ||
        item.code;
    const entityId =
        rel.entityId ||
        item?.navigation?.entityId ||
        item.entityId ||
        item.id;
    if (!skyId || !entityId) return null;
    return { skyId: String(skyId), entityId: String(entityId) };
}

// ==================== Response normalizer ====================
// Maps the searchFlights response into the shape script.js's createFlightCard expects.
// Tolerates several variants of the upstream shape (data.itineraries, root.itineraries, etc).
function normalizeSkyscanner(data, fromCode, toCode, date) {
    const itineraries =
        data?.data?.itineraries ||
        data?.itineraries ||
        data?.results?.itineraries ||
        [];

    if (!Array.isArray(itineraries) || itineraries.length === 0) return [];

    return itineraries.slice(0, 30).map((itin, idx) => {
        const leg = (Array.isArray(itin.legs) && itin.legs[0]) || itin.leg || {};
        const priceRaw =
            itin?.price?.raw ??
            itin?.price?.amount ??
            itin?.price?.total ??
            (typeof itin?.price === 'number' ? itin.price : 0);
        const currency = itin?.price?.currency || 'USD';

        const carriers =
            leg?.carriers?.marketing ||
            leg?.carriers?.operating ||
            leg?.carriers ||
            [];
        const carrier = Array.isArray(carriers) ? (carriers[0] || {}) : carriers;
        const airline = carrier.name || leg?.marketingCarrier?.name || 'Airline';
        const airlineCode = carrier.iata || carrier.alternateId || carrier.altId || '';

        const departure = leg.departure || leg.departureDateTime || `${date}T00:00:00`;
        const arrival = leg.arrival || leg.arrivalDateTime || departure;

        const stops = typeof leg.stopCount === 'number'
            ? leg.stopCount
            : Array.isArray(leg.stops) ? leg.stops.length : 0;

        const durationMin = leg.durationInMinutes || leg.duration || 0;

        const originAirport = leg?.origin?.displayCode || leg?.origin?.iata || fromCode;
        const destAirport = leg?.destination?.displayCode || leg?.destination?.iata || toCode;

        return {
            id: `sky_${itin.id || idx}`,
            airline,
            airlineCode,
            price: Math.round(Number(priceRaw) || 0),
            currency,
            isMock: false,
            source: 'Skyscanner',
            departure: { airport: originAirport, time: departure, terminal: null },
            arrival:   { airport: destAirport,  time: arrival,   terminal: null },
            duration: minutesToDuration(durationMin),
            stops,
            bookingUrl: buildSkyscannerFallback(originAirport, destAirport, departure),
            amenities: { baggage: '1-2 bags', meal: false, wifi: false },
            rating: 4.0
        };
    });
}

function minutesToDuration(mins) {
    if (!mins || Number.isNaN(Number(mins))) return '';
    const m = Number(mins);
    const h = Math.floor(m / 60);
    const r = m % 60;
    return h > 0 ? `${h}h ${r}m` : `${r}m`;
}

function buildSkyscannerFallback(from, to, isoDate) {
    const base = `https://www.skyscanner.com/transport/flights/${String(from).toLowerCase()}/${String(to).toLowerCase()}/`;
    if (!isoDate) return base;
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return base;
    const yy = String(d.getUTCFullYear()).slice(2);
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `${base}${yy}${mm}${dd}/`;
}

// Tiny preview helper so a 0-itinerary response is debuggable in the browser.
function truncatePreview(obj) {
    try {
        const s = JSON.stringify(obj);
        return s.length > 600 ? s.slice(0, 600) + '…' : s;
    } catch { return null; }
}
