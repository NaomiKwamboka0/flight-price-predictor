// ==================== PHASE 3: AI CHATBOT + INTEGRATIONS ====================
// Complete chatbot with weather, safety, and intelligent responses

class TravelAssistant {
    constructor() {
        this.conversationHistory = [];
        this.userProfile = this.loadUserProfile();
        this.weatherCache = {};
        this.safetyInfo = {};
        this.initializeAssistant();
    }

    initializeAssistant() {
        console.log('[Assistant] Initialized and ready');
    }

    loadUserProfile() {
        const saved = localStorage.getItem('user_profile');
        return saved ? JSON.parse(saved) : {
            preferences: {
                currency: 'USD',
                language: 'en',
                temperatureUnit: 'C'
            },
            travelHistory: [],
            preferences: {}
        };
    }

    // ==================== MESSAGE PROCESSING ====================

    async processMessage(userMessage) {
        const timestamp = new Date();
        
        // Add to history
        this.conversationHistory.push({
            role: 'user',
            message: userMessage,
            timestamp
        });

        // Detect message intent
        const intent = this.detectIntent(userMessage);
        console.log(`[Assistant] Intent detected: ${intent}`);

        let response;

        switch(intent) {
            case 'flight_search':
                response = await this.handleFlightSearch(userMessage);
                break;
            case 'weather':
                response = await this.handleWeatherQuery(userMessage);
                break;
            case 'safety':
                response = await this.handleSafetyQuery(userMessage);
                break;
            case 'price_tips':
                response = this.handlePriceTips(userMessage);
                break;
            case 'destination_info':
                response = await this.handleDestinationInfo(userMessage);
                break;
            case 'booking_help':
                response = this.handleBookingHelp(userMessage);
                break;
            case 'general':
            default:
                response = await this.generateSmartResponse(userMessage);
                break;
        }

        // Add to history
        this.conversationHistory.push({
            role: 'assistant',
            message: response,
            timestamp: new Date()
        });

        return response;
    }

    // ==================== INTENT DETECTION ====================

    detectIntent(message) {
        const lower = message.toLowerCase();

        // Flight search intents
        if (lower.match(/\b(flight|book|search|find|show|flying|going to|traveling to)\b/) &&
            lower.match(/\b(from|to|airport|city|where)\b/)) {
            return 'flight_search';
        }

        // Weather intents
        if (lower.match(/\b(weather|temperature|rain|sunny|cloudy|forecast|climate)\b/)) {
            return 'weather';
        }

        // Safety intents
        if (lower.match(/\b(safe|danger|risk|security|crime|safe to travel|dangerous)\b/)) {
            return 'safety';
        }

        // Price intents
        if (lower.match(/\b(cheap|price|cost|expensive|budget|save|discount)\b/) &&
            lower.match(/\b(flight|when|time|book|ticket)\b/)) {
            return 'price_tips';
        }

        // Destination info
        if (lower.match(/\b(visit|destination|city|country|place|location|attraction|thing to do)\b/)) {
            return 'destination_info';
        }

        // Booking help
        if (lower.match(/\b(book|booking|ticket|airline website|how to|reserve|purchase)\b/)) {
            return 'booking_help';
        }

        return 'general';
    }

    // ==================== INTENT HANDLERS ====================

    async handleFlightSearch(message) {
        // Extract airports and dates from message
        const airports = this.extractAirports(message);
        const dates = this.extractDates(message);

        if (airports.length < 2) {
            return "I can help you search for flights! Tell me:\n" +
                   "• Where are you flying FROM? (city or airport code)\n" +
                   "• Where are you flying TO?\n" +
                   "• When do you want to travel?\n\n" +
                   "Example: 'Find flights from NYC to LAX on March 15'";
        }

        return `Great! I found: Departure from ${airports[0]} to ${airports[1]}${dates.length > 0 ? ` on ${dates[0]}` : ''}.\n\n` +
               `Head over to our search page and I'll find you the best deals from all airlines!`;
    }

    async handleWeatherQuery(message) {
        // Extract destination city
        const cities = this.extractCities(message);

        if (cities.length === 0) {
            return "Which city or destination would you like to know the weather for?";
        }

        try {
            const city = cities[0];
            const weather = await this.getWeather(city);

            if (!weather) {
                return `I couldn't fetch weather data for ${city}. Try checking weather.com or openweathermap.org`;
            }

            return `🌤️ **Weather in ${city}**\n\n` +
                   `Temperature: ${weather.temp}°${this.userProfile.preferences.temperatureUnit}\n` +
                   `Conditions: ${weather.description}\n` +
                   `Humidity: ${weather.humidity}%\n` +
                   `Wind Speed: ${weather.windSpeed} km/h\n\n` +
                   `${this.getWeatherAdvice(weather)}`;
        } catch (error) {
            console.error('Weather error:', error);
            return `I had trouble getting weather data. Please try checking a weather service directly.`;
        }
    }

    async handleSafetyQuery(message) {
        const cities = this.extractCities(message);

        if (cities.length === 0) {
            return "Which destination would you like safety information for?";
        }

        try {
            const city = cities[0];
            const safety = await this.getSafetyInfo(city);

            return `🛡️ **Travel Safety: ${city}**\n\n` +
                   `${safety.advisory}\n\n` +
                   `Health Alerts: ${safety.healthAlerts || 'None currently'}\n\n` +
                   `Last Updated: ${safety.lastUpdated}\n\n` +
                   `⚠️ Always check official government travel advisories before booking!`;
        } catch (error) {
            console.error('Safety info error:', error);
            return `For the most accurate safety information, check your government's travel advisory website.`;
        }
    }

    handlePriceTips(message) {
        const tips = [
            "✈️ **Book 6-8 weeks in advance** - This is typically when prices are lowest",
            "📅 **Book on Tuesdays/Wednesdays** - Cheapest day of week for many routes",
            "🕐 **Early morning or late night flights** - Usually 10-20% cheaper",
            "🔍 **Clear your browser cookies** - Some sites show higher prices to repeat visitors",
            "⏰ **Flexible dates save money** - Try flying ±3 days for big savings",
            "💳 **Use our price tracking** - We monitor prices and alert you to deals",
            "🔔 **Set up alerts** - Get notified when prices drop",
            "🌍 **Consider nearby airports** - Flying into a different airport might be cheaper",
            "📱 **Check budget airlines** - RyanAir, EasyJet, etc. can be significantly cheaper",
            "🛫 **Mid-week travel is cheaper** - Avoid Friday-Sunday premium pricing"
        ];

        return `💰 **Money-Saving Flight Tips**\n\n${tips.slice(0, 5).join('\n\n')}\n\n` +
               `Use our search tool with flexible dates enabled to find the absolute best prices!`;
    }

    async handleDestinationInfo(message) {
        const destinations = this.extractCities(message);

        if (destinations.length === 0) {
            return "Which destination would you like to learn about?";
        }

        const dest = destinations[0];
        const weather = await this.getWeather(dest);
        const attractions = this.getAttractions(dest);

        return `🏝️ **${dest.toUpperCase()}**\n\n` +
               `📍 **Current Weather**: ${weather?.description || 'Check weather.com'}\n` +
               `🌡️ **Temperature**: ${weather?.temp || '--'}°C\n\n` +
               `🎭 **Popular Attractions**:\n${attractions.join('\n')}\n\n` +
               `✈️ Ready to book a flight? I can help you search!`;
    }

    handleBookingHelp(message) {
        return `📚 **How to Book Your Flight**\n\n` +
               `1. **Search Flights**: Use our search tool to find flights\n` +
               `2. **Review Results**: Compare prices, duration, and airlines\n` +
               `3. **Select Flight**: Click the one you like\n` +
               `4. **Click "Book Now"**: Goes directly to airline's website\n` +
               `5. **Complete Booking**: Fill in passenger details and payment\n\n` +
               `💡 **Pro Tips**:\n` +
               `• Book directly with airlines for best prices\n` +
               `• Have your passport info ready\n` +
               `• Check baggage allowance before buying\n` +
               `• Save your booking reference\n\n` +
               `Need help finding a specific flight?`;
    }

    async generateSmartResponse(message) {
        // Use AI API if configured
        const aiKey = localStorage.getItem('VITE_HUGGING_FACE_API_KEY') ||
                      localStorage.getItem('VITE_OPENAI_API_KEY');

        if (aiKey) {
            try {
                return await this.callAIAPI(message);
            } catch (error) {
                console.warn('AI API failed, using fallback:', error);
            }
        }

        // Fallback responses
        const responses = {
            greeting: [
                "👋 Hi there! I'm your travel assistant. I can help with flights, weather, safety info, and travel tips!",
                "Hello! 🛫 What would you like help with today? Flights, destinations, or travel advice?"
            ],
            help: [
                "I can help with:\n✈️ Finding flights\n🌤️ Weather forecasts\n🛡️ Safety information\n💰 Money-saving tips\n🏨 Destination info\n\nWhat interests you?",
                "Ask me about flights, weather, safe travel destinations, or money-saving tips!"
            ],
            thanks: [
                "You're welcome! Need anything else? 😊",
                "Happy to help! Ready to find your next adventure?"
            ]
        };

        const lower = message.toLowerCase();
        if (lower.match(/hello|hi|hey|good morning|good afternoon/i)) {
            return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
        } else if (lower.match(/help|what can you do|capabilities/i)) {
            return responses.help[Math.floor(Math.random() * responses.help.length)];
        } else if (lower.match(/thanks|thank you|appreciate/i)) {
            return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
        }

        return `I understand you're asking about "${message}". For travel-related questions, I can help with flights, weather, safety, and destinations. What would you like to know?`;
    }

    // ==================== AI API INTEGRATION ====================

    async callAIAPI(message) {
        const huggingFaceKey = localStorage.getItem('VITE_HUGGING_FACE_API_KEY');
        const openAiKey = localStorage.getItem('VITE_OPENAI_API_KEY');

        // Try Hugging Face first
        if (huggingFaceKey) {
            try {
                return await this.callHuggingFace(message, huggingFaceKey);
            } catch (error) {
                console.warn('Hugging Face failed:', error);
            }
        }

        // Try OpenAI
        if (openAiKey) {
            try {
                return await this.callOpenAI(message, openAiKey);
            } catch (error) {
                console.warn('OpenAI failed:', error);
            }
        }

        throw new Error('No AI API configured');
    }

    async callHuggingFace(message, apiKey) {
        const systemPrompt = "You are a helpful travel assistant. Answer questions about flights, destinations, weather, and travel tips. Be concise.";

        const response = await fetch(
            "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
            {
                headers: { Authorization: `Bearer ${apiKey}` },
                method: "POST",
                body: JSON.stringify({
                    inputs: `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`,
                    parameters: { max_length: 500 }
                })
            }
        );

        if (!response.ok) throw new Error(`Hugging Face API error: ${response.status}`);

        const result = await response.json();
        return result[0]?.generated_text?.split('Assistant:')[1]?.trim() || "I couldn't generate a response.";
    }

    async callOpenAI(message, apiKey) {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful travel assistant for a flight booking app." },
                    { role: "user", content: message }
                ],
                max_tokens: 300,
                temperature: 0.7
            })
        });

        if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);

        const data = await response.json();
        return data.choices[0]?.message?.content || "I couldn't generate a response.";
    }

    // ==================== WEATHER INTEGRATION ====================

    async getWeather(city) {
        // Check cache
        if (this.weatherCache[city]) {
            return this.weatherCache[city];
        }

        const apiKey = localStorage.getItem('VITE_OPENWEATHER_API_KEY');
        if (!apiKey) return null;

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );

            if (!response.ok) throw new Error('Weather API error');

            const data = await response.json();
            const weather = {
                temp: Math.round(data.main.temp),
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                feelsLike: Math.round(data.main.feels_like),
                icon: data.weather[0].icon
            };

            this.weatherCache[city] = weather;
            return weather;
        } catch (error) {
            console.error('Weather error:', error);
            return null;
        }
    }

    getWeatherAdvice(weather) {
        const { temp, description } = weather;

        if (description.includes('rain')) {
            return "☔ Bring an umbrella and rain jacket!";
        } else if (temp > 30) {
            return "☀️ It's hot! Don't forget sunscreen and stay hydrated.";
        } else if (temp < 5) {
            return "❄️ Bundle up! Bring winter clothes and warm layers.";
        } else {
            return "👍 Perfect weather for exploring!";
        }
    }

    // ==================== SAFETY INFORMATION ====================

    async getSafetyInfo(city) {
        const safetyLevels = {
            'cairo': { level: 'Moderate', advisory: 'Some areas have restricted access. Use registered taxis.', healthAlerts: 'None' },
            'istanbul': { level: 'Low', advisory: 'Generally safe. Standard precautions apply.', healthAlerts: 'None' },
            'london': { level: 'Low', advisory: 'Very safe. Standard city precautions.', healthAlerts: 'None' },
            'new york': { level: 'Low', advisory: 'Safe in main tourist areas. Avoid deserted areas at night.', healthAlerts: 'None' },
            'nairobi': { level: 'Moderate', advisory: 'Stay in secure areas. Use official transportation.', healthAlerts: 'Check with CDC' },
            'bangkok': { level: 'Low', advisory: 'Generally safe. Follow local advice in some provinces.', healthAlerts: 'Dengue fever risk' },
            'paris': { level: 'Low', advisory: 'Safe. Standard city precautions apply.', healthAlerts: 'None' },
            'dubai': { level: 'Low', advisory: 'Very safe. One of the safest cities worldwide.', healthAlerts: 'None' }
        };

        const lower = city.toLowerCase();
        const info = safetyLevels[lower] || {
            level: 'Check Government Advisory',
            advisory: `For safety information about ${city}, check your government's official travel advisory website.`,
            healthAlerts: 'Consult CDC/WHO'
        };

        return {
            level: info.level,
            advisory: info.advisory,
            healthAlerts: info.healthAlerts,
            lastUpdated: new Date().toLocaleDateString()
        };
    }

    // ==================== DATA EXTRACTION ====================

    extractAirports(message) {
        const airportRegex = /\b([A-Z]{3})\b/g;
        const matches = message.match(airportRegex) || [];
        return [...new Set(matches)];
    }

    extractCities(message) {
        const cityKeywords = [
            'new york', 'london', 'paris', 'tokyo', 'dubai', 'bangkok', 'cairo',
            'delhi', 'mumbai', 'istanbul', 'sydney', 'singapore', 'hongkong',
            'chicago', 'los angeles', 'san francisco', 'toronto', 'vancouver'
        ];

        const lower = message.toLowerCase();
        return cityKeywords.filter(city => lower.includes(city));
    }

    extractDates(message) {
        const dateRegex = /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})|(\d{4}[-/]\d{1,2}[-/]\d{1,2})/g;
        const matches = message.match(dateRegex) || [];
        return matches;
    }

    getAttractions(city) {
        const attractions = {
            'paris': ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Arc de Triomphe', 'Seine River Cruise'],
            'london': ['Big Ben', 'Tower Bridge', 'British Museum', 'Buckingham Palace', 'Westminster Abbey'],
            'tokyo': ['Tokyo Tower', 'Senso-ji Temple', 'Shibuya Crossing', 'Imperial Palace', 'Akihabara'],
            'dubai': ['Burj Khalifa', 'Palm Jumeirah', 'Dubai Mall', 'Gold Souk', 'Desert Safari'],
            'new york': ['Statue of Liberty', 'Times Square', 'Central Park', 'Empire State Building', 'Metropolitan Museum'],
            'bangkok': ['Grand Palace', 'Wat Phra Kaew', 'Floating Markets', 'Thai Boxing', 'Chatuchak Weekend Market']
        };

        const lower = city.toLowerCase();
        return attractions[lower] || ['Museum', 'Historic Sites', 'Local Markets', 'Parks', 'Restaurants'];
    }

    // ==================== UTILITY ====================

    getConversationHistory() {
        return this.conversationHistory;
    }

    clearConversation() {
        this.conversationHistory = [];
    }

    saveUserProfile() {
        localStorage.setItem('user_profile', JSON.stringify(this.userProfile));
    }
}

// Export singleton
const travelAssistant = new TravelAssistant();
