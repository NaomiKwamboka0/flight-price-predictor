// ==================== AIRPORT AUTOCOMPLETE ====================
// Provides intelligent autocomplete for airport searches

class AirportAutocomplete {
    constructor(inputSelector, suggestionsSelector) {
        this.input = document.querySelector(inputSelector);
        this.suggestionsContainer = document.querySelector(suggestionsSelector);
        this.selectedAirport = null;
        this.debounceTimer = null;

        if (this.input) {
            this.input.addEventListener('input', (e) => this.handleInput(e));
            this.input.addEventListener('blur', () => this.hideSuggestions());
            this.input.addEventListener('focus', (e) => {
                if (e.target.value.length > 0) {
                    this.showSuggestions();
                }
            });
            document.addEventListener('click', (e) => {
                if (e.target !== this.input) {
                    this.hideSuggestions();
                }
            });
        }
    }

    handleInput(event) {
        const query = event.target.value;

        // If user is editing after a previous selection, drop the cached code
        // so they're forced to re-pick (prevents silent stale submissions).
        if (this.selectedAirport) {
            const expected = `${this.selectedAirport.country} — ${this.selectedAirport.city}`;
            if (query !== expected) {
                this.selectedAirport = null;
                this.input.removeAttribute('data-airport-code');
                this.input.classList.remove('has-selection');
            }
        }

        clearTimeout(this.debounceTimer);

        if (query.length === 0) {
            this.hideSuggestions();
            this.selectedAirport = null;
            return;
        }

        this.debounceTimer = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }

    performSearch(query) {
        if (typeof airportFinder === 'undefined') {
            console.error('airportFinder not loaded');
            return;
        }

        const suggestions = airportFinder.getSuggestions(query, 8);
        this.displaySuggestions(suggestions);
    }

    displaySuggestions(suggestions) {
        if (!this.suggestionsContainer) return;

        if (suggestions.length === 0) {
            this.suggestionsContainer.innerHTML = '<div class="no-results">No airports found</div>';
            this.showSuggestions();
            return;
        }

        const html = suggestions.map((airport, index) => `
            <div class="suggestion-item" data-code="${airport.code}" data-index="${index}">
                <div class="suggestion-flag">🌸</div>
                <div class="suggestion-body">
                    <div class="suggestion-main">
                        <strong class="suggestion-country">${airport.country}</strong>
                        <span class="suggestion-city">${airport.city}</span>
                    </div>
                    <div class="suggestion-sub">${airport.name}</div>
                </div>
            </div>
        `).join('');

        this.suggestionsContainer.innerHTML = html;

        // Add click handlers
        this.suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const code = item.dataset.code;
                const airport = airportFinder.getByCode(code);
                this.selectAirport(airport);
            });
            item.addEventListener('mouseover', () => item.classList.add('active'));
            item.addEventListener('mouseout', () => item.classList.remove('active'));
        });

        this.showSuggestions();
    }

    selectAirport(airport) {
        if (!airport) return;
        
        this.selectedAirport = airport;
        this.input.value = `${airport.country} — ${airport.city}`;
        this.input.dataset.airportCode = airport.code;
        this.input.classList.add('has-selection');
        this.hideSuggestions();

        // Trigger change event
        const event = new CustomEvent('airportSelected', { 
            detail: airport,
            bubbles: true 
        });
        this.input.dispatchEvent(event);
    }

    showSuggestions() {
        if (this.suggestionsContainer) {
            this.suggestionsContainer.style.display = 'block';
        }
    }

    hideSuggestions() {
        if (this.suggestionsContainer) {
            this.suggestionsContainer.style.display = 'none';
        }
    }

    getValue() {
        return this.selectedAirport?.code || null;
    }

    setValue(code) {
        const airport = airportFinder.getByCode(code);
        if (airport) {
            this.selectAirport(airport);
        }
    }

    clear() {
        this.input.value = '';
        this.selectedAirport = null;
        this.input.removeAttribute('data-airport-code');
        this.input.classList.remove('has-selection');
        this.hideSuggestions();
    }
}

// Initialize autocomplete when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // From airport autocomplete
    const fromAutocomplete = new AirportAutocomplete(
        '#fromAirport',
        '#fromSuggestions'
    );

    // To airport autocomplete
    const toAutocomplete = new AirportAutocomplete(
        '#toAirport',
        '#toSuggestions'
    );

    // Make available globally
    window.fromAutocomplete = fromAutocomplete;
    window.toAutocomplete = toAutocomplete;

    console.log('[Autocomplete] Initialized for airport search');
});
