# 🚀 Flight Price Predictor - Complete Setup Guide

Welcome! This guide will walk you through setting up the **complete** Flight Price Predictor application with all 3 phases.

---

## 📋 What You'll Have After Setup

✅ **Phase 1: Flight Search** - Search all airlines worldwide  
✅ **Phase 2: Price Prediction** - Smart booking time recommendations  
✅ **Phase 3: AI Chatbot** - Voice/text travel assistant + weather + safety info  
✅ **Multi-API Support** - 6+ flight search APIs as fallback  

---

## ⚡ Quick Start (5 minutes)

### 1. Clone & Setup
```bash
git clone https://github.com/YOUR_USERNAME/flight-price-predictor.git
cd flight-price-predictor
```

### 2. Copy Environment Template
```bash
cp .env.example .env
```

### 3. Edit `.env` File
Open `.env` and add your API keys (see section below)

### 4. Run Locally
```bash
# Python
python -m http.server 8000

# Or Node.js
npx http-server

# Visit: http://localhost:8000
```

### 5. Deploy to GitHub Pages
```bash
git add .
git commit -m "Initial Flight Price Predictor - Complete"
git push origin main

# Go to: Settings → Pages → Source: main → Save
# Your site: https://YOUR_USERNAME.github.io/flight-price-predictor/
```

---

## 🔑 Getting API Keys (FREE Options)

### ✈️ Flight Search APIs

#### Option 1: Skyscanner (Recommended for beginners)
1. Go to: https://rapidapi.com/
2. Sign up (free)
3. Search for **"Skyscanner"**
4. Click **"Subscribe"** (free tier)
5. Copy your API Key
6. Paste in `.env`:
```env
VITE_SKYSCANNER_API_KEY=your_key_here
```

**Free tier**: 5,000 API calls/month (plenty for MVP)

---

#### Option 2: Amadeus (Official airline API)
1. Go to: https://developers.amadeus.com/
2. Sign up (free)
3. Create your first app
4. Get API Key + Secret
5. Paste in `.env`:
```env
VITE_AMADEUS_API_KEY=your_key_here
VITE_AMADEUS_API_SECRET=your_secret_here
```

**Free tier**: Unlimited calls (some limitations)

---

#### Option 3: Kiwi.com
1. Go to: https://tequila.kiwi.com/
2. Sign up (free)
3. Get your API key
4. Paste in `.env`:
```env
VITE_KIWI_API_KEY=your_key_here
```

**Free tier**: Good for development

---

#### Option 4: Google Flights via SerpAPI
1. Go to: https://serpapi.com/
2. Sign up (free)
3. Copy API key
4. Paste in `.env`:
```env
VITE_SERPAPI_KEY=your_key_here
```

**Free tier**: 100 searches/month

---

### 🌤️ Weather API

**OpenWeatherMap** (for destination weather)
1. Go to: https://openweathermap.org/api
2. Sign up (free)
3. Copy API Key
4. Paste in `.env`:
```env
VITE_OPENWEATHER_API_KEY=your_key_here
```

**Free tier**: 60 calls/minute

---

### 🤖 AI Chatbot APIs

#### Option 1: Hugging Face (Recommended)
1. Go to: https://huggingface.co/
2. Sign up (free)
3. Go to Settings → Access Tokens
4. Create new token (read)
5. Paste in `.env`:
```env
VITE_HUGGING_FACE_API_KEY=your_token_here
```

**Free tier**: Good for development

---

#### Option 2: OpenAI
1. Go to: https://platform.openai.com/
2. Sign up (free $5 credits)
3. Create API key
4. Paste in `.env`:
```env
VITE_OPENAI_API_KEY=your_key_here
```

**Free tier**: $5 in credits

---

## 📝 .env File Template

Copy and fill this in:

```env
# ==================== FLIGHT APIs ====================

# Skyscanner (recommended)
VITE_SKYSCANNER_API_KEY=paste_your_key_here
VITE_SKYSCANNER_API_HOST=skyscanner44.p.rapidapi.com

# Amadeus
VITE_AMADEUS_API_KEY=paste_your_key_here
VITE_AMADEUS_API_SECRET=paste_your_secret_here

# Kiwi.com
VITE_KIWI_API_KEY=paste_your_key_here

# ==================== WEATHER ====================
VITE_OPENWEATHER_API_KEY=paste_your_key_here

# ==================== AI CHATBOT ====================
VITE_HUGGING_FACE_API_KEY=paste_your_token_here

# ==================== OPTIONAL ====================
VITE_OPENAI_API_KEY=
VITE_SERPAPI_KEY=

# Settings
VITE_ENV=development
VITE_DEBUG=false
```

---

## 🧪 Testing the App

### Test Flight Search
1. Go to home page
2. Enter:
   - From: NYC
   - To: LAX
   - Date: Any future date
3. Click "Search Flights"
4. Should show flights (real if API configured, mock otherwise)

### Test Results Page
1. From search results, click a flight
2. Should redirect to booking page
3. Test filters and sorting

### Test Chatbot
1. Go to "AI Assistant" page
2. Type: "What's the weather in Paris?"
3. Should show weather info
4. Try: "Is Cairo safe to travel to?"
5. Should show safety info

### Test Price Prediction
1. Do 2-3 flight searches
2. On results page, check "Price Prediction" section
3. Should show trend analysis

---

## 🏗️ Project Structure

```
flight-price-predictor/
├── .env                    ← YOUR API KEYS (keep private!)
├── .env.example            ← Template
├── index.html              ← Home page
├── results.html            ← Results page
├── chat.html               ← Chatbot page
│
├── css/
│   └── style.css           ← All styling
│
├── js/
│   ├── config.js           ← Configuration (loads .env)
│   ├── flightAPI.js        ← Multi-API flight search
│   ├── prediction.js       ← Phase 2: Price prediction
│   ├── assistant.js        ← Phase 3: AI chatbot
│   ├── script.js           ← Main app logic
│   └── chatbot.js          ← Chatbot UI
│
├── .github/workflows/
│   └── deploy.yml          ← Auto-deploy to GitHub Pages
│
└── README.md               ← Documentation
```

---

## 🔄 How It Works

### Flight Search Flow
```
User Search Form
    ↓
config.js loads .env
    ↓
flightAPI.js tries APIs in order:
  1. Skyscanner (if key exists)
  2. Amadeus (if key exists)
  3. Kiwi.com (if key exists)
  4. Others...
  5. Mock data (if no APIs)
    ↓
Results page displays flights
```

### Price Prediction Flow
```
Flights received
    ↓
prediction.js records prices in localStorage
    ↓
Analyzes historical trends
    ↓
Shows "best time to book" recommendation
```

### Chatbot Flow
```
User message
    ↓
assistant.js detects intent (weather/safety/price/etc)
    ↓
Fetches relevant data (weather API, safety info, etc)
    ↓
Uses AI API if configured (Hugging Face/OpenAI)
    ↓
Shows response
```

---

## ⚙️ Configuration Options

In `.env`, you can enable/disable features:

```env
# Enable/disable
VITE_ENABLE_AI_CHAT=true
VITE_ENABLE_PRICE_PREDICTION=true
VITE_ENABLE_WEATHER=true
VITE_ENABLE_SAFETY_ALERTS=true

# Preferred APIs
VITE_PREFERRED_FLIGHT_API=skyscanner
VITE_FALLBACK_FLIGHT_APIS=amadeus,kiwi,kayak

# Performance
VITE_REQUESTS_PER_MINUTE=30
VITE_CACHE_DURATION_MINUTES=60
```

---

## 🐛 Troubleshooting

### "No flights found"
**Solution**: Add at least one flight API key to `.env`

### "API Error"
**Check**:
1. Is your API key correct? (no extra spaces)
2. Is the API key active? (check provider's dashboard)
3. Have you exceeded rate limits? (try again later)
4. Is your network working?

### Price prediction not showing
**Solution**: Search 2-3 times. Prediction improves with data.

### Chatbot not responding
**Check**:
1. Is browser console showing errors? (F12)
2. Is VITE_HUGGING_FACE_API_KEY or VITE_OPENAI_API_KEY set?
3. Try a simple question: "Hello"

### .env not loading
**Solution**: Make sure `.env` file is in root directory (same level as index.html)

---

## 🚀 Next Steps

1. ✅ Add API keys to `.env`
2. ✅ Test locally
3. ✅ Push to GitHub
4. ✅ Enable GitHub Pages
5. ✅ Share the link!

---

## 💡 Tips for Best Results

- **Start with 1 API**: Get Skyscanner working first, then add more
- **Test locally first**: Use `python -m http.server 8000`
- **Save .env changes**: Must reload page after editing
- **Clear browser cache**: If something seems broken
- **Check console errors**: F12 → Console tab

---

## 📞 Need Help?

1. Check [Troubleshooting](#-troubleshooting) section above
2. Check each API's documentation
3. Review browser console (F12)
4. Check `.env.example` for correct variable names

---

## 🎯 What's Next?

After basic setup:
- **Add more APIs**: Each adds redundancy
- **Deploy to custom domain**: Buy domain, point to GitHub Pages
- **Add Firebase**: Store user accounts and price history
- **Mobile app**: Convert to React Native or Flutter
- **ML improvements**: Train better price prediction model

---

**Happy Flying! 🛫**

For detailed API documentation, see `API_SETUP.md`
