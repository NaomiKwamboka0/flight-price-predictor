// ==================== FLIGHT SEARCH MAIN SCRIPT ====================
// Integrated with multi-API handler, price prediction, and AI assistant

// Load environment variables from .env
async function loadEnvVariables() {
    try {
        const response = await fetch('.env');
        if (response.ok) {
            const envText = await response.text();
            const lines = envText.split('\n');
            lines.forEach(line => {
                if (line && !line.startsWith('#')) {
                    const [key, value] = line.split('=');
                    if (key && value) {
                        localStorage.setItem(key.trim(), value.trim());
                    }
                }
            });
            console.log('[Config] Environment variables loaded');
        }
    } catch (error) {
        console.warn('[Config] Could not load .env file (expected in development)');
    }
}

// Save search parameters to localStorage and Firebase
function saveSearchParams(params) {
    try {
        // Save to localStorage
        localStorage.setItem('lastSearch', JSON.stringify(params));
        console.log('[Search] Parameters saved:', params);
    } catch (error) {
        console.warn('[Search] Could not save parameters:', error);
    }
}

// Save flight data for price tracking and prediction
function saveFlightData(flights) {
    try {
        // Save to localStorage
        localStorage.setItem('flightData', JSON.stringify(flights));
        
        // Store for prediction analytics
        const allFlights = JSON.parse(localStorage.getItem('allFlights') || '[]');
        const newFlights = flights.filter(f => !allFlights.some(af => af.id === f.id));
        allFlights.push(...newFlights);
        localStorage.setItem('allFlights', JSON.stringify(allFlights.slice(-1000))); // Keep last 1000
        
        console.log('[Data] Saved', flights.length, 'flights for price tracking');
    } catch (error) {
        console.warn('[Data] Could not save flight data:', error);
    }
}

// Set minimum date to today
document.addEventListener('DOMContentLoaded', async function() {
    // Load environment first
    await loadEnvVariables();

    const departDateInput = document.getElementById('departDate');
    const returnDateInput = document.getElementById('returnDate');
    const today = getMinDate();
    
    if (departDateInput) {
        departDateInput.min = today;
    }
    if (returnDateInput) {
        returnDateInput.min = today;
    }

    // Trip type change handler
    const tripTypeRadios = document.querySelectorAll('input[name="tripType"]');
    tripTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const returnDateGroup = document.getElementById('returnDateGroup');
            if (this.value === 'roundTrip') {
                returnDateGroup.style.display = 'flex';
                document.getElementById('returnDate').required = true;
            } else {
                returnDateGroup.style.display = 'none';
                document.getElementById('returnDate').required = false;
            }
        });
    });

    // Form submission
    const searchForm = document.getElementById('flightSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleFlightSearch);
    }

    // Quick search buttons
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const fromCode = this.dataset.from;
            const toCode = this.dataset.to;

            // Get airports by code to get full names
            const fromAirport = airportFinder.getByCode(fromCode);
            const toAirport = airportFinder.getByCode(toCode);

            if (fromAirport) {
                fromAutocomplete.selectAirport(fromAirport);
            }
            if (toAirport) {
                toAutocomplete.selectAirport(toAirport);
            }

            document.getElementById('departDate').focus();
        });
    });

    // Load results page if coming from search
    if (window.location.pathname.includes('results.html')) {
        loadSearchResults();
    }
});

// ==================== FLIGHT SEARCH HANDLER ====================

async function handleFlightSearch(e) {
    e.preventDefault();

    // Get airport codes from autocomplete data attribute OR raw input
    const fromInput = document.getElementById('fromAirport');
    const toInput = document.getElementById('toAirport');

    const fromAirport = (fromInput.dataset.airportCode || fromInput.value).toUpperCase().trim();
    const toAirport = (toInput.dataset.airportCode || toInput.value).toUpperCase().trim();

    const departDate = document.getElementById('departDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const tripType = document.querySelector('input[name="tripType"]:checked').value;
    const flexible = document.getElementById('flexibleDates').checked;
    const statusDiv = document.getElementById('searchStatus');

    // Validation
    if (!isValidAirportCode(fromAirport)) {
        showStatus('Please select a valid departure airport', 'error');
        return;
    }
    if (!isValidAirportCode(toAirport)) {
        showStatus('Please select a valid destination airport', 'error');
        return;
    }
    if (fromAirport === toAirport) {
        showStatus('Departure and destination airports must be different', 'error');
        return;
    }
    if (tripType === 'roundTrip' && !returnDate) {
        showStatus('Return date is required for round trip', 'error');
        return;
    }

    // Save search params
    const searchParams = {
        from: fromAirport,
        to: toAirport,
        departDate,
        returnDate,
        tripType,
        flexible,
        timestamp: new Date().toISOString()
    };
    saveSearchParams(searchParams);

    // Show loading and search
    showStatus('Searching flights across all airlines...', 'info');
    
    try {
        const flights = await searchFlights(searchParams);
        
        if (flights.length === 0) {
            showStatus('No flights found. Try different dates or airports.', 'error');
            return;
        }

        // Save flight data for price prediction
        saveFlightData(flights);

        // Redirect to results with data
        sessionStorage.setItem('searchResults', JSON.stringify({
            searchParams,
            flights,
            timestamp: new Date().toISOString()
        }));

        showStatus(`Found ${flights.length} flights! Redirecting...`, 'success');
        setTimeout(() => {
            window.location.href = 'results.html';
        }, 1000);

    } catch (error) {
        console.error('Search error:', error);
        showStatus(`Error: ${error.message}`, 'error');
    }
}

// ==================== FLIGHT SEARCH API CALL ====================

async function searchFlights(params) {
    console.log('[Search] Starting flight search...');
    console.log('[Search] Params:', params);
    
    try {
        // Check if we have API keys configured from window.API_KEYS
        const hasSkyscannerKey = !!(window.API_KEYS && window.API_KEYS.VITE_SKYSCANNER_API_KEY);
        const hasAmadeusKey = !!(window.API_KEYS && window.API_KEYS.VITE_AMADEUS_API_KEY);
        const hasKiwiKey = !!(window.API_KEYS && window.API_KEYS.VITE_KIWI_API_KEY);
        
        console.log('[Search] Has Skyscanner key:', hasSkyscannerKey);
        console.log('[Search] Has Amadeus key:', hasAmadeusKey);
        console.log('[Search] Has Kiwi key:', hasKiwiKey);

        // If no real API keys configured, use mock data
        if (!hasSkyscannerKey && !hasAmadeusKey && !hasKiwiKey) {
            console.warn('[Search] No API keys configured, using mock data');
            return generateMockFlights(params);
        }

        // Use the flight API handler to search
        if (typeof window.flightAPIHandler !== 'undefined') {
            console.log('[Search] Using FlightAPIHandler...');
            return await window.flightAPIHandler.searchFlights(params);
        }

        // Fallback if handler not available
        console.log('[Search] FlightAPIHandler not available, using mock data');
        return generateMockFlights(params);

    } catch (error) {
        console.error('[Search] Fatal error:', error);
        // Return mock data on any error
        return generateMockFlights(params);
    }
}

// Mock flight generator - for testing UI
function generateMockFlights(params) {
    const { from, to, departDate, tripType } = params;
    const airlines = [
        { name: 'Qatar Airways', code: 'QR', logo: '✈️' },
        { name: 'Ethiopian Airlines', code: 'ET', logo: '✈️' },
        { name: 'Safarilink', code: 'SF', logo: '✈️' },
        { name: 'Emirates', code: 'EK', logo: '✈️' },
        { name: 'Turkish Airlines', code: 'TK', logo: '✈️' },
        { name: 'Kenya Airways', code: 'KQ', logo: '✈️' },
        { name: 'South African Airways', code: 'SA', logo: '✈️' }
    ];

    const flights = [];
    const baseDate = new Date(departDate);

    for (let i = 0; i < 12; i++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const departTime = new Date(baseDate);
        departTime.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0);
        
        const arriveTime = new Date(departTime);
        arriveTime.setHours(arriveTime.getHours() + Math.floor(Math.random() * 12) + 2);

        const price = Math.floor(Math.random() * 1500) + 300;
        const stops = Math.floor(Math.random() * 3);

        flights.push({
            id: `flight-${i}`,
            airline: airline.name,
            airlineCode: airline.code,
            price: price,
            currency: 'USD',
            departure: {
                airport: from,
                time: departTime.toISOString(),
                terminal: Math.floor(Math.random() * 5) + 1
            },
            arrival: {
                airport: to,
                time: arriveTime.toISOString(),
                terminal: Math.floor(Math.random() * 5) + 1
            },
            duration: calculateDuration(departTime, arriveTime),
            stops: stops,
            bookingUrl: `https://www.google.com/flights?hl=en#search;f=${from};t=${to};d=${departDate}`,
            amenities: {
                baggage: stops === 0 ? '2 checked bags' : '1 checked bag',
                meal: Math.random() > 0.5,
                wifi: Math.random() > 0.7,
                seat: Math.random() > 0.5 ? 'Extra legroom' : 'Standard'
            },
            rating: (Math.random() * 2 + 3).toFixed(1) // 3-5 rating
        });
    }

    // Sort by price (cheapest first)
    return flights.sort((a, b) => a.price - b.price);
}

// ==================== RESULTS PAGE ==================== 

function loadSearchResults() {
    const resultsData = sessionStorage.getItem('searchResults');
    
    if (!resultsData) {
        document.getElementById('errorState').style.display = 'block';
        document.getElementById('errorMessage').textContent = 'No search results found. Please search again.';
        document.getElementById('loadingState').style.display = 'none';
        return;
    }

    const { searchParams, flights } = JSON.parse(resultsData);

    // Show search summary
    const fromCity = searchParams.from;
    const toCity = searchParams.to;
    const dateStr = formatDate(searchParams.departDate);
    const title = searchParams.tripType === 'roundTrip' 
        ? `${fromCity} → ${toCity} (Round Trip)`
        : `${fromCity} → ${toCity}`;

    document.getElementById('searchTitle').textContent = `${title} - ${dateStr}`;

    // Hide loading, show results
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';

    // Display flights
    displayFlights(flights);

    // Add filter event listeners
    setupFilters(flights);

    // Show price prediction
    showPricePrediction(flights, searchParams);
}

function displayFlights(flights) {
    const resultsContainer = document.getElementById('flightResults');
    const noResults = document.getElementById('noResults');

    if (!flights || flights.length === 0) {
        noResults.style.display = 'block';
        resultsContainer.innerHTML = '';
        return;
    }

    noResults.style.display = 'none';
    resultsContainer.innerHTML = flights.map(flight => createFlightCard(flight)).join('');

    // Add click handlers
    document.querySelectorAll('.flight-card').forEach(card => {
        card.addEventListener('click', function() {
            showFlightDetails(this.dataset.flightId);
        });
    });
}

function createFlightCard(flight) {
    const departTime = formatTime(flight.departure.time);
    const arriveTime = formatTime(flight.arrival.time);
    const price = formatCurrency(flight.price, flight.currency);
    const stopsText = flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`;

    return `
        <div class="flight-card" data-flight-id="${flight.id}">
            <div class="flight-card-header">
                <div class="airline-name">${flight.airline}</div>
                <div class="flight-price">${price}</div>
            </div>
            <div class="flight-card-body">
                <div class="flight-details">
                    <div class="flight-leg">
                        <div class="flight-time">${departTime}</div>
                        <div class="flight-airport">${flight.departure.airport}</div>
                    </div>
                    <div class="flight-duration">
                        <div class="flight-duration-arrow">→</div>
                        <div>${flight.duration}</div>
                        <div style="font-size: 12px; color: #999;">${stopsText}</div>
                    </div>
                    <div class="flight-leg">
                        <div class="flight-time">${arriveTime}</div>
                        <div class="flight-airport">${flight.arrival.airport}</div>
                    </div>
                </div>
                <div class="flight-footer">
                    <div class="flight-info">
                        ${flight.amenities.meal ? '🍽️ Meal included' : ''} 
                        ${flight.amenities.wifi ? '📶 WiFi' : ''}
                        ${flight.amenities.seat ? `🪑 ${flight.amenities.seat}` : ''}
                    </div>
                    <a href="${flight.bookingUrl}" target="_blank" class="book-btn">
                        Book Now →
                    </a>
                </div>
            </div>
        </div>
    `;
}

// ==================== FILTERS & SORTING ====================

function setupFilters(flights) {
    const priceFilter = document.getElementById('priceFilter');
    const sortBy = document.getElementById('sortBy');
    const priceRangeValue = document.getElementById('priceRangeValue');

    // Set max price
    const maxPrice = Math.max(...flights.map(f => f.price));
    priceFilter.max = maxPrice;
    priceFilter.value = maxPrice;
    priceRangeValue.textContent = formatCurrency(maxPrice);

    priceFilter.addEventListener('change', function() {
        priceRangeValue.textContent = formatCurrency(this.value);
        applyFiltersAndSort(flights);
    });

    sortBy.addEventListener('change', function() {
        applyFiltersAndSort(flights);
    });
}

function applyFiltersAndSort(flights) {
    const maxPrice = parseInt(document.getElementById('priceFilter').value);
    const sortBy = document.getElementById('sortBy').value;

    let filtered = flights.filter(f => f.price <= maxPrice);

    // Sort
    switch(sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'duration-asc':
            filtered.sort((a, b) => {
                const aDur = parseFloat(a.duration);
                const bDur = parseFloat(b.duration);
                return aDur - bDur;
            });
            break;
        case 'duration-desc':
            filtered.sort((a, b) => {
                const aDur = parseFloat(a.duration);
                const bDur = parseFloat(b.duration);
                return bDur - aDur;
            });
            break;
        case 'departure-asc':
            filtered.sort((a, b) => new Date(a.departure.time) - new Date(b.departure.time));
            break;
        case 'departure-desc':
            filtered.sort((a, b) => new Date(b.departure.time) - new Date(a.departure.time));
            break;
    }

    displayFlights(filtered);
}

// ==================== PRICE PREDICTION ====================

function showPricePrediction(flights, searchParams) {
    const predictionInfo = document.getElementById('predictionInfo');
    const predictionMessage = document.getElementById('predictionMessage');
    
    if (!flights || flights.length === 0) return;

    // Use price prediction engine if available
    if (typeof pricePredictionEngine !== 'undefined') {
        // Record prices for future predictions
        pricePredictionEngine.recordFlightPrices(searchParams, flights);

        // Get prediction
        const prediction = pricePredictionEngine.predictBestBookingTime(searchParams);
        const alerts = pricePredictionEngine.generatePriceAlerts(flights, searchParams);

        // Build prediction message
        let prediction_html = `
            <p><strong>📊 Price Analysis</strong></p>
            <div style="margin: 15px 0; padding: 15px; background: #f0f8ff; border-radius: 4px;">
                <p><strong>${prediction.recommendation}</strong></p>
                <p style="margin-top: 10px; font-size: 13px; color: #666;">
                    Current Avg: ${formatCurrency(prediction.currentAvgPrice)}<br>
                    Historical Low: ${formatCurrency(prediction.historicalLowPrice)}<br>
                    Confidence: ${Math.round(prediction.confidence * 100)}%
                </p>
            </div>
        `;

        if (alerts.length > 0) {
            prediction_html += `<div style="margin-top: 15px;">`;
            alerts.forEach(alert => {
                prediction_html += `
                    <div style="padding: 10px; margin: 10px 0; background: #f9f9f9; border-left: 4px solid #${alert.type === 'good' ? '4caf50' : alert.type === 'warning' ? 'ff9800' : '2196f3'};">
                        ${alert.icon} ${alert.message}
                    </div>
                `;
            });
            prediction_html += `</div>`;
        }

        predictionMessage.innerHTML = prediction_html;
    } else {
        // Fallback: simple statistics
        const avgPrice = Math.round(
            flights.reduce((sum, f) => sum + f.price, 0) / flights.length
        );
        const minPrice = Math.min(...flights.map(f => f.price));
        const maxPrice = Math.max(...flights.map(f => f.price));

        predictionMessage.innerHTML = `
            <p><strong>Average Price:</strong> ${formatCurrency(avgPrice)}</p>
            <p><strong>Cheapest Option:</strong> ${formatCurrency(minPrice)}</p>
            <p><strong>Most Expensive:</strong> ${formatCurrency(maxPrice)}</p>
            <p style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ccc;">
                💡 <strong>Tip:</strong> Book 6-8 weeks in advance for the best prices. Prices typically increase closer to departure date.
            </p>
        `;
    }

    predictionInfo.style.display = 'block';
}

// ==================== FLIGHT DETAILS MODAL ====================

function showFlightDetails(flightId) {
    // Implementation for showing flight details in modal
    // Can be expanded in Phase 2
    const modal = document.getElementById('flightModal');
    modal.style.display = 'block';
}

// ==================== UTILITY FUNCTIONS ====================

function showStatus(message, type = 'info') {
    const statusDiv = document.getElementById('searchStatus');
    if (!statusDiv) return;

    statusDiv.textContent = message;
    statusDiv.className = type;
    statusDiv.style.display = 'block';

    if (type === 'success') {
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }
}

function getMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function isValidAirportCode(code) {
    return /^[A-Z]{3}$/.test(code.toUpperCase());
}

function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

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

// Close modal when clicking X
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('flightModal');
    if (modal) {
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            }
        }
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    }
});
