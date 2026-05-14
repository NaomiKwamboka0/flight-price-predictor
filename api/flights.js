// ==================== /api/flights — Vercel Serverless Function ====================
// Server-side proxy to Skyscanner (RapidAPI) so the API key never leaves the server
// and CORS is no longer an issue. Returns normalized flight data the frontend can render
// directly. Detailed error responses on failure — no silent mock fallback.
//
// Required env vars (set in Vercel dashboard → Settings → Environment Variables):
//   SKYSCANNER_API_KEY   — your RapidAPI key
//   SKYSCANNER_API_HOST  — optional, defaults to skyscanner44.p.rapidapi.com
//
// Usage from the frontend:
//   GET /api/flights?from=NBO&to=MBA&date=2026-05-16&adults=1

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');

    const { from, to, date, adults = '1' } = req.query;

    if (!from || !to || !date) {
        return res.status(400).json({
            error: 'Missing required query params',
            required: ['from', 'to', 'date'],
            example: '/api/flights?from=NBO&to=MBA&date=2026-05-16'
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
    const apiHost = process.env.SKYSCANNER_API_HOST || 'skyscanner44.p.rapidapi.com';

    if (!apiKey) {
        return res.status(500).json({
            error: 'Server is not configured',
            detail: 'SKYSCANNER_API_KEY env variable is missing.',
            hint: 'Add it in Vercel → Project → Settings → Environment Variables, then redeploy.'
        });
    }

    const upstream = `https://${apiHost}/search?adults=${encodeURIComponent(adults)}` +
        `&origin=${fromCode}&destination=${toCode}&departureDate=${date}&currency=USD`;

    let apiRes;
    try {
        apiRes = await fetch(upstream, {
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        });
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

    const flights = normalizeSkyscanner(data, fromCode, toCode);

    if (flights.length === 0) {
        return res.status(200).json({
            flights: [],
            source: 'Skyscanner',
            note: 'API responded but no itineraries found for this route/date.'
        });
    }

    return res.status(200).json({ flights, source: 'Skyscanner', count: flights.length });
}

// ==================== Skyscanner44 response normalizer ====================
// The skyscanner44.p.rapidapi.com API returns itineraries/legs/places/carriers.
// We map it to the same shape script.js's createFlightCard expects.
function normalizeSkyscanner(data, fromCode, toCode) {
    if (!data || !Array.isArray(data.itineraries)) return [];

    const legsById = {};
    if (Array.isArray(data.legs)) {
        for (const leg of data.legs) legsById[leg.id] = leg;
    }
    const placesById = {};
    if (Array.isArray(data.places)) {
        for (const p of data.places) placesById[p.id] = p;
    }
    const carriersById = {};
    if (Array.isArray(data.carriers)) {
        for (const c of data.carriers) carriersById[c.id] = c;
    }

    return data.itineraries.slice(0, 25).map((itin, idx) => {
        const legId = (itin.legIds && itin.legIds[0]) || itin.legId;
        const leg = legsById[legId] || {};
        const pricing = (itin.pricingOptions && itin.pricingOptions[0]) || {};
        const price = pricing.price?.amount ?? pricing.price?.total ?? itin.price?.amount ?? 0;

        const carrierId = leg.marketing?.[0] || leg.operating?.[0];
        const carrier = carriersById[carrierId] || {};
        const airline = carrier.name || leg.marketing_name || 'Airline';
        const airlineCode = carrier.iata || carrier.alt_id || '';

        const departure = leg.departure || leg.departureDateTime;
        const arrival = leg.arrival || leg.arrivalDateTime;

        const agentUrl =
            pricing.items?.[0]?.url ||
            pricing.items?.[0]?.agent?.url ||
            pricing.url ||
            null;

        return {
            id: `sky_${itin.id || idx}`,
            airline,
            airlineCode,
            price: Math.round(Number(price) || 0),
            currency: pricing.price?.currency || 'USD',
            isMock: false,
            source: 'Skyscanner',
            departure: {
                airport: fromCode,
                time: departure,
                terminal: null
            },
            arrival: {
                airport: toCode,
                time: arrival,
                terminal: null
            },
            duration: minutesToDuration(leg.durationInMinutes || leg.duration),
            stops: Array.isArray(leg.stops) ? leg.stops.length : (leg.stopCount ?? 0),
            bookingUrl: agentUrl || buildSkyscannerFallback(fromCode, toCode, departure),
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
    if (!isoDate) return `https://www.skyscanner.com/transport/flights/${from.toLowerCase()}/${to.toLowerCase()}/`;
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return `https://www.skyscanner.com/transport/flights/${from.toLowerCase()}/${to.toLowerCase()}/`;
    const yy = String(d.getUTCFullYear()).slice(2);
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(d.getUTCDate()).padStart(2, '0');
    return `https://www.skyscanner.com/transport/flights/${from.toLowerCase()}/${to.toLowerCase()}/${yy}${mm}${dd}/`;
}
