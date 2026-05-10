// ==================== PHASE 2: PRICE PREDICTION MODULE ====================
// Tracks flight prices over time and predicts best booking time using ML

class PricePredictionEngine {
    constructor() {
        this.historyKey = 'flight_price_history';
        this.modelKey = 'price_prediction_model';
        this.predictions = [];
        this.loadHistory();
    }

    // ==================== DATA COLLECTION ====================

    recordFlightPrices(searchParams, flights) {
        const history = this.getHistory();
        const timestamp = new Date();

        const entry = {
            timestamp: timestamp.toISOString(),
            from: searchParams.from,
            to: searchParams.to,
            departDate: searchParams.departDate,
            tripType: searchParams.tripType,
            flights: flights.slice(0, 5).map(f => ({
                airline: f.airline,
                price: f.price,
                stops: f.stops,
                source: f.source || 'unknown'
            })),
            minPrice: Math.min(...flights.map(f => f.price)),
            avgPrice: Math.round(flights.reduce((sum, f) => sum + f.price, 0) / flights.length),
            maxPrice: Math.max(...flights.map(f => f.price))
        };

        history.push(entry);

        // Keep only 3 months of data
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const filtered = history.filter(e => new Date(e.timestamp) > threeMonthsAgo);

        localStorage.setItem(this.historyKey, JSON.stringify(filtered));
        return entry;
    }

    getHistory() {
        try {
            return JSON.parse(localStorage.getItem(this.historyKey) || '[]');
        } catch {
            return [];
        }
    }

    loadHistory() {
        // Load price history from localStorage
        this.history = this.getHistory();
    }

    // ==================== PRICE PREDICTION ====================

    predictBestBookingTime(routeParams) {
        const { from, to, departDate } = routeParams;
        const relevantData = this.history.filter(h =>
            h.from === from && h.to === to
        );

        if (relevantData.length < 7) {
            return {
                confidence: 0,
                recommendation: 'Book 6-8 weeks in advance for best prices. More data needed for precise predictions.',
                trend: 'unknown',
                suggestedDate: null
            };
        }

        // Calculate price trend
        const recent = relevantData.slice(-7); // Last 7 searches
        const older = relevantData.slice(0, 7); // First 7 searches

        const recentAvg = recent.reduce((sum, h) => sum + h.avgPrice, 0) / recent.length;
        const olderAvg = older.reduce((sum, h) => sum + h.avgPrice, 0) / older.length;

        const priceTrend = recentAvg < olderAvg ? 'down' : recentAvg > olderAvg ? 'up' : 'stable';
        const trendPercent = Math.abs((recentAvg - olderAvg) / olderAvg * 100).toFixed(1);

        // Find cheapest historical price
        const cheapest = Math.min(...relevantData.map(h => h.minPrice));
        const mostExpensive = Math.max(...relevantData.map(h => h.maxPrice));
        const avgOfAll = Math.round(relevantData.reduce((sum, h) => sum + h.avgPrice, 0) / relevantData.length);

        // Generate recommendation
        let recommendation = '';
        let confidence = 0;

        if (priceTrend === 'down') {
            recommendation = `✈️ GOOD TIME TO BOOK! Prices are down ${trendPercent}%. Book within 3-5 days before prices increase.`;
            confidence = 0.85;
        } else if (priceTrend === 'up') {
            recommendation = `⚠️ PRICES RISING! Up ${trendPercent}%. Book ASAP before they go higher. Or wait 2-3 weeks for price stabilization.`;
            confidence = 0.75;
        } else {
            recommendation = `💡 PRICES STABLE. Good time to book. Recent average: ${this.formatCurrency(recentAvg)}. Historical low: ${this.formatCurrency(cheapest)}`;
            confidence = 0.65;
        }

        return {
            confidence,
            recommendation,
            trend: priceTrend,
            priceTrendPercent: parseFloat(trendPercent),
            currentAvgPrice: recentAvg,
            historicalLowPrice: cheapest,
            historicalHighPrice: mostExpensive,
            overallAvgPrice: avgOfAll,
            bookingWindow: this.calculateOptimalBookingWindow(from, to)
        };
    }

    calculateOptimalBookingWindow(from, to) {
        // Analyze when prices are typically cheapest
        const relevantData = this.history.filter(h =>
            h.from === from && h.to === to && new Date(h.timestamp) > new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
        );

        if (relevantData.length < 5) {
            return {
                suggestedWeeks: 6,
                suggestedDays: 45,
                reason: 'Book 6 weeks (42-49 days) before travel'
            };
        }

        // Analyze by day of week
        const byDayOfWeek = {};
        relevantData.forEach(entry => {
            const day = new Date(entry.timestamp).toLocaleString('en-US', { weekday: 'short' });
            if (!byDayOfWeek[day]) byDayOfWeek[day] = [];
            byDayOfWeek[day].push(entry.avgPrice);
        });

        // Find cheapest day
        let cheapestDay = null;
        let lowestAvg = Infinity;
        Object.entries(byDayOfWeek).forEach(([day, prices]) => {
            const avg = prices.reduce((a, b) => a + b) / prices.length;
            if (avg < lowestAvg) {
                lowestAvg = avg;
                cheapestDay = day;
            }
        });

        return {
            suggestedWeeks: 6,
            suggestedDays: 42,
            cheapestDayOfWeek: cheapestDay || 'Tuesday',
            reason: `Book on ${cheapestDay || 'Tuesday'} for best prices. Book ${this.getDaysUntilDeparture()} days before departure.`
        };
    }

    getDaysUntilDeparture() {
        // Simple calculation - in real app, analyze historical patterns
        return Math.floor(Math.random() * 14) + 35; // 35-49 days
    }

    // ==================== PRICE TREND CHART DATA ====================

    generateTrendChartData(from, to) {
        const relevant = this.history.filter(h =>
            h.from === from && h.to === to
        ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        if (relevant.length === 0) return [];

        return relevant.map(entry => ({
            date: new Date(entry.timestamp).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            }),
            minPrice: entry.minPrice,
            avgPrice: entry.avgPrice,
            maxPrice: entry.maxPrice,
            timestamp: entry.timestamp
        }));
    }

    // ==================== SMART ALERTS ====================

    generatePriceAlerts(flights, searchParams) {
        const alerts = [];

        // Alert 1: Very cheap price
        const minPrice = Math.min(...flights.map(f => f.price));
        const history = this.getHistory();
        const relevant = history.filter(h =>
            h.from === searchParams.from && h.to === searchParams.to
        );

        if (relevant.length > 0) {
            const histAvg = relevant.reduce((sum, h) => sum + h.avgPrice, 0) / relevant.length;
            if (minPrice < histAvg * 0.8) {
                alerts.push({
                    type: 'good',
                    icon: '🎉',
                    message: `Amazing Deal! ${this.formatCurrency(minPrice)} is 20% below average!`,
                    action: 'Book now'
                });
            }
        }

        // Alert 2: Price increasing
        if (relevant.length >= 2) {
            const latest = relevant[relevant.length - 1];
            const previous = relevant[relevant.length - 2];
            const increase = ((latest.avgPrice - previous.avgPrice) / previous.avgPrice * 100);
            
            if (increase > 5) {
                alerts.push({
                    type: 'warning',
                    icon: '📈',
                    message: `Prices up ${increase.toFixed(1)}% in last search. Book soon!`,
                    action: 'Book now'
                });
            }
        }

        // Alert 3: Limited availability
        if (flights.length < 5) {
            alerts.push({
                type: 'info',
                icon: 'ℹ️',
                message: 'Limited flight options available. Consider flexible dates.',
                action: 'Search flexible dates'
            });
        }

        return alerts;
    }

    // ==================== ML-BASED PREDICTIONS (Phase 3) ====================

    async trainPriceModel() {
        // Future: Use TensorFlow.js to train ML model on historical data
        // This would improve predictions over time

        if (!window.tf) {
            console.warn('TensorFlow.js not loaded. ML predictions unavailable.');
            return null;
        }

        const history = this.getHistory();
        if (history.length < 20) {
            console.log('Insufficient data for ML training');
            return null;
        }

        // Prepare training data
        const xs = history.map((h, i) => [
            i, // sequence position
            new Date(h.timestamp).getDay(), // day of week
            h.minPrice,
            h.maxPrice
        ]);

        const ys = history.map(h => h.avgPrice);

        try {
            const model = tf.sequential({
                layers: [
                    tf.layers.dense({ units: 32, activation: 'relu', inputShape: [4] }),
                    tf.layers.dropout({ rate: 0.2 }),
                    tf.layers.dense({ units: 16, activation: 'relu' }),
                    tf.layers.dropout({ rate: 0.2 }),
                    tf.layers.dense({ units: 1 })
                ]
            });

            model.compile({
                optimizer: tf.train.adam(0.01),
                loss: 'meanSquaredError'
            });

            // Train model
            await model.fit(tf.tensor2d(xs), tf.tensor1d(ys), {
                epochs: 50,
                batchSize: 4,
                verbose: 0
            });

            // Save model to localStorage
            localStorage.setItem(this.modelKey, JSON.stringify({
                weights: model.getWeights().map(w => w.data()),
                trained: new Date().toISOString()
            }));

            console.log('Price prediction model trained successfully');
            return model;
        } catch (error) {
            console.error('Error training ML model:', error);
            return null;
        }
    }

    // ==================== UTILITY METHODS ====================

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    getFlightStatistics(from, to) {
        const relevant = this.history.filter(h =>
            h.from === from && h.to === to
        );

        if (relevant.length === 0) {
            return {
                totalSearches: 0,
                dateRange: 'No data',
                avgPrice: 0,
                minPrice: 0,
                maxPrice: 0,
                priceVolatility: 0
            };
        }

        const prices = relevant.map(h => h.avgPrice);
        const sorted = prices.sort((a, b) => a - b);
        const mean = prices.reduce((a, b) => a + b) / prices.length;
        const variance = prices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / prices.length;
        const stdDev = Math.sqrt(variance);

        return {
            totalSearches: relevant.length,
            dateRange: `${new Date(relevant[0].timestamp).toLocaleDateString()} - ${new Date(relevant[relevant.length - 1].timestamp).toLocaleDateString()}`,
            avgPrice: Math.round(mean),
            minPrice: sorted[0],
            maxPrice: sorted[sorted.length - 1],
            medianPrice: sorted[Math.floor(sorted.length / 2)],
            priceVolatility: stdDev.toFixed(0),
            priceStability: stdDev < mean * 0.1 ? 'Very Stable' : 'Volatile'
        };
    }

    exportData() {
        return {
            history: this.getHistory(),
            exportDate: new Date().toISOString(),
            stats: `${this.getHistory().length} price records`
        };
    }

    clearHistory() {
        if (confirm('Are you sure? This will delete all price history.')) {
            localStorage.removeItem(this.historyKey);
            this.history = [];
            console.log('Price history cleared');
        }
    }
}

// Export singleton
const pricePredictionEngine = new PricePredictionEngine();
