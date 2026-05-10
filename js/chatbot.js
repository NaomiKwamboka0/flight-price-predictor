// ==================== CHATBOT SCRIPT ====================

document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const questionBtns = document.querySelectorAll('.question-btn');

    // Send button
    sendBtn.addEventListener('click', sendMessage);
    
    // Enter key to send
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Voice button
    voiceBtn.addEventListener('click', startVoiceInput);

    // Suggested questions
    questionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            chatInput.value = this.textContent;
            sendMessage();
        });
    });
});

// ==================== SEND MESSAGE ====================

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (!message) return;

    // Display user message
    displayMessage(message, 'user');
    chatInput.value = '';

    // Simulate AI response (Phase 2 will integrate real API)
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        displayMessage(aiResponse, 'ai');
    }, 500);
}

function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ==================== AI RESPONSE GENERATOR ====================

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Flight booking assistance
    if (lowerMessage.includes('flight') || lowerMessage.includes('book')) {
        const responses = [
            "I can help you find flights! Visit our search page to enter your departure and destination airports, dates, and preference for one-way or round-trip flights. We search all airlines worldwide including budget carriers.",
            "Looking for flights? I can help! You can search flexible dates (±3 days) if you're flexible, and we'll show you all available airlines with direct booking links to each airline's website.",
            "To book a flight, just go to our search page and enter where you're flying from and to. We'll show you options from thousands of airlines worldwide!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Price prediction
    if (lowerMessage.includes('price') || lowerMessage.includes('cheap') || lowerMessage.includes('cost')) {
        const responses = [
            "💰 Price Tip: Book 6-8 weeks in advance for the best prices. Prices typically increase closer to your departure date. Our search shows you price predictions based on historical data!",
            "For the cheapest flights, try booking mid-week (Tuesday-Thursday) and avoid peak travel times. Our app can help predict when prices will be lowest!",
            "The cheapest flights are usually early morning or late night departures. Also, flying on different dates can save you hundreds of dollars - try our flexible date search!"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Weather
    if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
        return "I can check weather for your destination! Tell me which city or country you're flying to, and I'll give you current weather and a forecast. (Note: This feature will be fully enabled after API setup)";
    }

    // Safety
    if (lowerMessage.includes('safe') || lowerMessage.includes('dangerous') || lowerMessage.includes('safety')) {
        const responses = [
            "Safety is important! I can check travel advisories for your destination. Which country are you considering? I'll tell you what major travel advisories exist.",
            "Most tourist destinations are quite safe! That said, it's good to check current travel advisories. Tell me where you're thinking of going and I can provide safety information.",
            "Travel safety varies by location and timing. I can check current advisories for you. Where are you planning to visit?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // General travel tips
    if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('suggest')) {
        const responses = [
            "✈️ Travel Tips:\n• Book flights 6-8 weeks in advance\n• Travel mid-week for better prices\n• Clear your browser cookies before booking\n• Sign up for airline newsletters for deals\n• Be flexible with dates!",
            "Here are some ways to save on flights:\n• Set up price alerts\n• Consider nearby airports\n• Fly at unpopular times (early morning, late night)\n• Book round-trips instead of two one-ways\n• Check multiple airlines",
            "Smart travel tips:\n• Pack light to avoid baggage fees\n• Check visa requirements early\n• Travel during shoulder season (not peak)\n• Compare prices across multiple days\n• Book directly with airlines when possible"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Destination info
    if (lowerMessage.includes('where') || lowerMessage.includes('destination') || lowerMessage.includes('visit')) {
        return "I can help you learn about destinations! Tell me which city or country you'd like to visit, and I'll give you info about flights there, weather, attractions, and travel tips.";
    }

    // General greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        const responses = [
            "Hello! 👋 I'm your travel assistant. I can help with flight search, price tips, destination info, and travel advice. What can I help you with today?",
            "Hi there! 🛫 Ready to find some great flight deals? I can help you search flights, find the cheapest prices, or answer travel questions!",
            "Hey! 👋 Welcome to Flight Price Predictor! I'm here to help you find cheap flights and get travel advice. What's your question?"
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can')) {
        return "I can help you with:\n✈️ Finding flights worldwide\n💰 Getting the best prices\n🌤️ Checking destination weather\n🛡️ Travel safety information\n💡 Travel tips and advice\n\nJust ask me anything!";
    }

    // Default response
    const defaultResponses = [
        "That's a great question! I'm still learning, but I can help with flights, prices, destinations, and travel advice. Try asking me about flights or travel tips!",
        "I'm here to help with travel-related questions! Ask me about flights, prices, destinations, or travel tips.",
        "I'm your travel assistant! For the most accurate information, I recommend checking our flight search. But feel free to ask me anything about travel!"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ==================== VOICE INPUT ====================

function startVoiceInput() {
    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert('Voice input is not supported in your browser. Please use text instead.');
        return;
    }

    const recognition = new SpeechRecognition();
    const voiceBtn = document.getElementById('voiceBtn');
    
    recognition.start();
    voiceBtn.textContent = '🎤 Listening...';
    voiceBtn.disabled = true;

    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        
        const chatInput = document.getElementById('chatInput');
        chatInput.value = transcript;
        voiceBtn.textContent = '🎤';
        voiceBtn.disabled = false;
    };

    recognition.onerror = function(event) {
        console.error('Voice error:', event.error);
        voiceBtn.textContent = '🎤';
        voiceBtn.disabled = false;
        alert('Voice input error: ' + event.error);
    };

    recognition.onend = function() {
        voiceBtn.textContent = '🎤';
        voiceBtn.disabled = false;
    };
}

// ==================== FUTURE API INTEGRATION ====================

// This function will integrate with Hugging Face API in Phase 3
async function getAIResponse(userMessage) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2",
            {
                headers: { Authorization: `Bearer ${API_CONFIG.chatbot.apiKey}` },
                method: "POST",
                body: JSON.stringify({ inputs: userMessage }),
            }
        );
        const result = await response.json();
        return result[0]?.generated_text || "I couldn't generate a response. Please try again.";
    } catch (error) {
        console.error('AI API Error:', error);
        return generateAIResponse(userMessage); // Fallback to rule-based response
    }
}

// Weather API integration (Phase 3)
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_CONFIG.weather.apiKey}`
        );
        const data = await response.json();
        return {
            temp: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        };
    } catch (error) {
        console.error('Weather API Error:', error);
        return null;
    }
}
