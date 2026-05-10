// ==================== CHATBOT INTEGRATION ====================
// Using the advanced TravelAssistant with AI, weather, and safety features

document.addEventListener('DOMContentLoaded', async function() {
    // Load environment
    await loadEnvVariables();

    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const questionBtns = document.querySelectorAll('.question-btn');

    // Send button
    sendBtn.addEventListener('click', handleChatInput);
    
    // Enter key to send
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChatInput();
        }
    });

    // Voice button
    voiceBtn.addEventListener('click', startVoiceInput);

    // Suggested questions
    questionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            chatInput.value = this.textContent;
            handleChatInput();
        });
    });
});

// ==================== CHAT HANDLER ====================

async function handleChatInput() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (!message) return;

    // Display user message
    displayMessage(message, 'user');
    chatInput.value = '';

    try {
        // Use the advanced assistant if available
        if (typeof travelAssistant !== 'undefined') {
            const response = await travelAssistant.processMessage(message);
            displayMessage(response, 'ai');
        } else {
            // Fallback to basic responses
            const response = await generateBasicResponse(message);
            displayMessage(response, 'ai');
        }
    } catch (error) {
        console.error('Chat error:', error);
        displayMessage(`Sorry, I encountered an error: ${error.message}. Please try again.`, 'ai');
    }
}

function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Parse markdown-like formatting
    contentDiv.innerHTML = message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<em>$1</em>')
        .replace(/\n/g, '<br>')
        .replace(/• /g, '• ');
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ==================== ENVIRONMENT LOADING ====================

async function loadEnvVariables() {
    try {
        const response = await fetch('.env');
        if (response.ok) {
            const envText = await response.text();
            const lines = envText.split('\n');
            lines.forEach(line => {
                if (line && !line.startsWith('#')) {
                    const [key, value] = line.split('=');
                    if (key && value && value.trim()) {
                        localStorage.setItem(key.trim(), value.trim());
                    }
                }
            });
            console.log('[Config] Environment variables loaded');
        }
    } catch (error) {
        console.warn('[Config] .env file not loaded (expected if using defaults)');
    }
}

// ==================== BASIC RESPONSE GENERATOR ====================
// Fallback when TravelAssistant is not available

async function generateBasicResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Flight booking
    if (lowerMessage.includes('flight') || lowerMessage.includes('book')) {
        return "✈️ I can help you find flights! Go to the search page and enter:\n• Where you're flying FROM (airport code like NYC)\n• Where you're flying TO\n• When you want to travel\n\nI'll search all airlines worldwide and show you the best deals!";
    }

    // Price tips
    if (lowerMessage.includes('price') || lowerMessage.includes('cheap') || lowerMessage.includes('cost')) {
        return "💰 **Money-Saving Tips:**\n\n• Book **6-8 weeks** in advance\n• Travel **Tuesday-Thursday** for cheaper flights\n• **Early morning or late night** flights are cheaper\n• Clear your browser cookies before searching\n• Use **flexible dates** - try ±3 days\n• Consider **nearby airports**\n\nOur price predictor shows you the best times to book!";
    }

    // Weather
    if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
        return "🌤️ Tell me which city you're traveling to and I can check the weather forecast for you!";
    }

    // Safety
    if (lowerMessage.includes('safe') || lowerMessage.includes('dangerous') || lowerMessage.includes('safety')) {
        return "🛡️ Safety is important! Tell me which destination you're considering and I'll provide travel safety information, health alerts, and current advisories.";
    }

    // Help
    if (lowerMessage.includes('help') || lowerMessage.includes('what can') || lowerMessage.includes('capability')) {
        return "👋 I'm your travel assistant! I can help with:\n\n✈️ **Finding flights** - Search all airlines worldwide\n💰 **Price tips** - Best time to book\n🌤️ **Weather** - Check destination weather\n🛡️ **Safety** - Travel advisories\n🏨 **Destinations** - Info about places to visit\n💡 **Travel advice** - General tips\n\nWhat would you like to know?";
    }

    // Greeting
    if (lowerMessage.match(/hello|hi|hey|good morning|good afternoon/)) {
        const greetings = [
            "👋 Hi! I'm your travel assistant. How can I help you find the perfect flight?",
            "Hello! 🛫 Ready to find some great travel deals? Ask me about flights, prices, or destinations!",
            "Hey there! 👉 What travel questions can I answer for you today?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Thank you
    if (lowerMessage.includes('thank')) {
        return "You're welcome! 😊 Need anything else help with your travel plans?";
    }

    // Default
    return `That's a great question! For travel-related queries, I can help with:\n\n• ✈️ Flight search & booking\n• 💰 Price predictions & tips\n• 🌤️ Destination weather\n• 🛡️ Travel safety info\n• 💡 General travel advice\n\nWhat would you like to know?`;
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
